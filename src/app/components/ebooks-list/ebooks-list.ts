import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book } from '../../infrastructure/types/book';
import { EbookService } from '../../services/ebook.service';

@Component({
  selector: 'app-ebooks-list',
  templateUrl: './ebooks-list.html',
  styleUrls: ['./ebooks-list.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class EbooksListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private ebookService = inject(EbookService);
  
  book$!: Observable<Book | undefined>;

  ngOnInit(): void {
    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.ebookService.getBookById(+id);
        }
        return new Observable<undefined>();
      })
    );
  }
}
