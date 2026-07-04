import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-auth-button-component',
  imports: [],
  templateUrl: './auth-button-component.html',
  styleUrl: './auth-button-component.css',
})
export class AuthButtonComponent {
  loading = input<boolean>(false);
}
