import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthGuard, AuthService]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow the authenticated user to access app', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    expect(authGuard.canActivate()).toBe(true);
  });

  it('should redirect an unauthenticated user to the login route', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    spyOn(router, 'navigate');
    expect(authGuard.canActivate()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
