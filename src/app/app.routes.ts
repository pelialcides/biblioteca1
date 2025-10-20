import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full' 
    },
    { 
        path: 'home', 
        component: HomeComponent
    },
    { 
        path: 'books', 
        loadComponent: () => import('./components/books/books').then(m => m.BooksComponent)
    },
    { 
        path: 'books/:id', 
        loadComponent: () => import('./components/ebooks-list/ebooks-list').then(m => m.EbooksListComponent)
    },
    { 
        path: 'me', 
        loadComponent: () => import('./components/me/me').then(m => m.MeComponent)
    },
];