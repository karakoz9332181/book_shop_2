import { Book, BookType } from "./models/book";

type ApiItems = {
  items: Array<BookType>;
};

function bookListRender(data: ApiItems, bookList: HTMLElement) {
  const items: Array<BookType> | null = data["items"];
  if (items && items.length) {
    const books: Array<Book> = [];
    for (let item of items) {
      books.push(
        new Book(
          item.id,
          item.volumeInfo.title,
          item.saleInfo.saleability,
          item.volumeInfo.imageLinks.thumbnail,
          item.volumeInfo.description,
          item.volumeInfo.authors,
          item.volumeInfo.averageRating,
          item.volumeInfo.ratingsCount,
          item.saleInfo.listPrice?.amount,
          item.saleInfo.listPrice?.currencyCode
        )
      );
    }

    for (let book of books) {
      bookList.appendChild(book.render());
    }
  }
}

function getCategory(sidebar: HTMLElement): string {
  return sidebar.dataset.category ? sidebar.dataset.category : "Architecture";
}

export { bookListRender, getCategory };
