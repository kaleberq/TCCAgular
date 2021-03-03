import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosFinalizadosClienteComponent } from './pedidos-finalizados-cliente.component';

describe('PedidosFinalizadosClienteComponent', () => {
  let component: PedidosFinalizadosClienteComponent;
  let fixture: ComponentFixture<PedidosFinalizadosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosFinalizadosClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosFinalizadosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
