import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service';

/**
 * Generated class for the ProjetoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projeto',
  templateUrl: 'projeto.html',
})
export class ProjetoPage {

  codigo: number;
  nomeProjeto: string = "";
  novo: boolean;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public projetoService: ProjetosServiceProvider ) {

    this.codigo = this.navParams.get('codigo')
    this.novo = this.navParams.get('novo');

    if( !this.novo ){
        let projetos = projetoService.getProjetos();
        
        for( let i = 0; i <= projetos.length; i++){
          if( this.codigo == projetos[i].codigo ){
            this.nomeProjeto = projetos[i].nome;
            break;
          }
        }
    }
  }

  alterar(){
    this.projetoService.editProjeto( this.codigo, this.nomeProjeto );
    this.navCtrl.pop();
  }
  excluir(){

    this.projetoService.deleteProjeto( this.codigo );
    this.navCtrl.pop();
  }

  incluir(){
    this.projetoService.addProjeto( this.nomeProjeto );
    this.navCtrl.pop();
  }



  
}
