import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let executeGuard: CanActivateFn;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    executeGuard = (...guardParameters) => 
        TestBed.runInInjectionContext(() => authGuard(...guardParameters));
  });

  it('should allow the authenticated user to access the route', () => {
    authService.isLoggedIn.and.returnValue(true);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeTrue();
  });

  it('should not allow the unauthenticated user to access the route', () => {
    authService.isLoggedIn.and.returnValue(false);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
