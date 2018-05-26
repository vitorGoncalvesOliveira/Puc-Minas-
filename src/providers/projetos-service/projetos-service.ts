//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the ProjetosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjetosServiceProvider {

  url = 'http://kutova.com/dev/todolist/api.php';  

  constructor(public http: Http) {

  }

  getProjetos(): Promise<any[]>{
    return new Promise( resolve =>{
      this.http.get(this.url+'/projetos')
        .toPromise().then( resposta =>{
          let dados = resposta.json();
   
          let projetos = [];
          for(let i = 0 ; i < dados.length; i++){
            projetos.push({
              codigo: parseInt( dados[i].codigo ),
              projeto: dados[i].projeto
            })
          }
          
          resolve(projetos);
        })
    })
  }

  getProjeto(p: number): Promise<any>{
    return new Promise( resolve =>{
      this.http.get(this.url+'/projetos/'+p)
        .toPromise().then( resposta =>{
          let dados = resposta.json();
          
          let projeto = {
            nome: dados.projeto,
            codigo: parseInt( dados.codigo )
          };
          
          resolve(projeto)
      })
    })
  }

  editProjeto(p: number, n: string):Promise<any>{
    let header = new Headers({'Content-Type':'application/json'});
    let projeto = {
       projeto: n
    };
    let body = JSON.stringify( projeto );

    return new Promise( resolve =>{
      
      this.http.put(this.url+'/projetos/'+p,body,{headers:header})
        .toPromise().then( resposta =>{
          resolve(resposta.json());
        });
    });
    
  }

  deleteProjeto(c: number): Promise<any> {
    return new Promise( resolve =>{

      this.http.delete(this.url+'/projetos/'+c)
        .toPromise().then(resposta =>{
          resolve(resposta.json());
        })
    })
    
  }

  addProjeto( nomeProjeto: string ): Promise<any>{
    let header = new Headers({'Content-Type':'application/json'});
    let projeto = {
       projeto: nomeProjeto
    };
    let body = JSON.stringify( projeto );

    return new Promise( resolve =>{
      
      this.http.post(this.url+'/projetos',body,{headers:header})
        .toPromise().then( resposta =>{
          resolve(resposta.json());
        });
    });
    
  }

}
