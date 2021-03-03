import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosParaFazerComponent } from './pedidos-para-fazer.component';

describe('PedidosParaFazerComponent', () => {
  let component: PedidosParaFazerComponent;
  let fixture: ComponentFixture<PedidosParaFazerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosParaFazerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosParaFazerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
