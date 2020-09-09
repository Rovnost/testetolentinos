import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirProdutoComponent } from './modal-excluir-produto.component';

describe('ModalExcluirProdutoComponent', () => {
  let component: ModalExcluirProdutoComponent;
  let fixture: ComponentFixture<ModalExcluirProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExcluirProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExcluirProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
