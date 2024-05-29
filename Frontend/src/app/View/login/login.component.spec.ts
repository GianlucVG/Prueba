import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../Service/auth.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        HeaderComponent
      ],
      providers: [AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    spyOn(authService, 'login').and.returnValue(of({ token: 'test-token' }));
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and navigate to /entidades', () => {
    component.email = 'test@example.com';
    component.password = 'password';
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({ email: component.email, password: component.password });
    expect(localStorage.getItem('token')).toBe('test-token');
    expect(router.navigate).toHaveBeenCalledWith(['/entidades']);
  });

  it('should fail login with incorrect credentials', () => {
    spyOn(console, 'error');
    (authService.login as jasmine.Spy).and.returnValue(throwError('Login failed'));

    component.email = 'wrong@example.com';
    component.password = 'wrongpassword';
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({ email: component.email, password: component.password });
    expect(console.error).toHaveBeenCalled();
  });

  it('should render form elements correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[type="email"]').getAttribute('name')).toBe('email');
    expect(compiled.querySelector('input[type="password"]').getAttribute('name')).toBe('password');
    expect(compiled.querySelector('button[type="submit"]').textContent).toContain('Login');
  });

  it('should navigate to register on link click', () => {
    const compiled = fixture.nativeElement;
    const link = compiled.querySelector('a[routerLink="/register"]');
    expect(link).toBeTruthy();
  });
});
