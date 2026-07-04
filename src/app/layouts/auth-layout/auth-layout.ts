import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthCardComponent } from '../../features/auth/components/auth-card-component/auth-card-component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],

  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
