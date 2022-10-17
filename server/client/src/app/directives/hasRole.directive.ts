import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../models/interface/user';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string;
  isVisible: boolean = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.authService.currentUser$.pipe(take(1)).subscribe((user: User) => {
      if (!user.role) {
        this.viewContainerRef.clear();
      }

      if (user.role === this.appHasRole) {
        if (!this.isVisible) {
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    })
  }
}
