import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVendasMensalComponent } from './relatorio-vendas-mensal.component';

describe('RelatorioVendasMensalComponent', () => {
  let component: RelatorioVendasMensalComponent;
  let fixture: ComponentFixture<RelatorioVendasMensalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioVendasMensalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVendasMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
