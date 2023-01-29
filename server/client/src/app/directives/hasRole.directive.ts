import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { filter, take, tap } from 'rxjs/operators';
import { IUser } from '../models/interface/User';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(
        take(1),
        tap(() => this.viewContainerRef.clear())
        , filter(user => user.role === this.appHasRole))
      .subscribe(() => {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      });
  }
}
