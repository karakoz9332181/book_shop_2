import BookLoader from "../api/api";
import { bookListRender, getCategory } from "../utils";

// DIV с книгами
const bookList: HTMLElement = <HTMLElement>document.getElementById("bookList");

// Боковая панель
const sidebar: HTMLElement = <HTMLElement>document.getElementById("sidebar");

// Категория по умолчанию
const initialCategory = getCategory(sidebar);

// Загрузчик книг
const loader = new BookLoader(initialCategory, 0, 6);

// Кнопка load more
const loadMoreBtn: HTMLButtonElement = <HTMLButtonElement>(
  document.getElementById("loadMoreBtn")
);

loadMoreBtn.addEventListener("click", () => {
  const startIndex: number = parseInt(
    loadMoreBtn.dataset.startIndex ? loadMoreBtn.dataset.startIndex : "0"
  );
  
  loader.setParams(getCategory(sidebar), startIndex, 6);
  loader.getBooks().then((data) => {
    bookListRender(data, bookList);
    loadMoreBtn.dataset.startIndex = (startIndex + 6).toString();
  });
});

loader.getBooks().then((data) => {
  bookListRender(data, bookList);
  loadMoreBtn.dataset.startIndex = "6";
});
