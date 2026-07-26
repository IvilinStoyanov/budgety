import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import {
  DEFAULT_LOCALE,
  Locale,
  normalizeLocale,
  SUPPORTED_LOCALES
} from '../i18n/locales';

const LOCALE_STORAGE_KEY = 'budgety.locale';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  readonly availableLanguages: readonly Locale[] = SUPPORTED_LOCALES;

  private readonly currentLanguageSubject = new BehaviorSubject<Locale>(
    DEFAULT_LOCALE
  );

  readonly currentLanguage$: Observable<Locale> =
    this.currentLanguageSubject.asObservable();

  constructor(private readonly translateService: TranslateService) {}

  init(): void {
    const initialLanguage = this.resolveInitialLanguage();
    this.translateService.setDefaultLang(DEFAULT_LOCALE);
    this.applyLanguage(initialLanguage);
  }

  setLanguage(locale: Locale): void {
    this.applyLanguage(locale);
  }

  getLanguage(): Locale {
    return this.currentLanguageSubject.value;
  }

  private applyLanguage(locale: Locale): void {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch (_error) {
      // Ignore storage errors to keep language switching non-blocking.
    }

    this.translateService.use(locale).subscribe(() => {
      this.currentLanguageSubject.next(locale);
    });
  }

  private resolveInitialLanguage(): Locale {
    const savedLocale = this.getSavedLocale();
    if (savedLocale) {
      return savedLocale;
    }

    const browserLocale = this.getBrowserLocale();
    if (browserLocale) {
      return browserLocale;
    }

    return DEFAULT_LOCALE;
  }

  private getSavedLocale(): Locale | null {
    try {
      const savedValue = localStorage.getItem(LOCALE_STORAGE_KEY);
      return normalizeLocale(savedValue);
    } catch (_error) {
      return null;
    }
  }

  private getBrowserLocale(): Locale | null {
    if (typeof navigator === 'undefined') {
      return null;
    }

    return normalizeLocale(navigator.language);
  }
}
