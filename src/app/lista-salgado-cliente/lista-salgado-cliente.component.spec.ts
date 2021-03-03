import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSalgadoClienteComponent } from './lista-salgado-cliente.component';

describe('ListaSalgadoClienteComponent', () => {
  let component: ListaSalgadoClienteComponent;
  let fixture: ComponentFixture<ListaSalgadoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSalgadoClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSalgadoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
