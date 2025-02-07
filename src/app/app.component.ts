import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MeteoComponent } from './components/meteo/meteo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet, 
    MeteoComponent
  ],
  standalone: true
})
export class AppComponent {
  title = 'Application météo';
}
