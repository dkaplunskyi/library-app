const author = document.querySelector('#author');
const title = document.querySelector('#title');
const pages = document.querySelector('#pages');
const isFinished = document.querySelector('#isFinished');
const output = document.querySelector('.output');
const submitBtn = document.querySelector('#submit');
const closeDialogBtn = document.querySelector('.close-btn');
const dialog = document.querySelector('#dialog');
const toggle = document.getElementById('toggle');

const addBook = document.querySelector('#addBook');

const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

const book1 = new Book('Throne of Glass', 'Sarah J. Maas', 321, 'not read');
const book2 = new Book('The Godfather', '	Mario Puzo', 777, 'read');
const book3 = new Book('The Godfather 2', '	Mario Puzo', 876, 'read');
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

display(myLibrary);

function addBookToLibrary() {
  // clear output
  while (output.firstChild) {
    output.removeChild(output.firstChild);
  }

  // add new book to the book library array
  myLibrary.push(new Book(title.value, author.value, pages.value, toggle.value));

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
      li.innerHTML = `<span>${key.charAt(0).toUpperCase() + key.slice(1)}</span>:  ${book[key]}`;
      if (key === 'author') {
        li.classList = 'author-style';
      }
      ul.appendChild(li);
    }

    card.appendChild(ul);
    card.appendChild(createDeleteEditBtn());
    card.classList.add('card-item')

    output.appendChild(card);
  });
}

// // create card's buttons
function createDeleteEditBtn() {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList = 'delete-btn';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList = 'edit-btn';

  const buttonsWrapper = document.createElement('div');
  buttonsWrapper.appendChild(deleteBtn);
  buttonsWrapper.appendChild(editBtn);

  return buttonsWrapper;
}

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

// toggle button of the dialog
toggle.addEventListener('change', function () {
  if (this.checked) {
    console.log('Toggle is ON');
    // Add your "ON" code here
    toggle.value = 'read';
  } else {
    console.log('Toggle is OFF');
    // Add your "OFF" code here
    toggle.value = 'not read'
  }
});
