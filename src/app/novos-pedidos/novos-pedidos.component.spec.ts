import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovosPedidosComponent } from './novos-pedidos.component';

describe('NovosPedidosComponent', () => {
  let component: NovosPedidosComponent;
  let fixture: ComponentFixture<NovosPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovosPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovosPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
