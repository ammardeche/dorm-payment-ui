import { Component, input } from '@angular/core';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-auth-input-component',
  imports: [FormField],
  templateUrl: './auth-input-component.html',
  styleUrl: './auth-input-component.css',
})
export class AuthInputComponent {
  label = input<string>('');
  field = input<any>();
  placeholder = input<string>('');
  type = input<string>('');
}
