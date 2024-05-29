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
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const dummyUser = { email: 'test@example.com', password: '123456' };
    const dummyResponse = { message: 'User registered successfully' };

    service.register(dummyUser).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should login a user', () => {
    const dummyCredentials = { email: 'test@example.com', password: '123456' };
    const dummyResponse = { token: 'fake-jwt-token' };

    service.login(dummyCredentials).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should return true if the user is authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-jwt-token');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should return false if the user is not authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.isAuthenticated()).toBe(false);
  });
});
