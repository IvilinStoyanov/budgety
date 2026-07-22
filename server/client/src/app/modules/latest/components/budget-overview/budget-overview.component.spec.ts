/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

import { BudgetOverviewComponent } from './budget-overview.component';

describe('BudgetOverviewComponent', () => {
  let component: BudgetOverviewComponent;
  let fixture: ComponentFixture<BudgetOverviewComponent>;
  let transactionsServiceSpy: jasmine.SpyObj<TransactionsService>;

  beforeEach(async(() => {
    transactionsServiceSpy = jasmine.createSpyObj('TransactionsService', ['getLatestTransactions']);
    transactionsServiceSpy.getLatestTransactions.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [ BudgetOverviewComponent ],
      providers: [
        { provide: TransactionsService, useValue: transactionsServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
