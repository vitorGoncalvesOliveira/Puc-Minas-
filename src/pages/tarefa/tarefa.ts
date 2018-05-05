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

  projetos: any[];
  novo: boolean;

  codigoTarefa: number;
  codigoProjeto: number;
  descricao: string;
  prioridade: number;
  data: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public tarefaService: TarefasServiceProvider,
              public projetoService: ProjetosServiceProvider) {
            
      this.projetos = this.projetoService.getProjetos()
      this.novo = this.navParams.get('novo');
      let codigo = this.navParams.get('codigo');
      let tarefas = this.tarefaService.getTarefas();
      
      if(!this.novo){
       

        for(let i = 0; i < tarefas.length; i++){
          if(codigo == tarefas[i].codigo){
            this.codigoTarefa = tarefas[i].codigo;
              this.codigoProjeto = tarefas[i].projeto;
              this.descricao = tarefas[i].descricao;
              this.prioridade = tarefas[i].prioridade;
              let d = tarefas[i].data;
              this.data = d.getFullYear() +"-"+
              ("0"+(d.getMonth()+1)).substr(-2,2)+"-"+
              ("0"+ d.getDate()).substr(-2,2);
              
              
            break;
          }
        }

      }
      else{
        this.codigoProjeto = 1;
        this.descricao = '';
        this.prioridade = 3;

        let d = new Date();
        this.data = d.getFullYear() +"-"+
                    ("0"+(d.getMonth()+1)).substr(-2,2)+"-"+
                    ("0"+ d.getDate()).substr(-2,2);
      }
  }


  alterar(){
    let d = new Date(
      parseInt(this.data.substr(0,4)),
      parseInt(this.data.substr(5,2)),
      parseInt(this.data.substr(8,2)) );
    
    this.tarefaService.editTarefa( 
      this.codigoTarefa,
      this.codigoProjeto,
      this.descricao,
      this.prioridade,
      d);

    this.navCtrl.pop();
  }
  excluir(){

    this.tarefaService.deleteTarefa( this.codigoTarefa );
    this.navCtrl.pop();
  }

  incluir(){
    
    let d = new Date(
      parseInt(this.data.substr(0,4)),
      parseInt(this.data.substr(5,2)),
      parseInt(this.data.substr(8,2)) );
    

    this.tarefaService.addTarefa(       
      this.codigoProjeto,
      this.descricao,
      this.prioridade,
      d
    );
    this.navCtrl.pop();
  }
  

}
