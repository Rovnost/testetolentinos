import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';
import { CrudService } from '../../../../crud.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.css']
})
export class ModalCategoriaComponent implements OnInit {

  dataCategory = [];
  dataSpecificCategory;

  categoriaForm = new FormGroup({
    titulo: new FormControl('', {validators: [Validators.required, this.verificaTituloRepetido()], updateOn: 'blur'}),
    subtitulo: new FormControl('', Validators.required),
    imagem: new FormControl('', Validators.required),
  });

  constructor(private toastr: ToastrService, private crudService: CrudService, public dialogRef: MatDialogRef<ModalCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.crudService.getCategories()
    .subscribe(dados => this.passaTodosDados(dados));
    if(this.data > 0){
      this.crudService.getSpecificCategory(this.data)
      .subscribe(dados => this.preencheDadosPorId(dados));
    }
  }

  preencheDadosPorId(dados): void {
    this.dataSpecificCategory = dados;
    this.categoriaForm.patchValue({
      titulo: dados.cardTitle,
      subtitulo: dados.cardSubtitle,
      imagem: dados.imagem,
    });
  }

  verificaTituloRepetido(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let repetido = false;
      this.dataCategory.forEach(user => {
        if(_.isMatch(user, { 'cardTitle': control.value })){
          if(this.data === 0){
            repetido = true
          }
          else if(_.isMatch(user, { 'id': this.dataSpecificCategory.id })){
            repetido = false;
          } else{
            repetido = true;
          }        }
      });
        return repetido ? { 'tituloExistente': repetido } : null;
    };
  }

  passaTodosDados(dados): void {
    this.dataCategory = dados;
  }

  salvar(id) : void {
    let newData = {
      cardTitle: this.categoriaForm.get('titulo').value,
      cardSubtitle: this.categoriaForm.get('subtitulo').value,
      imagem: this.categoriaForm.get('imagem').value,
      menu: []
    }

    if(id > 0){
    newData.menu = this.dataSpecificCategory.menu
    this.crudService.editCategory(id, newData)
    .subscribe(dados => console.log(dados));
    this.toastr.success('Categoria alterada com sucesso!', '', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
    this.fechar();
    } else if(id === 0){
      this.crudService.createCategory(newData)
      .subscribe(dados => console.log(dados));
      this.toastr.success('Categoria cadastrada com sucesso!', '', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
      this.fechar();
    }
  }

  fechar() : void {
    this.dialogRef.close();
  }

}
