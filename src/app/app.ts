import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenu } from './components/nav-menu/nav-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}