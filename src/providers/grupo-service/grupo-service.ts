import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class GrupoServiceProvider {

  // constructor(public http: HttpClient) {
  //   console.log('Hello GrupoServiceProvider Provider');
  // }
  grupo =[
    {nome: "Augusto Moreira" , img:"../../assets/imgs/augusto.jpeg"},
    {nome: "Luccas Fernandes" , img:"../../assets/imgs/luccas.jpeg"},
    {nome: "Luiz Gonzaga" , img:"../../assets/imgs/gonzaga.jpeg"},
    {nome: "Vitor Gonçalves" , img:"../../assets/imgs/vitor.png"}
  ];

  getGrupo(){
    return this.grupo;
  }
 

}
