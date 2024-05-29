import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoContribuyenteFormComponent } from './tipo-contribuyente-form.component';

describe('TipoContribuyenteFormComponent', () => {
  let component: TipoContribuyenteFormComponent;
  let fixture: ComponentFixture<TipoContribuyenteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoContribuyenteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoContribuyenteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
