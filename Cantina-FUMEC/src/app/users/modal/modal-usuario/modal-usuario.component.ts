import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';
import { CrudService } from '../../../crud.service';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {

  dataUser = [];
  dataSpecificUser;
  value = 'someValue12340987';

  usuarioForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', {validators: [Validators.required, Validators.email, this.verificaEmailRepetido()], updateOn: 'blur'}),
    cpf: new FormControl('', {validators: [Validators.required, this.verificaCPF(), this.verificaCPFRepetido()], updateOn: 'blur'}),
    telefone: new FormControl('', Validators.required),
    imagem: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    idioma: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
  });

  constructor(private toastr: ToastrService, private crudService: CrudService, public dialogRef: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.crudService.getUsers()
    .subscribe(dados => this.passaTodosDados(dados));
    if(this.data > 0){
      this.crudService.getSpecificUser(this.data)
      .subscribe(dados => this.preencheDadosPorId(dados));
    }
  }

  verificaCPF(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      var valido = true;
      var strCPF = control.value;
      var Soma;
      var Resto;
      var i;
      Soma = 0;
  
      if (strCPF == "00000000000" || strCPF == "11111111111" || strCPF == "22222222222" || strCPF == "33333333333" || strCPF == "44444444444"
      || strCPF == "55555555555" || strCPF == "66666666666" || strCPF == "77777777777" || strCPF == "88888888888" || strCPF == "99999999999"){
        valido =  false;
      }
      for (i=1; i<=9; i++) {
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
      }
  
      if ((Resto == 10) || (Resto == 11))  {
        Resto = 0;
      }
      if (Resto != parseInt(strCPF.substring(9, 10)) ) {
        valido = false;
      }
  
      Soma = 0;
      for (i = 1; i <= 10; i++) {
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
      }
  
      if ((Resto == 10) || (Resto == 11))  {
        Resto = 0;
      }
      if (Resto != parseInt(strCPF.substring(10, 11) ) ) {
        valido = false;
      }
      return !valido ? {'invalidoCPF': !valido} : null;
    }
  
  }

  verificaEmailRepetido(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let repetido = false;
      this.dataUser.forEach(user => {
        if(_.isMatch(user, { 'email': control.value })){
          if(this.data === 0){
            repetido = true
          }
          else if(_.isMatch(user, { 'id': this.dataSpecificUser.id })){
            repetido = false;
          } else{
            repetido = true;
          }
        }
      });
      return repetido ? { 'emailExistente': repetido } : null;
    };
  }

  verificaCPFRepetido(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let repetido = false;
      this.dataUser.forEach(user => {
        if(_.isMatch(user, { 'cpf': control.value })){
          if(this.data === 0){
            repetido = true
          }
          else if(_.isMatch(user, { 'id': this.dataSpecificUser.id })){
            repetido = false;
          } else{
            repetido = true;
          }        }
      });
        return repetido ? { 'cpfExistente': repetido } : null;
    };
  }

  preencheDadosPorId(dados): void {
    this.dataSpecificUser = dados;
    this.usuarioForm.patchValue({
      nome: dados.name,
      email: dados.email,
      cpf: dados.cpf,
      telefone: dados.phoneNumber,
      imagem: dados.photoUrl,
      location: dados.location,
      idioma: dados.settingsUser.language,
      tipo: dados.settingsUser.type,
    });
  }

  passaTodosDados(dados): void {
    this.dataUser = dados;
  }

  get values(): string[] {
    return this.value.split('\n');
  }

  salvar(id) : void {
    let newData = {
      uid: "",
      name: this.usuarioForm.get('nome').value,
      email: this.usuarioForm.get('email').value,
      cpf: this.usuarioForm.get('cpf').value,
      phoneNumber: this.usuarioForm.get('telefone').value,
      photoUrl: this.usuarioForm.get('imagem').value,
      location: this.usuarioForm.get('location').value,
      points: 0,
      settingsUser: {
        language: this.usuarioForm.get('idioma').value,
        type: this.usuarioForm.get('tipo').value
      }
    }

    if(id > 0){
      newData.uid = this.dataSpecificUser.uid;
    this.crudService.editUser(id, newData)
    .subscribe(dados => console.log(dados));
    this.toastr.success('Usuário alterado com sucesso!', '', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
    this.fechar();
    } else if(id === 0){
      newData.uid = uuidv4();
      this.crudService.createUser(newData)
      .subscribe(dados => console.log(dados));
      this.toastr.success('Usuário cadastrado com sucesso!', '', {
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
