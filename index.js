/* TODO

create nice looking UI 

Make UI scalable from mobile and desktop 

add other search modes, filter by author, genres, and best match (algo)

*/
const input = document.querySelector('input')  
const header = document.querySelector('#header')
const allResults = document.querySelector('.results')
const logo = document.querySelector('#logo')
const displayHeight = window.innerHeight/7
const displayWidth = window.innerWidth/2
logo.style.setProperty('--element-height', displayHeight + 'px')
logo.style.setProperty('--element-width', displayWidth + 'px')
async function searchGenre(genre) {
    const response = await axios.get(`https://gutendex.com/books?topic=${genre}`)
    let results = response['data']['results'].slice(0, 20)
    console.log(`searched ${genre}`, results)
    organiseResults(results, 'genreResult')}


//This fuction takes an array and generates clickable dropdown 
function organiseResults(array, idType) {
    console.log(array)
    array.forEach(book => {
        input.style.display='none';
        let title = book['title'];
        let author = book['authors'][0]['name'];
        let genreList = book['bookshelves'];
       
        let tag = document.createElement('p');
        tag.setAttribute('id', idType)
        let text = document.createTextNode(author + ' - ' + title)
        //if id === bookresult else ceate different ttag 
        tag.addEventListener('click', () =>{
             //if no genres to search fo 
        if (genreList.length === 0) {
            allResults.innerHTML="";
            input.style.display='none';
            header.innerHTML = `<h1>SORRY!!! No Books related to <b>${title}<b> by <b>${author}<b> \n please search again</h1>`;
        }
        else {
            allResults.innerHTML="";
            //This is book select
            //grab needed search criteria
            const relatedScreenTitle = `<h1>Books related to <b>${title}<b> by <b>${author}<b></h1>`;
            console.log(relatedScreenTitle)
            input.style.display='none';
            

            header.innerHTML = relatedScreenTitle;
            searchGenre(genreList[0]);
        }
        })

        tag.appendChild(text)
        allResults.appendChild(tag)
        //Make this pretty and output as clickable obj 
        console.log(title,author,genreList);
        })
}

async function searchBook(searchTerm) {
    const response = await axios.get(`https://gutendex.com/books?search=${searchTerm}`)
    let bookArray = response['data']['results']
    if (bookArray.length == 0) {console.error('No book results match this query');}
    console.log(`searched ${searchTerm}`, response)
    organiseResults(bookArray,'bookResult')
}

//Now when we type, after a debounce, search is performed. 

// Oninput is after debounce and returning it ready to be used 
//when this happens, results need to be grabbed and displayed as drop down
const onInput = async event => {
    let searchTerm =  await event.target.value;
    if (searchTerm != ' ' && searchTerm) {
    console.log('on input' , searchTerm)
    searchBook(searchTerm)
    }
}

input.addEventListener('input', debounce(onInput, 1000));  

//this will later on be a logo 


//allResults.innerHTML = "<p>We'll find something similar to read</p>"
