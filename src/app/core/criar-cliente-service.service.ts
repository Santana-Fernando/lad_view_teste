import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CriarClienteServiceService {
  constructor(private http: HttpClient) {}

  async executar(request: any): Promise<void> {
    await this.http.post("http://localhost:80/clientes", request).toPromise();
  }
}
