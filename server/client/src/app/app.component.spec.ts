import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    }).compileComponents();
  }));

  afterEach(() => {
    httpMock.verify();
  });
});
