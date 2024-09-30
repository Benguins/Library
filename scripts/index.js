let myLibrary = JSON.parse(localStorage.getItem('myLibrary'));

if(!myLibrary){
  myLibrary = [
    {
    title: 'The Return of the King',
    author: 'J. R. R. Tolkien',
    haveRead: true
    },
    {
      title: 'A Game of Thrones',
      author: 'George R.R Marton',
      haveRead: false
    }
  ];
};
 
function Book(title, author, haveRead){ 
  this.title = title;
  this.author = author;
  this.haveRead = haveRead;
}

const container = document.querySelector('.js-library-books-container');
const button = document.querySelector('.js-library-button');
let libraryHTML = '';

function clearStorage(){
  localStorage.clear();
}

document.querySelector('.js-library-button-delete-all').addEventListener('click', () => {
  clearStorage();
  location.reload();
});

generateHTML();

function generateHTML(){
  libraryHTML = ''
  myLibrary.forEach((entry) => {
    libraryHTML += `
    <div class="book-entry-container js-book-entry-container-${entry.title}" data-book-title="${entry.title}">
      <p>${entry.title}</p>
      <p>${entry.author}</p>
      <p>Have you read it? <input type="checkbox" class="js-checkbox" data-book-title="${entry.title}" data-checked="${entry.haveRead}"></p>
      <div class="book-entry-button-container">
        <button class="library-button js-library-button-delete" data-book-title="${entry.title}">Delete</button>
        <button class="library-button js-library-button-status" data-book-title="${entry.title}">Change Read Status</button>
      </div>
    </div>
    `
    container.innerHTML = libraryHTML;
  });

  document.querySelectorAll('.js-checkbox').forEach((checkBox) => {

    const checked = checkBox.dataset.checked;
    const book = checkBox.dataset.bookTitle;
    let matchingBook;

    myLibrary.forEach((entry) => {
        if(entry.title === book){
          matchingBook = entry;
        }
        if(matchingBook){
          if(checked === 'true'){
            checkBox.setAttribute("checked", "checked");
          }
        }
      });
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
          saveToStorage();
        }
      });
    });
  });
};

button.addEventListener('click', () => {
  let title = document.querySelector('.js-title-input').value;
  let author = document.querySelector('.js-author-input').value;
  let haveRead = document.querySelector('.js-have-read-input');

  if(haveRead.checked){
    haveRead = true;
  } else {
    haveRead = false;
  }

  if(title && author){
    let newBook = new Book(title,author,haveRead);
    console.log(newBook);
    myLibrary.push(newBook);
    saveToStorage();
    location.reload();
  }
});

function saveToStorage(){
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

const modal = document.querySelector('.js-modal');
document.querySelector('.js-library-button-add-another-book').addEventListener('click', () => {
  modal.style.display = "block";
});

document.querySelectorAll('.js-library-button-status').forEach((button) => {
  button.addEventListener('click', () => {
    const bookTitle = button.dataset.bookTitle;
    let matching;
    myLibrary.forEach((entry) => {
      if(entry.title === bookTitle){
        matching = entry;
      }
    });
    if(matching.haveRead === true){
      matching.haveRead = false;
      saveToStorage();
      location.reload();
    } else {
      matching.haveRead = true;
      saveToStorage();
      location.reload();
    }
  })
});

document.querySelector('.js-library-button-go-back').addEventListener('click', () => {
  modal.style.display = "none";
});




