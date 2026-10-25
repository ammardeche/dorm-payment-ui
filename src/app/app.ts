import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadCrumb } from './shared/components/bread-crumb/bread-crumb';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BreadCrumb],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('dorm-payment-ui');
}
