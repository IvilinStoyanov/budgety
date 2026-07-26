import {
  ChangeDetectionStrategy,
  Component,
  HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from 'src/app/modules/shared/state/user/user.selector';
import { Locale } from 'src/app/shared/i18n/locales';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { environment } from 'src/environments/environment';

import * as userActions from '../../../modules/shared/state/user/user.actions';
import { IUser } from '../../models/interface/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class HeaderComponent {
  user$: Observable<IUser>;
  mobileMenuOpen = false;
  readonly availableLanguages: readonly Locale[];
  readonly currentLanguage$: Observable<Locale>;

  constructor(
    public router: Router,
    public commonService: CommonService,
    public authService: AuthService,
    public languageService: LanguageService,
    private store: Store
  ) {
    this.user$ = this.store.select(selectUser);
    this.availableLanguages = this.languageService.availableLanguages;
    this.currentLanguage$ = this.languageService.currentLanguage$;
  }

  setLanguage(locale: Locale): void {
    this.languageService.setLanguage(locale);
  }

  login(): void {
    this.mobileMenuOpen = false;
    window.open(`${environment.apiUrl}/auth/google`, '_self');
  }

  logout(): void {
    this.mobileMenuOpen = false;
    this.store.dispatch(userActions.logoutUser());
  }

  navigateHome(): void {
    this.mobileMenuOpen = false;
    this.router.navigate(['/']);
    this.commonService.currentTabIndex.next(0);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeMobileMenu();
  }
}
