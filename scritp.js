const author = document.querySelector('#author');
const title = document.querySelector('#title');
const pages = document.querySelector('#pages');
const isFinished = document.querySelector('#isFinished');
const output = document.querySelector('.output');
const submitBtn = document.querySelector('#submit');

const myLibrary = [];

function Book(author, title, pages, isFinished) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isFinished = isFinished;
}

function addBookToLibrary() {
  myLibrary.push(new Book(author.value, title.value, pages.value, isFinished.checked));

  for (const book of myLibrary) {
    for (const key in book) {
      output.textContent += `${key}: ${book[key]}; `;
    }
  }

}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
});
