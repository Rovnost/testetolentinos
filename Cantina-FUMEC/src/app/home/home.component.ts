import { Component, OnInit } from '@angular/core';
import { CrudService } from './../crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalUsers;
  dataAtual;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.getUsers()
    .subscribe((dados) => {
    this.preenche(dados);
    });
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    this.dataAtual = mm + '/' + dd + '/' + yyyy;
  }

  preenche(dados){
    this.totalUsers = dados.length;
  }

}
