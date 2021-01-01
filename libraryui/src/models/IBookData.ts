export default interface IBookData {
  id?: string;
  title: string;
  author: string;
  publishDate: string | Date;
  price: number;
  inStock: number;
  discount: number;
}
