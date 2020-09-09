import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CrudService } from './../../../crud.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-modal-excluir-produto',
  templateUrl: './modal-excluir-produto.component.html',
  styleUrls: ['./modal-excluir-produto.component.css']
})
export class ModalExcluirProdutoComponent implements OnInit {

  nome;
  auxCategoriaEspecifica;
  categories = [];

  constructor(private toastr: ToastrService, private crudService: CrudService, public dialogRef: MatDialogRef<ModalExcluirProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.crudService.getSpecificProduct(this.data)
    .subscribe(dados => this.nome = dados.name); 
    this.crudService.getCategories()
    .subscribe(dados => this.categories = dados);
  }

  fechar() : void {
    this.dialogRef.close();
  }

  deletar() : void {
    this.crudService.deleteProduct(this.data)
    .subscribe(dados => console.log(dados));
    this.categories.forEach(element => {
      element.menu.forEach(produto => {
        if(produto.id === this.data){
          let auxID = element.id
          this.crudService.getSpecificCategory(auxID)
          .subscribe((dados) => {
            this.auxCategoriaEspecifica = dados;
            let index = _.findIndex(dados.menu, {id: this.data});
            this.auxCategoriaEspecifica.menu.splice(index, 1);
            this.crudService.editCategory(auxID, this.auxCategoriaEspecifica)
            .subscribe(dados => console.log(dados));
          })
        }
      });
    });
    this.toastr.success('Produto deletado com sucesso!', '', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
    this.fechar();
  }

}
