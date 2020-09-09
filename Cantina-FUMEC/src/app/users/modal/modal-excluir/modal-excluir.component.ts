import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CrudService } from '../../../crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-excluir',
  templateUrl: './modal-excluir.component.html',
  styleUrls: ['./modal-excluir.component.css']
})
export class ModalExcluirComponent implements OnInit {

  nome

  constructor(private toastr: ToastrService, private crudService: CrudService, public dialogRef: MatDialogRef<ModalExcluirComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.crudService.getSpecificUser(this.data)
    .subscribe(dados => this.nome = dados.name); 
  }

  fechar() : void {
    this.dialogRef.close();
  }

  deletar() : void {
    this.crudService.deleteUser(this.data)
    .subscribe(dados => console.log(dados)); 
    this.toastr.success('Usuário deletado com sucesso!', '', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
    this.dialogRef.close();
    // this.fechar();
  }

}
