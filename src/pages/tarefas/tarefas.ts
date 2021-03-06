import { Component, PipeTransform, Pipe } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { TarefasServiceProvider } from '../../providers/tarefas-service/tarefas-service';
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service';
import { TarefaPage } from '../../pages/tarefa/tarefa';

@IonicPage()
@Component({
  selector: 'page-tarefas',
  templateUrl: 'tarefas.html',
})
export class TarefasPage {

  tarefas: any[] = [];
  projetos: any[];
  filtroTarefas = {};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public tarefasService: TarefasServiceProvider,
    public projetoService: ProjetosServiceProvider,
    public menuController: MenuController) {


      
  }

  ionViewDidEnter(){
     this.projetoService.getProjetos().then(result=>{
      this.projetos = result;
    });
    this.tarefasService.getTarefas()
        .then(tarefas =>{
          this.tarefas = tarefas;
        })

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

  limparFiltros(){

    this.filtroTarefas = {};
    this.menuController.close();
  }

  filtroProjeto( c ){
    this.filtroTarefas = { projeto: c };
    this.menuController.close();
  }

  filtrosDias(d){
    this.filtroTarefas = { dias: d};
    this.menuController.close();

  }
  filtroConcluidas(){
    this.filtroTarefas = { feito: true};
    this.menuController.close();
  }

  filtroIncompletas(){
    this.filtroTarefas = { incompleta: true};
    this.menuController.close();
  }

  updateTarefa( c, done ){
    let t: number = parseInt(c);
    this.tarefasService.setTarefaConcluida(t, done)
  }

}


@Pipe({
  name:'filtro'
})

export class Filtro implements PipeTransform {
  transform( itens: any[], filtro:any ): any{
    
    itens.sort(
      ( a , b ) => a.data - b.data
    );
    

    if(filtro.projeto >= 0){
      return itens.filter( item => item.projeto == filtro.projeto);      
    }
    else if( filtro.dias >= 0){
      let d = new Date((new Date()).getTime() + filtro.dias*24*60*60*1000);
      
      return itens.filter(
        item => item.data <= d
      );
    }
    else if( filtro.feito){
      return itens.filter( item => item.done );
    }
    else if( filtro.incompleta){
      return itens.filter( item => !item.done);
    }
    else
      return itens;
  }
}
