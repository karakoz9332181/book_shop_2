import settings from "../settings";

export default class BookLoader {
  // Класс для загрузки книг из api

  category: string;
  startIndex: number;
  maxResults: number;
  public apiUrl: string;

  constructor(category: string, startIndex: number, maxResults: number) {
    this.category = category;
    this.startIndex = startIndex;
    this.maxResults = maxResults;
    const params: URLSearchParams = this.setParams(
      category,
      startIndex,
      maxResults
    );

    this.apiUrl = `https://www.googleapis.com/books/v1/volumes?${params.toString()}`;
  }

  setParams(
    category: string,
    startIndex: number,
    maxResults: number
  ): URLSearchParams {
    const params = new URLSearchParams();
    params.append("q", `"subject:${category}"`);
    params.append("key", settings.BOOKS_API_KEY);
    params.append("printType", "books");
    params.append("startIndex", startIndex.toString());
    params.append("maxResults", maxResults.toString());
    return params;
  }

  async getBooks() {
    const response = await fetch(this.apiUrl);
    return response.json();
  }
}
