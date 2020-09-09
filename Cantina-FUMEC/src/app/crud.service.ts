import {Injectable} from '@angular/core';
import {CANTINA_API} from './app.api';
import {Http} from '@angular/http';
import { Observable, Subject } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CrudService{

  constructor(private http: Http){}

  getUsers(): Observable<any>{
    return this.http.get(`${CANTINA_API}/users`)
    .map(dados => dados.json());
  }

  createUser(objeto): Observable<any>{
    return this.http.post(`${CANTINA_API}/users`, objeto)
    .map(dados => dados.json());
  }

  editUser(id, objeto): Observable<any>{
    return this.http.put(`${CANTINA_API}/users/` + id, objeto)
    .map(dados => dados.json());
  }

  deleteUser(id): Observable<any>{
    return this.http.delete(`${CANTINA_API}/users/` + id)
    .map(dados => dados.json());
  }

  getSpecificUser(id): Observable<any>{
    return this.http.get(`${CANTINA_API}/users/` + id)
    .map(dados => dados.json());
  }

  getCategories(): Observable<any>{
    return this.http.get(`${CANTINA_API}/category`)
    .map(dados => dados.json());
  }

  createCategory(objeto): Observable<any>{
    return this.http.post(`${CANTINA_API}/category`, objeto)
    .map(dados => dados.json());
  }

  editCategory(id, objeto): Observable<any>{
    return this.http.put(`${CANTINA_API}/category/` + id, objeto)
    .map(dados => dados.json());
  }

  getSpecificCategory(id): Observable<any>{
    return this.http.get(`${CANTINA_API}/category/` + id)
    .map(dados => dados.json());
  }

  deleteCategory(id): Observable<any>{
    return this.http.delete(`${CANTINA_API}/category/` + id)
    .map(dados => dados.json());
  }

  getProducts(): Observable<any>{
    return this.http.get(`${CANTINA_API}/product`)
    .map(dados => dados.json());
  }
  
  createProduct(objeto): Observable<any>{
    return this.http.post(`${CANTINA_API}/product`, objeto)
    .map(dados => dados.json());
  }

  editProduct(id, objeto): Observable<any>{
    return this.http.put(`${CANTINA_API}/product/` + id, objeto)
    .map(dados => dados.json());
  }

  getSpecificProduct(id): Observable<any>{
    return this.http.get(`${CANTINA_API}/product/` + id)
    .map(dados => dados.json());
  }

  deleteProduct(id): Observable<any>{
    return this.http.delete(`${CANTINA_API}/product/` + id)
    .map(dados => dados.json());
  }

  getCarrinho(): Observable<any>{
    return this.http.get(`${CANTINA_API}/order`)
    .map(dados => dados.json());
  }

  editCarrinho(objeto): Observable<any>{
    return this.http.put(`${CANTINA_API}/order`, objeto)
    .map(dados => dados.json());
  }

  searchProduct(key): Observable<any>{
    return this.http.get(`${CANTINA_API}/product?name_like&id_like=${key}`)
    .map(dados => dados.json());
  }

}
