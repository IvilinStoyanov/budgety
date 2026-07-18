import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MonthlyTransactionListComponent } from './monthly-transaction-list.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr
} from '@angular/common/http';

describe('MonthlyTransactionListComponent', () => {
  let component: MonthlyTransactionListComponent;
  let fixture: ComponentFixture<MonthlyTransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyTransactionListComponent],
      imports: [RouterTestingModule],
      providers: [
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
