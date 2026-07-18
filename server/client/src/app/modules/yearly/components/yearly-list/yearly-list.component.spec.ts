/* tslint:disable:no-unused-variable */
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { YearlyListComponent } from './yearly-list.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr
} from '@angular/common/http';

describe('YearlyListComponent', () => {
  let component: YearlyListComponent;
  let fixture: ComponentFixture<YearlyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YearlyListComponent],
      imports: [],
      providers: [
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
