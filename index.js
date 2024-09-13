
let myLibrary = JSON.parse(localStorage.getItem('myLibrary'));

if(!myLibrary){
  myLibrary = [];
};
 

function Book(title, author, pageNumber, haveRead){ 
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.haveRead = haveRead;
  this.info = function(){
    const info = `${this.title}, ${this.author}, ${this.pageNumber}, ${this.haveRead}`;
    return info;
  }
}

const container = document.querySelector('.js-library-books-container');
const button = document.querySelector('.js-library-button');
let libraryHTML = '';

function clearStorage(){
  localStorage.clear();
}
document.querySelector('.js-library-button-add-another-book').addEventListener('click', () => {
  clearStorage();
  generateHTML();
});

generateHTML();

function generateHTML(){
  libraryHTML = ''
  myLibrary.forEach((entry) => {
    libraryHTML += `
    <div class="book-entry-container js-book-entry-container-${entry.title}" data-book-title="${entry.title}">
    <p>${entry.title}</p>
    <p>${entry.author}</p>
    <p>${entry.pageNumber}</p>
    <p>${entry.haveRead}</p>
    <button class="library-button js-library-button-delete" data-book-title="${entry.title}">Delete</button>
    </div>
    `
    container.innerHTML = libraryHTML;
  });
    document.querySelectorAll('.js-library-button-delete').forEach((button) => {
    button.addEventListener('click', () => {
      const book = button.dataset.bookTitle;
      let matchingBook;
      const newArray = [];
  
      myLibrary.forEach((entry) => {
        if(entry.title === book){
          matchingBook = entry;
        }
        if(matchingBook){
          const index = myLibrary.indexOf(matchingBook);
          myLibrary.splice(index, 1);
          const containerOfBook = document.querySelector(`.js-book-entry-container-${entry.title}`);
          containerOfBook.remove();
        }
      });
    });
  });
};

button.addEventListener('click', () => {
  let title = document.querySelector('.js-title-input').value;
  let author = document.querySelector('.js-author-input').value;
  let pageNumber = document.querySelector('.js-page-number-input').value;
  let haveRead = document.querySelector('.js-have-read-input').value;

  if(title && author && pageNumber && haveRead){
    myLibrary.push({
      title: title,
      author: author,
      pageNumber: pageNumber,
      haveRead: haveRead
    });
    saveToStorage();
    generateHTML();
  }
});

function saveToStorage(){
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}





