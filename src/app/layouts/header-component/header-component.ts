import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-header-component',
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  lang = inject(LanguageService);

  setLang(lang: 'en' | 'pl') {
    this.lang.setLang(lang);
  }
}
