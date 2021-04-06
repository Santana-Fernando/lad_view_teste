import { CriarClienteServiceService } from "./../../core/criar-cliente-service.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-cliente-form",
  templateUrl: "./cliente-form.component.html",
  styleUrls: [],
})
export class ClienteFormComponent implements OnInit {
  /**
   * @var form
   */
  form: FormGroup;

  constructor(private service: CriarClienteServiceService) {}

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
      await this.service.executar(this.form.value);
    } catch (error) {
      console.error(error);
    }
  }
}
