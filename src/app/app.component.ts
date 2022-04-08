import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './theme-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
  
   

    {
      title: 'Welcome',
      url: '/home',
      icon: 'code'
    },



    {
      title: 'ADHDecoder',
      url: '/adhdecoder',
      icon: 'finger-print'
    },

    
    {
      title: 'progress tracker',
      url: '/progress-tracker',
      icon: 'podium'
    } ,

    {
      title: 'speedreader',
      url: '/speedreader',
      icon: 'list'
    }, 

    {
      title: 'Quickmaths',
      url: '/quickmaths',
      icon: 'calculator'
    }, 

    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    }
  ];

selectedTheme:String;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private theme: ThemeService
  ) {
    this.theme.getActiveUI().subscribe(val => this.selectedTheme = val);

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
