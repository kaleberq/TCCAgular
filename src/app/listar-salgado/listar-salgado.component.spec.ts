import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSalgadoComponent } from './listar-salgado.component';

describe('ListarSalgadoComponent', () => {
  let component: ListarSalgadoComponent;
  let fixture: ComponentFixture<ListarSalgadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSalgadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSalgadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
