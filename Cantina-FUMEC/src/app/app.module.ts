import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {registerLocaleData} from '@angular/common';
import pt from '@angular/common/locales/pt';
 
registerLocaleData(pt, 'pt-PT');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CrudService } from './crud.service';
import { ModalUsuarioComponent } from './users/modal/modal-usuario/modal-usuario.component';
import { ModalExcluirComponent } from './users/modal/modal-excluir/modal-excluir.component';
import { CategoriesComponent } from './categories/categories/categories.component';
import { ModalCategoriaComponent } from './categories/categories/modal/modal-categoria/modal-categoria.component';
import { ModalExcluirCategoriaComponent } from './categories/categories/modal/modal-excluir-categoria/modal-excluir-categoria.component';
import { ProductsComponent } from './products/products.component';
import { ModalProdutoComponent } from './products/modal/modal-produto/modal-produto.component';
import { ModalExcluirProdutoComponent } from './products/modal/modal-excluir-produto/modal-excluir-produto.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';


import {HttpModule} from '@angular/http';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import {MatSelectModule} from '@angular/material/select';
import { MAT_DATE_LOCALE } from '@angular/material/core';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ModalUsuarioComponent,
    ModalExcluirComponent,
    CategoriesComponent,
    ModalCategoriaComponent,
    ModalExcluirCategoriaComponent,
    ProductsComponent,
    ModalProdutoComponent,
    ModalExcluirProdutoComponent,
    CarrinhoComponent
  ],
  imports: [
    MatSelectModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxBarcodeModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CrudService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true
      }
    },
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},
    { provide: MAT_DATE_LOCALE, useValue: 'pt-PT' },
    {provide: LOCALE_ID, useValue: 'pt-PT' },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalExcluirProdutoComponent,
    ModalExcluirCategoriaComponent,
    ModalCategoriaComponent,
    ModalUsuarioComponent,
    ModalExcluirComponent
  ]
})
export class AppModule { }
