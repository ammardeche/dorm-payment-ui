import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../services/translation.service';

export class Translatable {
  protected i18n = inject(TranslationService);

  protected t(key: string, params?: any): string {
    return this.i18n.t(key, params);
  }
}
