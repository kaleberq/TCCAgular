import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraSalgadoComponent } from './cadastra-salgado.component';

describe('CadastraSalgadoComponent', () => {
  let component: CadastraSalgadoComponent;
  let fixture: ComponentFixture<CadastraSalgadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastraSalgadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastraSalgadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
