import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../Service/auth.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        HeaderComponent,
        RegisterComponent
      ],
      providers: [AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    spyOn(authService, 'register').and.returnValue(of({ message: 'User registered successfully' }));
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register a user successfully', () => {
    spyOn(console, 'log');
    
    component.email = 'test@example.com';
    component.password = 'password';
    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith({ email: component.email, password: component.password });
    expect(console.log).toHaveBeenCalledWith('User registered successfully:', { message: 'User registered successfully' });
  });

  it('should handle registration error', () => {
    spyOn(console, 'error');
    (authService.register as jasmine.Spy).and.returnValue(throwError('Registration failed'));

    component.email = 'test@example.com';
    component.password = 'password';
    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith({ email: component.email, password: component.password });
    expect(console.error).toHaveBeenCalledWith('Error:', 'Registration failed');
  });

  it('should render form elements correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[type="email"]').getAttribute('name')).toBe('email');
    expect(compiled.querySelector('input[type="password"]').getAttribute('name')).toBe('password');
    expect(compiled.querySelector('button[type="submit"]').textContent).toContain('Register');
  });

  it('should navigate to login on link click', () => {
    const compiled = fixture.nativeElement;
    const link = compiled.querySelector('a[routerLink="/login"]');
    expect(link).toBeTruthy();
  });
});
