import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { PaymentService } from '../../service/payment.service';
import { form, FormField } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Translatable } from '../../../../core/i18n/translatable';

@Component({
  selector: 'app-payment-component',
  imports: [],
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css',
})
export class PaymentComponent {}
