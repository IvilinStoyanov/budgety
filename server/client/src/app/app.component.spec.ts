import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { IUser } from './models/interface/User';
import { AuthService } from './services/auth.service';
import { Z_NO_FLUSH } from 'zlib';

describe('AppComponent', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthService
      ]
    }).compileComponents();

    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  }));

  afterEach(() => {
    httpMock.verify();
  })

  // it('should create the app', () => {
  //   app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'budgety'`, () => {
  //   expect(app.title).toEqual('budgety');
  // });

  it('should fetch user after ngOnInit via GET', () => {
    const mockUser: IUser = {
      exp: 0,
      googleId: "108281570134163898926",
      inc: 23556, isCategoriesSet: true,
      role: "Member",
      savings: 0,
      _id: "636be8ee116de1f94191284e",
      incPercentage: 0,
      expPercentage: 0
    };

    authService.fetchUser().subscribe(user => {
      console.log(user);
      expect(user).toEqual(mockUser);
    });

    const request = httpMock.match(`/api/current_user`);

   // expect(request.).toBe('GET');

   request.forEach(request => {
    request.flush(mockUser);
   })
    // request.flush(mockUser);
  })
});
