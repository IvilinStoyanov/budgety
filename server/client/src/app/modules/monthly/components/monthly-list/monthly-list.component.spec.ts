/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MonthlyListComponent } from './monthly-list.component';

describe('MonthlyListComponent', () => {
  let component: MonthlyListComponent;
  let fixture: ComponentFixture<MonthlyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyListComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule]
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
