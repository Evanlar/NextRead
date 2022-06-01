/*  TODO

form, gets submitted by button

on submit don't do default

query and get results

on click, hide form and results */


async function searchBook(searchTerm) {
    const response = await axios.get(`https://gutendex.com/books?search=${searchTerm}`)
    let bookArray = response['data']['results']
    if (bookArray.length == 0) {console.error('No book results match this query');}
    console.log(`searched ${searchTerm}`, response)
   
    // loop needs to create new result spot to list books 
    for (let i = 0; i < 20; i++) {
    let book = bookArray[i];
    if (book) {
    console.log(bookArray[0])
    let title = book['title'];
    let author = book['authors'][0]['name'];

    let tag = document.createElement('p');
    let text = document.createTextNode(author + ' - ' + title)


    tag.addEventListener('click', () =>{
        //This is book select
        console.log('I.ve been clicked')
        //grab needed search criteria
        const relatedScreenTitle = `Titles related to ${title}`;
        //toggle between search and result screen
        //title RESULTS RELATED TO TITLE
        //genre etc 
        //(same screen but diffrent content )
        allResults.style.display='none';
        input.style.display='none';
        button.style.display='none';
        //Format the title so it includes title and subtitle, then 
        //here we can delete subtitle and create new title
        header.innerHTML = `<h1>Results for ${title}</h1> `

        //Change innerHTML of title screen 

        //with saved info, search for related books (FUNC), then appendchild of each listing
        
      })
    tag.appendChild(text)
    allResults.appendChild(tag)
    }}
    //lets try to pop this out as a module, 2 column selector 
    //this needs to be some HTML elm that holds title and author, when user clicks then will search by genre
    
}
//not needed? looked like doc required it
function switchSearchTerm(bookTitle) {
    console.log(bookTitle)
    if (!bookTitle.includes(' ')){return bookTitle}
    formatedTitle = bookTitle.replace(' ', '%20')
    return formatedTitle
}
//Now when we type, after a debounce, search is performed. 

// Oninput is after debounce and returning it ready to be used 
//when this happens, results need to be grabbed and displayed as drop down
const onInput = async event => {
    let searchTerm =  await event.target.value;
    if (searchTerm != ' ' && searchTerm) {
    console.log(searchTerm)
    searchBook(searchTerm)
    }
}

const button = document.querySelector('#submit')
const input = document.querySelector('input')  
const header = document.querySelector('#header')
const allResults = document.querySelector('.results')
input.addEventListener('input', debounce(onInput, 1000));  
header.innerHTML = "<h1>Enter a book you like</h1> <p>We'll find something similar to read</p>"
button.addEventListener('click', function() {
    //this needs to run constantly as typing
    searchBook(switchSearchTerm(searchTerm.value))})