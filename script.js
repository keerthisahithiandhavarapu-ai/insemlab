
const defaultBooks = [
  { title: "Java Programming", author: "James Gosling" },
  { title: "Python Basics", author: "Guido van Rossum" },
  { title: "Web Development", author: "Jon Duckett" }
];

function getBooks() {
  return JSON.parse(localStorage.getItem("libraryBooks"))
    || defaultBooks;
}

function saveBooks(books) {
  localStorage.setItem("libraryBooks", JSON.stringify(books));
}

function displayBooks(books) {
  const list = document.getElementById("bookList");
  if (!list) return;

  list.replaceChildren();

  if (books.length === 0) {
    list.textContent = "No books found.";
    return;
  }

  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "book";

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = "Author: " + book.author;

    card.append(title, author);
    list.appendChild(card);
  });
}

function searchBooks() {
  const input = document.getElementById("search");
  if (!input) return;

  const query = input.value.toLowerCase();

  const filtered = getBooks().filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  );

  displayBooks(filtered);
}

const form = document.getElementById("bookForm");

if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("bookTitle")
      .value.trim();
    const author = document.getElementById("bookAuthor")
      .value.trim();

    if (!title || !author) return;

    const books = getBooks();
    books.push({ title, author });
    saveBooks(books);

    document.getElementById("adminMessage").textContent =
      "Book added successfully!";

    form.reset();
  });
}

displayBooks(getBooks());
