import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GrupoServiceProvider } from '../../providers/grupo-service/grupo-service';


@IonicPage()
@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
})
export class GrupoPage {

  integrantes: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public grupoService: GrupoServiceProvider ) {

              this.integrantes = grupoService.getGrupo();
          
  }


}
