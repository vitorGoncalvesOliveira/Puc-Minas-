import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProjetosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjetosServiceProvider {

  projetos = [
    { codigo: 1, nome: 'Algoritmos' },
    { codigo: 2, nome: 'Emagrecer' },
    { codigo: 3, nome: 'TCC' }
  ];

  ultimoCodigo = 3;


  // constructor(public http: HttpClient) {
  //   console.log('Hello ProjetosServiceProvider Provider');
  // }

  getProjetos(){
    return this.projetos;
  }

  editProjeto(c: number, nome: string){

    for( let i = 0; i < this.projetos.length ; i++){
      if( this.projetos[i].codigo == c ){
        this.projetos[i].nome = nome;
        break;
      }
    }
  }

  deleteProjeto(c: number){

    for( let i = 0; i < this.projetos.length; i++){
      if( this.projetos[i].codigo == c ){
        this.projetos.splice( i , 1 );
        break;
      }
    }
  }

  addProjeto( nomeProjeto: string ){
    this.ultimoCodigo++;
        
    this.projetos.push({
        codigo: this.ultimoCodigo,
        nome: nomeProjeto
    });
  }

}
