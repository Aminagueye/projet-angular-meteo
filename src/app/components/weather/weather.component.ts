import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class WeatherComponent implements OnInit {
  city: string = '';
  weatherData: any = null;
  loading: boolean = false;
  error: string | null = null;

  // Weather translation mapping
  private weatherTranslations: { [key: string]: string } = {
    // Main weather conditions
    'Clear': 'Dégagé',
    'Clouds': 'Nuageux',
    'Rain': 'Pluie',
    'Drizzle': 'Bruine',
    'Thunderstorm': 'Orage',
    'Snow': 'Neige',
    'Mist': 'Brume',
    'Fog': 'Brouillard',
    'Haze': 'Brume sèche',
    
    // Detailed descriptions
    'clear sky': 'ciel dégagé',
    'few clouds': 'quelques nuages',
    'scattered clouds': 'nuages épars',
    'broken clouds': 'nuages fragmentés',
    'overcast clouds': 'ciel couvert',
    'light rain': 'pluie légère',
    'moderate rain': 'pluie modérée',
    'heavy rain': 'forte pluie',
    'light snow': 'neige légère',
    'moderate snow': 'neige modérée',
    'heavy snow': 'forte neige',
    'thunderstorm': 'orage',
    'light thunderstorm': 'orage léger',
    'heavy thunderstorm': 'orage violent'
  };

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void { }

  searchWeather() {
    if (!this.city) return;
    
    this.loading = true;
    this.error = null;
    
    this.weatherService.getWeatherByCity(this.city)
      .subscribe({
        next: (data) => {
          this.weatherData = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Impossible de récupérer les données météo. Veuillez réessayer.';
          this.loading = false;
          this.weatherData = null;
        }
      });
  }

  getWeatherDescription(key: string): string {
    return this.weatherTranslations[key] || key;
  }
} 