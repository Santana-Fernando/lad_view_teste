import { CriarClienteServiceService } from "./../../core/criar-cliente-service.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { cpuUsage } from "process";


@Component({
  selector: "app-cliente-form",
  templateUrl: "./cliente-form.component.html",
  styleUrls: ["cliente-form.component.css"],
})

export class ClienteFormComponent implements OnInit {
  /**
   * @var form
   */
  form: FormGroup;

  usuarios: any = []

  headElements = ['CPF/CNPJ', 'E-mail', 'Nome', 'Logradouro', 'Número', 'CEP', 'Telefone'];

  constructor(private service: CriarClienteServiceService) { }

  ngOnInit() {
    this.form = new FormGroup({
      cpfOuCnpj: new FormControl(null, []),
      email: new FormControl(null, []),
      nome: new FormControl(null, []),
      tipo: new FormControl(1, []),
      senha: new FormControl(null, []),
      logradouro: new FormControl(null, []),
      numero: new FormControl(null, []),
      cep: new FormControl(null, []),
      telefone1: new FormControl(null, []),
    });
  }

  async doSend(): Promise<void> {
    try {
      let cpfValido = this.form.value.cpfOuCnpj
      let emailValido = this.validateEmail(this.form.value.email)
      let telefoneValido = this.validatePhone(this.form.value.telefone1)
      let cepValido = this.ValidaCep(this.form.value.cep)

      if (cpfValido.length !== 11) {
        alert("CPF Inválido!!")
        return
      }

      if(!emailValido){
        alert("Email Inválido!!")
        return
      }

      if(!telefoneValido){
        alert("Numero de Telefone inválido!!")
        return
      }

      if(!cepValido){
        alert('CEP inválido')
        return
      }

      this.usuarios.push(this.form.value)

      //await this.service.executar(this.form.value);
    } catch (error) {
      console.error(error);
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePhone (phone) {
    let regex = new RegExp('^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{4}-[0-9]{4}))$');
    return regex.test(phone);
  }

  ValidaCep(strCEP){
    // Caso o CEP não esteja nesse formato ele é inválido!
    let objER = /^[0-9]{5}-[0-9]{3}$/;
    return objER.test(strCEP)
  }
}
