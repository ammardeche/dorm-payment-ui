import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { BreadCrumb } from '../../shared/components/bread-crumb/bread-crumb';

@Component({
  selector: 'app-header-component',
  imports: [BreadCrumb],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  lang = inject(LanguageService);

  setLang(lang: 'en' | 'pl') {
    this.lang.setLang(lang);
  }
}
