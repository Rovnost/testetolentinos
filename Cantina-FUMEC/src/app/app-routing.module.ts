import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories/categories.component'
import { ProductsComponent } from './products/products.component'
import { CarrinhoComponent } from './carrinho/carrinho.component'

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'carrinho', component: CarrinhoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
