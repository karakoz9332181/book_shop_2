export default class Cart {
  bookIds: Array<string> = [];

  constructor(bookIds: Array<string>) {
    this.bookIds = bookIds;
    this.updateStorage();
  }

  public isInCart(bookId: string): boolean {
    // Проверка наличия в корзине
    return this.bookIds.includes(bookId);
  }

  public add(bookId: string): void {
    // Добавление в корзину
    this.bookIds.push(bookId);
    this.updateStorage();
  }

  public remove(bookId: string): void {
    // Удаление из корзины
    const index: number = this.bookIds.indexOf(bookId);
    if (index > -1) {
      this.bookIds.splice(index, 1);
      this.updateStorage();
    }
  }
  private updateStorage(): void {
    // Обновление localStorage
    window.localStorage.setItem('cart', JSON.stringify(this.bookIds));
  }
}
