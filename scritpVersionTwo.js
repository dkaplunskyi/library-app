document.addEventListener('DOMContentLoaded', () => {
  // web elements
  const addNewBookBtn = document.querySelector('#addBook');
  const dialog = document.querySelector('#dialog');
  const closeDialogBtn = document.querySelector('.close-btn');
  const submitBtn = document.querySelector('#submit');
  const output = document.querySelector('.output');
  const form = document.querySelector('form');
  const saveBtn = document.createElement('input');


  // dialog form inputs
  const authorInput = document.querySelector('#author');
  const titleInput = document.querySelector('#title');
  const pagesInput = document.querySelector('#pages');
  const readStatusInput = document.querySelector('#read-status');

  function Book(author, title, pages, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  Book.prototype.index = null;

  const myLibrary = [
    new Book('The Godfather', 'Mario Puzo', '456', 'Yes'),
    new Book('The Godfather 2', 'Mario Puzo', '777', 'Yes'),
    new Book('The Godfather 3', 'Mario Puzo', '321', 'No')
  ];

  const displayBooks = () => {
    output.innerHTML = '';

    myLibrary.forEach((book, index) => {
      book.index = index;
      const card = document.createElement('div');
      card.classList.add('card-item');
      card.setAttribute('data-index', index);

      const author = document.createElement('p');
      const title = document.createElement('p');
      const pages = document.createElement('p');
      const readStatus = document.createElement('p');

      const btnWrapper = document.createElement('div');
      const deleteBtn = document.createElement('button');
      const editBtn = document.createElement('button');

      deleteBtn.textContent = 'Delete';
      editBtn.textContent = 'Edit';

      deleteBtn.classList.add('delete-btn');
      editBtn.classList.add('edit-btn');

      btnWrapper.appendChild(deleteBtn);
      btnWrapper.appendChild(editBtn);

      author.textContent = `Author: ${book.author}`;
      title.textContent = `Title: ${book.title}`;
      pages.textContent = `Pages: ${book.pages}`;
      readStatus.textContent = `Read? ${book.readStatus}`;

      const toggleContainer = document.createElement('div');
      const checkbox = document.createElement('input');
      const label = document.createElement('label');
      const span = document.createElement('span');

      if (book.readStatus.toLowerCase() === 'yes') {
        checkbox.setAttribute('checked', true);
      }

      toggleContainer.classList.add('toggle-container');
      label.classList.add('switch');
      checkbox.setAttribute('type', 'checkbox');
      span.classList.add('slider');
      span.classList.add('round');

      label.append(checkbox, span);

      toggleContainer.append(readStatus, label);

      card.append(author, title, pages, toggleContainer, btnWrapper);
      output.appendChild(card);

      // change read status toggle button
      checkbox.addEventListener('change', function () {
        myLibrary[index].readStatus = this.checked ? 'Yes' : 'No';
        displayBooks();
      });

      // delete book item from array
      deleteBtn.addEventListener('click', () => {
        const index = deleteBtn.parentElement.parentElement.getAttribute('data-index');
        myLibrary.splice(index, 1);

        displayBooks();
      });

      editBtn.addEventListener('click', () => {
        dialog.showModal();
        const index = deleteBtn.parentElement.parentElement.getAttribute('data-index');
        authorInput.value = myLibrary[index].author;
        titleInput.value = myLibrary[index].title;
        pagesInput.value = myLibrary[index].pages;

      })

    });

  };

  // event listeners
  addNewBookBtn.addEventListener('click', () => dialog.showModal());

  closeDialogBtn.addEventListener('click', () => dialog.close());

  readStatusInput.addEventListener('change', () => {
    readStatusInput.value = readStatusInput.checked ? 'Yes' : 'No';
  });

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const book = new Book(authorInput.value, titleInput.value, pagesInput.value, readStatusInput.value);
    myLibrary.push(book);

    displayBooks();
    dialog.close();
    authorInput.value = '';
    titleInput.value = '';
    pagesInput.value = '';
    readStatusInput.value = 'Yes';
    readStatusInput.checked;
  });

  displayBooks();

});