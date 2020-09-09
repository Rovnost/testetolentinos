import { Component } from '@angular/core';
import { CrudService } from './crud.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'PesquisaQualidade-WEB';
  totalCategorias;
  totalUsuarios;
  totalProdutos;
  valorTotal;
  produtosCarrinho;


  constructor(private crudService: CrudService) { 
    this.crudService.getCategories()
    .subscribe((dados) => {
      this.totalCategorias = dados.length
    });
    this.crudService.getUsers()
    .subscribe((dados) => {
      this.totalUsuarios = dados.length
    });
    this.crudService.getProducts()
    .subscribe((dados) => {
      this.totalProdutos = dados.length
    });
    this.crudService.getCarrinho()
    .subscribe((dados) => {
      console.log(dados)
      this.valorTotal = dados.value;
      this.produtosCarrinho = dados.items.length;
      this.preencher(dados);
    });
  }

  preencher(dados){
    console.log(dados.items.length)
    this.produtosCarrinho = dados.items.length;
    // console.log(this.produtosCarrinho)
  }
  

}
