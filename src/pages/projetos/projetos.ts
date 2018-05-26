import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjetosServiceProvider } from '../../providers/projetos-service/projetos-service';
import { ProjetoPage } from '../../pages/projeto/projeto';

/**
 * Generated class for the ProjetosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projetos',
  templateUrl: 'projetos.html',
})
export class ProjetosPage {

  project: any = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public projetos : ProjetosServiceProvider ) {
      
  }

  ionViewDidEnter(){
    this.projetos.getProjetos().then(dados =>{
      this.project = dados;
    })
  }
  
  selecionaProjeto( c ){
    
    let cn = parseInt(c);    
    this.navCtrl.push( ProjetoPage , { codigo: cn, novo: false } );
    

  }

  novoProjeto() {
    this.navCtrl.push( ProjetoPage , { codigo: 0, novo: true } )
  }

}
