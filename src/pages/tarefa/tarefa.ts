import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TarefasServiceProvider } from '../../providers/tarefas-service/tarefas-service';
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service';


@IonicPage()
@Component({
  selector: 'page-tarefa',
  templateUrl: 'tarefa.html',
})
export class TarefaPage {

  rootPage = null;
  projetos: any[];
  novo: boolean;

  codigoTarefa: number;
  codigoProjeto: number;
  descricao: string;
  prioridade: number;
  data: string;
  done: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public tarefaService: TarefasServiceProvider,
              public projetoService: ProjetosServiceProvider) {
            
      

      this.novo = this.navParams.get('novo');
      this.codigoTarefa = this.navParams.get('codigo');
      // let tarefas = this.tarefaService.getTarefas();
      
      if(!this.novo){
         this.tarefaService.getTarefa( this.codigoTarefa).
          then(tarefa =>{
                     
                this.codigoTarefa = tarefa.codigo;
                this.codigoProjeto = tarefa.projeto;
                this.descricao = tarefa.descricao;
                this.prioridade = tarefa.prioridade;
                let d = tarefa.data;
                this.data = d.getFullYear() +"-"+
                ("0"+(d.getMonth()+1)).substr(-2,2)+"-"+
                ("0"+ d.getDate()).substr(-2,2);
                this.done = false;        
          
        })
      }

      this.projetoService.getProjetos().then( dados =>{
        this.projetos = dados;
        if(this.novo){
          this.codigoProjeto = 1;
        this.descricao = '';
        this.prioridade = 3;
        this.done = false;

        let d = new Date();
        this.data = d.getFullYear() +"-"+
                    ("0"+(d.getMonth()+1)).substr(-2,2)+"-"+
                    ("0"+ d.getDate()).substr(-2,2);
  
        }
      });

  }


  alterar(){
    let d = new Date(
      parseInt(this.data.substr(0,4)),
      parseInt(this.data.substr(5,2)) -1,
      parseInt(this.data.substr(8,2)) );
    
    this.tarefaService.editTarefa( 
      this.codigoTarefa,
      this.codigoProjeto,
      this.descricao,
      this.prioridade,
      d).then(dados =>{
        this.navCtrl.pop();
      });

  
  }
  excluir(){

    this.tarefaService.deleteTarefa( this.codigoTarefa )
    .then(dados =>{
      this.navCtrl.pop();
    });
    
  }

  incluir(){
    
    let d = new Date(
      parseInt(this.data.substr(0,4)),
      parseInt(this.data.substr(5,2)) - 1,
      parseInt(this.data.substr(8,2)) );
    

    this.tarefaService.addTarefa(       
      this.codigoProjeto,
      this.descricao,
      this.prioridade,
      d
    ).then(dados =>{
      this.navCtrl.pop();
    });
    
  }
  

}
