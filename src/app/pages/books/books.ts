import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { Book } from '../../infrastructure/types/book';
import { EbookService } from '../../services/ebook.service';

type FilterType = 'all' | 'read' | 'notRead';

@Component({
  selector: 'app-books',
  templateUrl: './books.html',
  styleUrls: ['./books.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class BooksComponent implements OnInit {
  private ebookService = inject(EbookService);
  
  private allBooksSubject = new BehaviorSubject<Book[]>([]);
  private deletedBookIdsSubject = new BehaviorSubject<Set<number>>(new Set());
  private filterSubject = new BehaviorSubject<FilterType>('all');
  
  books$!: Observable<Book[]>;
  currentFilter: FilterType = 'all';

  ngOnInit(): void {
    // Load books from service
    this.ebookService.getBooks().subscribe(books => {
      // Assign random read status for demo purposes
      const booksWithReadStatus = books.map(book => ({
        ...book,
        read: Math.random() > 0.5
      }));
      this.allBooksSubject.next(booksWithReadStatus);
    });

    // Combine all books, deleted IDs, and filter to create filtered list
    this.books$ = combineLatest([
      this.allBooksSubject,
      this.deletedBookIdsSubject,
      this.filterSubject
    ]).pipe(
      map(([books, deletedIds, filter]) => {
        // Filter out deleted books
        let filteredBooks = books.filter(book => !deletedIds.has(book.id));
        
        // Apply read/not read filter
        if (filter === 'read') {
          filteredBooks = filteredBooks.filter(book => book.read);
        } else if (filter === 'notRead') {
          filteredBooks = filteredBooks.filter(book => !book.read);
        }
        
        return filteredBooks;
      })
    );
  }

  deleteBook(bookId: number): void {
    const currentDeletedIds = this.deletedBookIdsSubject.value;
    const newDeletedIds = new Set(currentDeletedIds);
    newDeletedIds.add(bookId);
    this.deletedBookIdsSubject.next(newDeletedIds);
  }

  setFilter(filter: FilterType): void {
    this.currentFilter = filter;
    this.filterSubject.next(filter);
  }

  isActiveFilter(filter: FilterType): boolean {
    return this.currentFilter === filter;
  }
}