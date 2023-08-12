import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoaderView {
  
  objLoader : any;

  constructor(
      private loadingCtrl : LoadingController) {


    }

    showLoader(content) {
        this.objLoader = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: content
        });

        this.objLoader.present();

        /*setTimeout(() => {
          this.nav.push(Page2);
        }, 1000);*/

        /*setTimeout(() => {
          loading.dismiss();
        }, 50000);*/
    }

    dismissLoader() {

        this.objLoader.dismiss();
    }
}
