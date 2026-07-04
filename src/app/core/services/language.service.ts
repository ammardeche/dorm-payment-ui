import { Injectable, signal, Signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLanguage = signal<'en' | 'pl'>('en');

  constructor(private translate: TranslateService) {
    const saved = (localStorage.getItem('lang') as 'en' | 'pl') || 'en';

    this.translate.setFallbackLang(saved);
    this.setLang(saved);
  }

  setLang(lang: 'en' | 'pl') {
    this.currentLanguage.set(lang);
    localStorage.setItem('lang', lang);

    this.translate.use(lang);
  }

  getLang() {
    return this.currentLanguage();
  }
}
