import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GrupoServiceProvider } from '../../providers/grupo-service/grupo-service';

import { Camera, CameraOptions } from '@ionic-native/camera' 


@IonicPage()
@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
})
export class GrupoPage {

  integrantes: any[];
  imagem: string = "";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public grupoService: GrupoServiceProvider,
              private platform: Platform,
              private camera : Camera ) {

              this.integrantes = grupoService.getGrupo();
          
  }

  ativarCamera(){
     // Testa se a aplicação está sendo executada em um dispositivo
     this.platform.ready().then(()=>{

      // Definições para a imagem capturada
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      // Captura uma imagem usando a câmera, na forma de um URI de dados
      this.camera.getPicture(options).then((imageData) => {
        this.imagem = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Trata o erro
      });

    });
  }
}
