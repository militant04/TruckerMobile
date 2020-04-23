import { Component } from '@angular/core';

import { PopoverController } from '@ionic/angular';

@Component({
  template: `
    <ion-list>
      <ion-item button >
        <ion-label>Terms and Conditions</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://website-renyu.com')">
        <ion-label>FAQ</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://militant04.github.io')">
        <ion-label>Developer</ion-label>
      </ion-item>

   
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public popoverCtrl: PopoverController) {}

  support() {
    // this.app.getRootNavs()[0].push('/support');
    this.popoverCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.popoverCtrl.dismiss();
  }
}
