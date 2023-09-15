/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { YearlyListComponent } from './yearly-list.component';

describe('YearlyListComponent', () => {
  let component: YearlyListComponent;
  let fixture: ComponentFixture<YearlyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YearlyListComponent],
      imports: [HttpClientTestingModule]
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
