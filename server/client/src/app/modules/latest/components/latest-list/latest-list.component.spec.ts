/* tslint:disable:no-unused-variable */
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { LatestListComponent } from './latest-list.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr
} from '@angular/common/http';

describe('LatestListComponent', () => {
  let component: LatestListComponent;
  let fixture: ComponentFixture<LatestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatestListComponent],
      imports: [SharedModule, MatDialogModule, RouterTestingModule, MatSnackBarModule, StoreModule.forRoot({})],
      providers: [
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
