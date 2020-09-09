import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirCategoriaComponent } from './modal-excluir-categoria.component';

describe('ModalExcluirCategoriaComponent', () => {
  let component: ModalExcluirCategoriaComponent;
  let fixture: ComponentFixture<ModalExcluirCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExcluirCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExcluirCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
