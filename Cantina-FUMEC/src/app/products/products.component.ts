import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalProdutoComponent } from './modal/modal-produto/modal-produto.component';
import { ModalExcluirProdutoComponent } from './modal/modal-excluir-produto/modal-excluir-produto.component'
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  categories = [];
  carrinho;

  selectForm = new FormGroup({
    categoriaControl: new FormControl(''),
  });

  constructor(private toastr: ToastrService, private crudService: CrudService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.crudService.getProducts()
    .subscribe(dados => this.products = dados);
    this.crudService.getCategories()
    .subscribe(dados => this.categories = dados);
    this.crudService.getCarrinho()
    .subscribe(dados => this.carrinho = dados);
    console.log(this.selectForm.value.categoriaControl)
  }

  openDialog(product): void {
    // this.dialog.open(ModalProdutoComponent, { data: product, disableClose: true});

    const dialogRef = this.dialog.open(ModalProdutoComponent, { data: product, disableClose: true});

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.update();
    });
  }

  openDeleteDialog(id): void {
    // this.dialog.open(ModalExcluirProdutoComponent, {data: id, disableClose: true});

    const dialogRef = this.dialog.open(ModalExcluirProdutoComponent, { data: id, disableClose: true});

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.update();
    });
  }

  inserirNoCarrinho(id): void {
    console.log(this.carrinho)
    let cont = 0;
    let criar = 0;
    let alterar = 0;
    for (let items of this.carrinho.items) {
      cont = cont + 1;
      console.log(cont)
      console.log(items)
      console.log(this.carrinho.items)
      console.log(items.cartItem)
      console.log(this.carrinho.items[0].quantity)
      console.log(this.carrinho.items[0].cartItem.id)
        if(_.isMatch(items.cartItem, { 'id': id })){
          alterar = alterar + 1;
        } else{
          criar = criar + 1;
        }    
    }
    if(alterar > 0){
      let valor = 0;

      console.log("entrou")
      console.log(this.carrinho.value)
      console.log(this.carrinho.items[cont - 1].cartItem.price)
      console.log(this.carrinho.items[cont - 1].quantity + 1)
      let auxValue = this.carrinho.value;
      console.log(auxValue + ( (this.carrinho.items[cont - 1].cartItem.price * this.carrinho.items[cont - 1].quantity) ))
      this.carrinho.items[cont - 1].quantity = this.carrinho.items[cont - 1].quantity + 1;
      this.carrinho.items.forEach(element => {
        console.log(element)
        console.log(id)
        valor = ( valor + ( element.cartItem.price * element.quantity ) )
        console.log(element.cartItem.id)
        console.log(valor)
      });
      // this.carrinho.value = auxValue + ( (this.carrinho.items[cont - 1].cartItem.price * this.carrinho.items[cont - 1].quantity) )
      this.carrinho.value = valor;
      console.log(this.carrinho.value)
      this.crudService.editCarrinho(this.carrinho)
      .subscribe(dados => console.log(dados));
    } else if(criar > 0){
      let valor = this.carrinho.value
      console.log("entroooooooo")
      this.crudService.getSpecificProduct(id)
      .subscribe((dados) => {
        console.log(dados)
        let auxCarrinho = {
          cartItem: "",
          quantity: null
        };
        auxCarrinho.cartItem = dados;
        auxCarrinho.quantity = 1;
        valor = dados.price
        console.log(this.carrinho.value)
        console.log(valor)
        console.log(auxCarrinho)
        this.carrinho.items.push(auxCarrinho)
        this.carrinho.value = this.carrinho.value + valor
        console.log(this.carrinho.value)
        this.crudService.editCarrinho(this.carrinho)
        .subscribe(dados => console.log(dados));
      })
    }
    this.toastr.success('Produto adicionado ao carrinho!', '', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });  
  }

  trocarProdutos(ev): void {
    this.categories.forEach(categoria => {
        if(_.isMatch(categoria, { 'cardTitle': this.selectForm.get('categoriaControl').value })){
          this.products = categoria.menu;
        }
    });
  }

  update(){
    console.log("entrou aquiii")
    this.crudService.getCategories()
    .subscribe((dados) => {
      this.categories = dados;
      this.categories.forEach(categoria => {
        if(_.isMatch(categoria, { 'cardTitle': this.selectForm.get('categoriaControl').value })){
          this.products = categoria.menu;
        }
    });
      console.log("okokokok")
    });
  }

}
