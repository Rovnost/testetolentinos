import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalUsuarioComponent } from './modal/modal-usuario/modal-usuario.component';
import { ModalExcluirComponent } from './modal/modal-excluir/modal-excluir.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = []

  constructor(private crudService: CrudService, public dialog: MatDialog) { }

  ngOnInit() {
    this.crudService.getUsers()
    .subscribe(dados => this.users = dados);
  }

  openDialog(user): void {
    // this.dialog.open(ModalUsuarioComponent, { data: user, disableClose: true});

    const dialogRef = this.dialog.open(ModalUsuarioComponent, { data: user, disableClose: true});

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.update();
    });
  }

  openDeleteDialog(id): void {
    // this.dialog.open(ModalExcluirComponent, {data: id, disableClose: true});

    const dialogRef = this.dialog.open(ModalExcluirComponent, { data: id, disableClose: true});

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.update();
    });
  }

  update(){
    console.log("entrou aquiii")
    this.crudService.getUsers()
    .subscribe((dados) => {
      console.log("okokokok")
      this.users = dados
    });
  }

  // get(): void{
  //   this.crudService.getUsers()
  //   .subscribe(dados => this.passaDados(dados));
  // }

  // passaDados(dados): void{
  //   this.users = dados;
  // }

  // deletar(id): void {    
  //   this.crudService.deleteUser(3)
  //   .subscribe(dados => console.log(dados));
  //   this.get();
  // }
  

}
