import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-header-component',
  imports: [],
  templateUrl: './auth-header-component.html',
  styleUrl: './auth-header-component.css',
})
export class AuthHeaderComponent {
  title = input<string>('');
  subtitle = input<string>('');
}
