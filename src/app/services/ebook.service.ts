import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../infrastructure/types/book';

@Injectable({
  providedIn: 'root'
})
export class EbookService {
  private apiUrl = 'https://my-json-server.typicode.com/JoaoGoncalves/biblio-api/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }
}