import { Component, inject, signal } from '@angular/core';
import { PaymentService } from '../../service/payment.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Translatable } from '../../../../core/i18n/translatable';

@Component({
  selector: 'app-payment-detail-component',
  imports: [NgClass, DatePipe, CurrencyPipe],
  templateUrl: './payment-detail-component.html',
  styleUrl: './payment-detail-component.css',
})
export class PaymentDetailComponent extends Translatable {}
