/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LatestListComponent } from './latest-list.component';

describe('LatestListComponent', () => {
  let component: LatestListComponent;
  let fixture: ComponentFixture<LatestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatestListComponent],
      imports: [
        MatDialogModule,
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientTestingModule
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
