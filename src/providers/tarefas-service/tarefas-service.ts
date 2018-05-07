//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class TarefasServiceProvider {

  tarefas =[
    {codigo: 1, projeto: 1, descricao: 'Realizar primeira prova',
    data: new Date(2018, 4, 13), prioridade: 1},

    {codigo: 2, projeto: 1, descricao: 'Somar notas',
    data: new Date(2018, 4, 8), prioridade: 2},

    {codigo: 3, projeto: 2 , descricao: 'Realizar exercicício EAD',
    data: new Date(2018, 4, 10), prioridade: 1},

    {codigo: 4, projeto: 3 , descricao: 'Aqui é só pra perder peso',
    data: new Date(2018, 4, 7), prioridade: 3},
  ];
  
  ultimoCodigo = 4;

  // constructor(public http: HttpClient) {
  //   console.log('Hello TarefasServiceProvider Provider');
  // }

  getTarefas(): any[] {
    return this.tarefas;
  }
  editTarefa( c, cProjeto, desc, prio, d ){

    for( let i = 0; i < this.tarefas.length ; i++) {
      
      if( this.tarefas[i].codigo == c ){
        this.tarefas[i].projeto = cProjeto;
        this.tarefas[i].prioridade = prio;
        this.tarefas[i].descricao = desc;
        this.tarefas[i].data = d;
        
        break;
      }
      

    }
  }

  addTarefa(cProjeto, desc, prio, d){
    this.ultimoCodigo++;

    this.tarefas.push({
      codigo: this.ultimoCodigo,
      projeto: cProjeto,
      descricao: desc,
      data:d,
      prioridade:prio
    })
  }
  deleteTarefa(c){

    for( let i = 0; i <= this.tarefas.length; i++){
      if(this.tarefas[i].codigo == c){
        this.tarefas.splice(i,1);
        break;
      }
    }

  }

}
