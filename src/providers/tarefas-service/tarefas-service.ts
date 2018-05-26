//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from   '@angular/http'
import 'rxjs/add/operator/toPromise';


@Injectable()
export class TarefasServiceProvider {

  url = 'http://kutova.com/dev/todolist/api.php';

  tarefas =[
    {codigo: 1, projeto: 1, descricao: 'Realizar primeira prova',
    data: new Date(2018, 4, 13), done:true ,prioridade: 1},

    {codigo: 2, projeto: 1, descricao: 'Somar notas',
    data: new Date(2018, 4, 8), done:false, prioridade: 2},

    {codigo: 3, projeto: 2 , descricao: 'Realizar exercicício EAD',
    data: new Date(2018, 4, 10), done:false, prioridade: 1},

    {codigo: 4, projeto: 3 , descricao: 'Formar !',
    data: new Date(2018, 4, 7), done:false, prioridade: 3},
  ];
  
  ultimoCodigo = 4;

  constructor(public http: Http) {
    
  }

  getTarefas():Promise <any[]> {
    return new Promise( resolve =>{
      let tarefas = [];

      this.http.get(this.url+'/tarefas').toPromise().then(resposta =>{
        let dados = resposta.json();

        for(let i = 0; i< dados.length; i++){
          tarefas.push({
            codigo: parseInt( dados[i].codigo),
            projeto: parseInt ( dados[i].projeto),
            descricao: dados[i].descricao,
            data: new Date(
              parseInt( dados[i].data.substr(0,4) ),
              parseInt( dados[i].data.substr(5,2)) -1,
              parseInt( dados[i].data.substr(8,2))

            ),
            prioridade: parseInt( dados[i].prioridade),
            done: false
          });
        }
      
        resolve(tarefas)
      });      
    });    
  }

  getTarefa(t: number):Promise <any> {
    return new Promise( resolve =>{
      

      this.http.get(this.url+'/tarefas/'+t).toPromise().then(resposta =>{
        let dados = resposta.json();

        
          let tarefa = {
            codigo: parseInt( dados.codigo),
            projeto: parseInt ( dados.projeto),
            descricao: dados.descricao,
            data: new Date(
              parseInt( dados.data.substr(0,4) ),
              parseInt( dados.data.substr(5,2)) -1,
              parseInt( dados.data.substr(8,2))

            ),
            prioridade: parseInt( dados.prioridade)
            
          };       
      
        resolve(tarefa)
      });      
    });    
  }

  editTarefa( t: number , prj: number, desc: string, 
    prior: number, dat: Date ):Promise <any> {

      let header = new Headers({'Content-Type':'application/json'});

      let tarefa = {
        projeto: prj,
        descricao: desc,
        data: dat.getFullYear() +"-"+
          ("0"+(dat.getMonth()+1)).substr(-2,2)+"-"+
          ("0"+ dat.getDate()).substr(-2,2),
        prioridade: prior
      }
      return new Promise( resolve=> {
        let body = JSON.stringify(tarefa);
        this.http.put(this.url+'/tarefas/'+t, body,{headers:header})
        .toPromise().then(resposta =>{
          resolve(resposta.json())
        })

     })  

    
  }

  addTarefa( prj, desc, prio, d):Promise<any>{
    let header = new Headers({'Content-Type':'application/json'});

      let tarefa = {
        projeto: prj,
        descricao: desc,
        data: d.getFullYear() +"-"+
          ("0"+(d.getMonth()+1)).substr(-2,2)+"-"+
          ("0"+ d.getDate()).substr(-2,2),
        prioridade: prio
      }
      return new Promise( resolve=> {
        let body = JSON.stringify(tarefa);
        this.http.post(this.url+'/tarefas', body,{headers:header})
        .toPromise().then(resposta =>{
          resolve(resposta.json())
        })

     })
  }
  deleteTarefa(c): Promise<any>{
    
    return new Promise( resolve =>{
      this.http.delete(this.url+'/tarefas/'+c)
        .toPromise().then(resposta =>{
          resolve(resposta.json());
        });
    });
    
  }
  setTarefaConcluida(c, concluida){
    for( let i = 0; i < this.tarefas.length ; i++) {
      
      if( this.tarefas[i].codigo == c ){
          this.tarefas[i].done = concluida;   
        break;
      }
      

    }

  }

}
