import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';
import { CrudService } from '../../../crud.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-produto',
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.css']
})
export class ModalProdutoComponent implements OnInit {

  dataProduct = [];
  dataSpecificProduct;
  categories = [];
  public auxCategoria;
  selecionada;
  auxCategoriaEspecifica;
  categoriaAnterior;

  produtoForm = new FormGroup({
    id: new FormControl('', {validators: [Validators.required, this.verificaIDRepetido()], updateOn: 'blur'}),
    categoria: new FormControl('', Validators.required),
    imagem: new FormControl('', Validators.required),
    nome: new FormControl('', {validators: [Validators.required, this.verificaNomeRepetido()], updateOn: 'blur'}),
    description: new FormControl('', Validators.required),
    price: new FormControl('', {validators: [Validators.required, this.verificaPrice()], updateOn: 'blur'}),
  });

  constructor(private toastr: ToastrService, private crudService: CrudService, public dialogRef: MatDialogRef<ModalProdutoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.crudService.getProducts()
    .subscribe(dados => this.passaTodosDados(dados));
    this.crudService.getCategories()
    .subscribe(dados => this.categories = dados);
    if(this.data !== 0){
      this.crudService.getSpecificProduct(this.data)
      .subscribe(dados => this.preencheDadosPorId(dados));
    }
  }

  preencheDadosPorId(dados): void {
    this.dataSpecificProduct = dados;
    this.categories.forEach(categoria => {
      console.log(categoria)
      categoria.menu.forEach(element => {
        console.log(element)
        if(_.isMatch(element, { 'name': dados.name })){
          console.log("entrou3")
          this.produtoForm.patchValue({
            categoria: categoria.cardTitle
          })
          this.selecionada = categoria.cardTitle;
          this.categoriaAnterior = categoria.cardTitle;
          console.log(this.categoriaAnterior);
          console.log(this.produtoForm.get('categoria').value)
          console.log(this.produtoForm.value.categoria)
        }
      });
    });
    this.produtoForm.patchValue({
      id: dados.id,
      imagem: dados.imagePath,
      nome: dados.name,
      description: dados.description,
      price: dados.price,
    });
  }

  verificaNomeRepetido(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let repetido = false;
      this.dataProduct.forEach(product => {
        if(_.isMatch(product, { 'name': control.value })){
          if(this.data === 0){
            repetido = true
          }
          else if(_.isMatch(product, { 'id': this.dataSpecificProduct.id })){
            repetido = false;
          } else{
            repetido = true;
          }
        }
      });
      return repetido ? { 'nomeExistente': repetido } : null;
    };
  }

  verificaIDRepetido(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let repetido = false;
      this.dataProduct.forEach(product => {
        if(_.isMatch(product, { 'id': control.value })){
          if(this.data === 0){
            repetido = true
          }
          else if(_.isMatch(product, { 'id': this.dataSpecificProduct.id })){
            repetido = false;
          } else{
            repetido = true;
          }
        }
      });
      return repetido ? { 'idExistente': repetido } : null;
    };
  }

  verificaPrice(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let repetido = false;
      if(!(/^[0-9.]*$/.test(control.value))){
        repetido = true
      }else if(control.value.toString().split('.').length -1 > 1){
        repetido = true
      }
      return repetido ? { 'priceInvalido': repetido } : null;
    };
  }

  passaTodosDados(dados): void {
    this.dataProduct = dados;
  }

  inserirNoCarrinho(id): void {
    
  }

  salvar(id) : void {
    let newData = {
      id: this.produtoForm.get('id').value,
      imagePath: this.produtoForm.get('imagem').value,
      name: this.produtoForm.get('nome').value,
      description: this.produtoForm.get('description').value,
      price: parseFloat(this.produtoForm.get('price').value),
    }

    if(id !== 0){
      console.log(this.produtoForm.get('categoria').value)
      console.log(this.categoriaAnterior);
      if(this.categoriaAnterior === this.produtoForm.get('categoria').value){
        console.log("entrou mesmo")
        let auxObjeto = this.categories;
        auxObjeto.forEach(categoria => {
          if(_.isMatch(categoria, { 'cardTitle': this.produtoForm.get('categoria').value })){
            let auxID = categoria.id
            this.crudService.getSpecificCategory(auxID)
            .subscribe((dados) => {console.log(dados)
             this.auxCategoriaEspecifica = dados
             let index = _.findIndex(this.auxCategoriaEspecifica.menu, {id: this.produtoForm.get('id').value});
             this.auxCategoriaEspecifica.menu.splice(index, 1, newData);
             this.crudService.editCategory(auxID, this.auxCategoriaEspecifica)
             .subscribe(dados => console.log(dados));
           })
          }
          console.log(this.auxCategoria)
        });
      } 
      else {
        let auxObjeto = this.categories;
        auxObjeto.forEach(categoria => {
          if(_.isMatch(categoria, { 'id': this.produtoForm.get('categoria').value })){
            let auxID = categoria.id;
           this.crudService.getSpecificCategory(auxID)
           .subscribe((dados) => {console.log(dados)
            this.auxCategoria = dados
            console.log(this.auxCategoria)
                this.auxCategoria.menu.push(newData)
                this.crudService.editCategory(auxID, this.auxCategoria)
                .subscribe(dados => console.log(dados));
          })
          }
          else if(_.isMatch(categoria, { 'cardTitle': this.categoriaAnterior })){
          let auxID = categoria.id
          this.crudService.getSpecificCategory(auxID)
          .subscribe((dados) => {console.log(dados)
           this.auxCategoriaEspecifica = dados
           let index = _.findIndex(this.auxCategoriaEspecifica.menu, {id: this.produtoForm.get('id').value});
           this.auxCategoriaEspecifica.menu.splice(index, 1);
           this.crudService.editCategory(auxID, this.auxCategoriaEspecifica)
           .subscribe(dados => console.log(dados));
         })
        }
          console.log(this.auxCategoria)
        });
      }
    this.crudService.editProduct(id, newData)
    .subscribe(dados => console.log(dados));
    this.toastr.success('Produto alterado com sucesso!', '', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
    this.fechar();
    } else if(id === 0){
      let auxObjeto = this.categories;
      auxObjeto.forEach(categoria => {
        if(_.isMatch(categoria, { 'id': this.produtoForm.get('categoria').value })){
          let auxID = categoria.id;
         this.crudService.getSpecificCategory(auxID)
         .subscribe((dados) => {console.log(dados)
          this.auxCategoria = dados
          console.log(this.auxCategoria)
              this.auxCategoria.menu.push(newData)
              this.crudService.editCategory(auxID, this.auxCategoria)
              .subscribe(dados => console.log(dados));
        })
          console.log(this.auxCategoria)
        }
        console.log(this.auxCategoria)
      });
      this.crudService.createProduct(newData)
      .subscribe(dados => console.log(dados));
      this.toastr.success('Produto cadastrado com sucesso!', '', {
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
