import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isLoggedIn', () => {
    it('should return true if the user is logged in', () => {
      service.setLoggedIn(true);
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false if the user is not logged in', () => {
      service.setLoggedIn(false);
      expect(service.isLoggedIn()).toBeFalse();
    });
  });

  describe('login', () => {
    it('should store the token in localStorage on login', () => {
      const token = 'fake-token';
      const credentials = { email: 'test@example.com', password: 'password' };
      spyOn(localStorage, 'setItem');

      service.login(credentials).subscribe(response => {
        expect(localStorage.setItem).toHaveBeenCalledWith('token', response.token);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/login');
      expect(req.request.method).toBe('POST');
      req.flush({ token });
    });
  });

  describe('register', () => {
    it('should call the register API', () => {
      const user = { email: 'test@example.com', password: 'password' };
      service.register(user).subscribe(response => {
        expect(response).toEqual(user);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/register');
      expect(req.request.method).toBe('POST');
      req.flush(user);
    });
  });

  describe('logout', () => {
    it('should remove the token from localStorage on logout', () => {
      spyOn(localStorage, 'removeItem');

      service.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });
});
