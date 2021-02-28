import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosAprovadosClienteComponent } from './pedidos-aprovados-cliente.component';

describe('PedidosAprovadosClienteComponent', () => {
  let component: PedidosAprovadosClienteComponent;
  let fixture: ComponentFixture<PedidosAprovadosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosAprovadosClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosAprovadosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
