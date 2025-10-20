export interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
  imageUrl: string;
  imageUrlGr: string;
  description: String;
  read?: boolean; // Adicionar propriedade read para rastrear se o livro foi lido
}