import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TarefasServiceProvider } from '../../providers/tarefas-service/tarefas-service';
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service';
import { TarefaPage } from '../../pages/tarefa/tarefa';

@IonicPage()
@Component({
  selector: 'page-tarefas',
  templateUrl: 'tarefas.html',
})
export class TarefasPage {

  tarefas: any[];
  projetos: any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public tarefasService: TarefasServiceProvider,
    public projetoService: ProjetosServiceProvider) {

      this.projetos = projetoService.getProjetos();
      this.tarefas = tarefasService.getTarefas();

  }

  nomeProjeto(c) : string{

    for(let i = 0; i < this.projetos.length; i++ ){
      if(this.projetos[i].codigo == c)
        return this.projetos[i].nome;
      
    }
    return "Projeto não encontrado";
  }
  
  selecionaTarefa(c: string){

    let t: number = parseInt(c);
    this.navCtrl.push( TarefaPage , {codigo: t, novo: false} )
  }

  novaTarefa(){

    this.navCtrl.push( TarefaPage , {codigo: 0, novo: true} )

  }

}
