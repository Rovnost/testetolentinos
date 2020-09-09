import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CrudService } from '../../../../crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-excluir-categoria',
  templateUrl: './modal-excluir-categoria.component.html',
  styleUrls: ['./modal-excluir-categoria.component.css']
})
export class ModalExcluirCategoriaComponent implements OnInit {

  nome;

  constructor(private toastr: ToastrService, private crudService: CrudService, public dialogRef: MatDialogRef<ModalExcluirCategoriaComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.crudService.getSpecificCategory(this.data)
    .subscribe(dados => this.nome = dados.cardTitle); 
  }

  fechar() : void {
    this.dialogRef.close();
  }

  deletar() : void {
    this.crudService.deleteCategory(this.data)
    .subscribe(dados => console.log(dados)); 
    this.toastr.success('Categoria deletada com sucesso!', '', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
    this.fechar();
  }

}
