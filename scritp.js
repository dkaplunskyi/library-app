const addBookBtn = document.querySelector('#addBook');

const dialog = document.querySelector('#dialog');
const author = document.querySelector('#author');
const title = document.querySelector('#title');
const pages = document.querySelector('#pages');
const readStatus = document.querySelector('#read-status');
const closeDialogBtn = document.querySelector('.close-btn');
const submitBtn = document.querySelector('#submit');

const output = document.querySelector('.output');

const myLibrary = [
  new Book('Throne of Glass', 'Sarah J. Maas', '321', true),
  new Book('The Godfather', '	Mario Puzo', '777', true),
  new Book('The Godfather 2', '	Mario Puzo', '876', false)];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
};

Book.prototype.index = null;

addBookBtn.addEventListener('click', () => {
  dialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
  dialog.close();
});

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  addBookToLibrary();
  printLibrary();
  clearDialog();
  dialog.close();
});

function addBookToLibrary() {
  myLibrary.push(new Book(author.value, title.value, pages.value, readStatus.checked));
}

function printLibrary() {
  // clear output
  output.innerHTML = '';
  myLibrary.forEach((book, index) => {
    // assign index
    book.index = index;
    // create a card 
    const card = createCard(book.author, book.title, book.pages, book.readStatus, index);
    output.appendChild(card);
  })

  toggleStatus();
  deleteBook();
};

//create a card item
function createCard(newAuthor, newTitle, newPages, newReadStatus, index) {
  //create card's elements
  const card = document.createElement('div');
  const author = document.createElement('div');
  const title = document.createElement('div');
  const pages = document.createElement('div');
  const labelForReadStatus = document.createElement('label');
  const readStatus = document.createElement('input');
  const editIcon = document.createElement('img');
  const deleteIcon = document.createElement('img');
  const btnWrapper = document.createElement('span');
  // assign data to the elements
  author.textContent = `Author: ${newAuthor}`;
  title.textContent = `Title: ${newTitle}`;
  pages.textContent = `Pages: ${newPages}`;
  labelForReadStatus.textContent = `Read status: ${newReadStatus}`;
  readStatus.checked = newReadStatus;
  // add tag's attributes
  readStatus.setAttribute('data-index', index);
  readStatus.setAttribute('type', 'checkbox');
  deleteIcon.setAttribute('data-index', index);
  editIcon.setAttribute('src', 'img/edit.svg');
  editIcon.setAttribute('alt', 'edit icon image');
  deleteIcon.setAttribute('src', 'img/delete.svg');
  deleteIcon.setAttribute('alt', 'delete icon image');

  // add a class name
  readStatus.classList.add('toggle');
  card.classList.add('card-item');
  btnWrapper.classList.add('btn-wrapper');
  deleteIcon.classList.add('delete-book-btn');
  // add css properties
  labelForReadStatus.style.display = 'flex';
  labelForReadStatus.style.justifyContent = 'space-between';
  labelForReadStatus.style.alignItems = 'center';

  // put everything together
  btnWrapper.append(editIcon, deleteIcon);
  labelForReadStatus.appendChild(readStatus);
  card.append(btnWrapper, author, title, pages, labelForReadStatus);

  return card;
};

function toggleStatus() {
  const checkboxes = document.querySelectorAll('.toggle');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
      let index = e.target.getAttribute('data-index');
      myLibrary[index].readStatus = !myLibrary[index].readStatus;

      printLibrary();
    })
  });
};

function deleteBook() {
  const deleteBookButtons = document.querySelectorAll('.delete-book-btn');
  deleteBookButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      let index = e.target.getAttribute('data-index');
      myLibrary.splice(index, 1);

      printLibrary();
    });
  });
};

function clearDialog() {
  author.value = '';
  title.value = '';
  pages.value = '';
  readStatus.checked = true;
};

printLibrary();

