const author = document.querySelector('#author');
const title = document.querySelector('#title');
const pages = document.querySelector('#pages');
const isFinished = document.querySelector('#isFinished');
const output = document.querySelector('.output');
const submitBtn = document.querySelector('#submit');
const closeDialogBtn = document.querySelector('.close-btn');
const dialog = document.querySelector('#dialog');

const addBook = document.querySelector('#addBook');

const myLibrary = [];

function Book(title, author, pages, isFinished) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isFinished = isFinished;
}

const book1 = new Book('Throne of Glass', 'Sarah J. Maas', 321, false);
const book2 = new Book('The Godfather', '	Mario Puzo', 777, false);
const book3 = new Book('The Godfather 2', '	Mario Puzo', 876, false);
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);


function addBookToLibrary() {
  // clear output
  while (output.firstChild) {
    output.removeChild(output.firstChild);
  }

  // add new book to the book library array
  myLibrary.push(new Book(title.value, author.value, pages.value, isFinished.checked));

  // display books item
  display(myLibrary);
}

// create a card for each book item
// and display them in the output
function display(array) {
  array.forEach(book => {
    const card = document.createElement('div');
    const ul = document.createElement('ul')
    for (const key in book) {
      const li = document.createElement('li');
      li.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)} - ${book[key]}`;
      ul.appendChild(li);
    }
    card.appendChild(ul);
    card.classList.add('card-item')
    output.appendChild(card);
  });
}

display(myLibrary);

addBook.addEventListener('click', () => {
  dialog.showModal();
})

closeDialogBtn.addEventListener('click', () => {
  dialog.close();
})

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
  dialog.close();
});
