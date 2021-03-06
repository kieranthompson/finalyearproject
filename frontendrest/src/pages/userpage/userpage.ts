import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/authservice';
import { HomePage } from '../home/home';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the UserpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userpage',
  templateUrl: 'userpage.html',
})
export class UserPage {

  granted: boolean;
  denied: boolean;
  scanned: boolean;
  tagId: string;
  username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthService, public alertCtrl: AlertController, public nfc: NFC, public ndef: Ndef) {
    this.username = this.navParams.get('user.name');
    console.log(this.navParams.get('user.name'));
  }


  resetScanData() {
    this.granted = false;
    this.scanned = false;
    this.tagId = "";
  }

  ionViewDidEnter() {
    this.nfc.enabled().then((resolve) => {
      this.addListenNFC();
      let successAlert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'logged in successfully'
      });
      successAlert.present();
      alert('NFC IS SUPPORTED BY YOUR DEVICE');
    }).catch((reject) => {
      
      alert('NFC IS NOT SUPPORTED BY YOUR DEVICE');
      
    });
  }

  addListenNFC() {

    this.nfc.addTagDiscoveredListener(nfcEvent => this.sesReadNFC(nfcEvent.tag)).subscribe(data => {
      if (data && data.tag && data.tag.id) {
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        if (tagId) {
          this.tagId = tagId;
          this.scanned = true;

          // only testing data consider to ask web api for access
          this.granted = [
            "7d3c6179"
          ].indexOf(tagId) != -1;

        } else {
          alert('NFC_NOT_DETECTED');
        }
      }
    });
  }

  sesReadNFC(data): void {

  }

  failNFC(err) {
    alert("Error while reading: Please Retry");
  }

  logout(): void {
    this.authservice.logout();
    this.navCtrl.setRoot(HomePage);
  }
  
  getInfo(): void {
    this.authservice.getinfo().then((data: any) => {
    if(data.success) {
        let alert = this.alertCtrl.create({
            title: data.success,
            subTitle: data.msg,
            buttons: ['ok']
        });
        alert.present(alert);
    }
  });
}

} 
