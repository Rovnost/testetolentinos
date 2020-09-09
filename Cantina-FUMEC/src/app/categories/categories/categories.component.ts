import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalCategoriaComponent } from './modal/modal-categoria/modal-categoria.component'
import { ModalExcluirCategoriaComponent } from './modal/modal-excluir-categoria/modal-excluir-categoria.component'


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories = []

  constructor(private crudService: CrudService, public dialog: MatDialog) { }

  ngOnInit() {
    this.crudService.getCategories()
    .subscribe(dados => this.categories = dados);
  }

  openDialog(categoria): void {
    // this.dialog.open(ModalCategoriaComponent, { data: categoria, disableClose: true});

    const dialogRef = this.dialog.open(ModalCategoriaComponent, { data: categoria, disableClose: true});

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.update();
    });
  }

  openDeleteDialog(id): void {
    // this.dialog.open(ModalExcluirCategoriaComponent, {data: id, disableClose: true});

    const dialogRef = this.dialog.open(ModalExcluirCategoriaComponent, { data: id, disableClose: true});

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.update();
    });
  }

  update(){
    console.log("entrou aquiii")
    this.crudService.getCategories()
    .subscribe((dados) => {
      console.log("okokokok")
      this.categories = dados
    });
  }

}
