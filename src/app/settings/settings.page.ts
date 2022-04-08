import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { Storage } from '@ionic/storage';
import { ThemeService } from './../theme-service.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


const themes = {
  ember: {
    primary: '#00a8ff',
    secondary: '##9c88ff',
    tertiary: '###fbc531',
    light: '#FFFFFF',
    medium: '#2D142C',
    dark: '#000000'
  },
  night: {
    primary: '#f5f6fa',
    secondary: '#FCFF6C',
    tertiary: '#FE5F55',
    medium: '#BCC2C7',
    dark: '#FFFFFF',
    light: '#000000'
  },
  neon: {
    primary: '#29D4C1',
    secondary: '#778beb',
    tertiary: '#c44569',
    light: '#1c1c1c',
    medium: '#919191',
    dark: '#ffffff'
  },
  pastel: {
    primary: '#3498db',
    secondary: '#2ecc71',
    tertiary: '#3498db',
    light: '#2f3640',
    medium: '#c60055',
    dark: '#d3d3d3'
  },

  cherry: {
    primary: '#a5153e',
    secondary: '#778beb',
    tertiary: '#c44569',
    light: '#1c1c1c',
    medium: '#919191',
    dark: '#ffffff'
  },

  royalty: {
    primary: '#706fd3',
    secondary: '#778beb',
    tertiary: '#c44569',
    light: '#1c1c1c',
    medium: '#919191',
    dark: '#ffffff'
  }
  ,
  lime: {
    primary: '#10ac84',
    secondary: '#1dd1a1',
    tertiary: '#00d2d3',
    light: '#ffffff',
    medium: '#576574',
    dark: '#000000'
  }
  ,
  square: {
    primary: '#000000',
    secondary: '#212121',
    tertiary: '#212121',
    light: '#ffffff',
    medium: '#919191',
    dark: '#000000'
  },

  strawberry: {
    primary: '#ee5253',
    secondary: '#ff6b6b',
    tertiary: '#e84118',
    light: '#ffffff',
    medium: '#919191',
    dark: '#000000'
  },

  calm: {
    primary: '#273c75',
    secondary: '#192a56',
    tertiary: '#7f8fa6',
    light: '#ffffff',
    medium: '#919191',
    dark: '#000000'
  },

  calmdark: {
    primary: '#273c75',
    secondary: '#192a56',
    tertiary: '#7f8fa6',
    light: '#000000',
    medium: '#919191',
    dark: '#ffffff'
  }

};




@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  selectedUI:String;

  bannerIsShowing;

  constructor(private theme: ThemeService, private storage: Storage, private admobFree: AdMobFree, private alertCtrl: AlertController) {
   
   }

   ionViewWillEnter(){
    this.showBannerAd();
   }
   
  ionViewDidLeave(){
   
    this.admobFree.banner.remove();
  }

  showBannerAd() {
    this.bannerIsShowing = true;
    let bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-2805990037771913/1385200255',
      isTesting: false,
      autoShow: true,
      
        //id: "ca-app-pub-3940256099942544/6300978111"
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then(() => {

        // success
    }).catch(e => alert(e));
}



   resetProgress() {

   //reset progress

    this.storage.set('scores', []); // when i leave the page, i store the new messages Array.

  }

  onClickResetProgress(){
    this.resetProgressAlertConfirm();
  }


  async resetProgressAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Reset Progress',
      message: 'You are about to reset all your current progress, are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.resetProgress();
          }
        }
      ]
    });

    await alert.present();
  }


  changeTheme(name) {
    this.theme.setTheme(themes[name]);
  }

  changeUIToDark(){

    this.theme.setToDark();

  }

  
  changeUIToLight(){

    this.theme.setToLight();

  }



  ngOnInit() {
  }

}
