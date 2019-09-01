import { Component } from '@angular/core';
import { HttpStatusService } from './services/http-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'marvel-comics';
}
