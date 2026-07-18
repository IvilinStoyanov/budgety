/* tslint:disable:no-unused-variable */
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MonthlyListComponent } from './monthly-list.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr
} from '@angular/common/http';

describe('MonthlyListComponent', () => {
  let component: MonthlyListComponent;
  let fixture: ComponentFixture<MonthlyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyListComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
