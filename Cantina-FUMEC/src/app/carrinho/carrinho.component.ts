import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  order;
  products = [];
  valorTotal;
  carrinho;
  valorBusca;
  searchProducts;
  pesquisaAtiva = false;

  constructor(private crudService: CrudService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.crudService.getCarrinho()
    .subscribe(dados => this.preencher(dados, null));
    this.crudService.getCarrinho()
    .subscribe(dados => this.carrinho = dados);
  }

  preencher(dados, tipo){
    this.order = dados;
    console.log(this.order)
    this.products = this.order.items;
    console.log(this.order.items)
    console.log(this.products)
    this.valorTotal = this.order.value;
    if(tipo === 0){
      this.pesquisaAtiva = true;
      this.searchProducts = dados;
      console.log(this.searchProducts)
    }
  }

  alterarQuantidade(tipo, id){
      console.log(this.carrinho)
      let cont = 0;
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
        if(tipo === 0){
          this.carrinho.items[cont - 1].quantity = this.carrinho.items[cont - 1].quantity - 1;
        }else{
          this.carrinho.items[cont - 1].quantity = this.carrinho.items[cont - 1].quantity + 1;
        }
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
      }
      if(tipo === 0){
        this.toastr.success('Produto subtraído do carrinho!', '', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });  
      }else {
        this.toastr.success('Produto adicionado ao carrinho!', '', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });  
      }
      this.getCarrinho();
    }

    getCarrinho(){
      this.crudService.getCarrinho()
      .subscribe(dados => this.products = dados.items);
    }

    search(){
      this.pesquisaAtiva = true;
      console.log(this.valorBusca)
      this.crudService.searchProduct(this.valorBusca)
      .subscribe(dados => this.preencher(dados, 0));
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

}
