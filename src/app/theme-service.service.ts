import { Injectable, Inject } from '@angular/core';
import * as Color from 'color';
import { DOCUMENT } from '@angular/common';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { setupConfig } from '@ionic/core';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme:BehaviorSubject<String>;

  constructor(
    @Inject(DOCUMENT) private document: Document, private storage:Storage) {
      this.theme = new BehaviorSubject('dark-theme');

      storage.get('theme').then(cssText => {  // <--- GET SAVED THEME
        this.setGlobalCSS(cssText);
      });

     }

     setActiveUI(val){
       this.theme.next(val);
     }

    
     setToLight(){

     }

     getActiveUI(){
      return this.theme.asObservable();

     }


     setToDark(){
      this.document.documentElement.style.setProperty('--background','#000000');
      this.document.documentElement.style.setProperty('--ion-background-color','#000000');
      this.document.documentElement.style.setProperty('ion-background-color','#000000');
      this.document.documentElement.style.setProperty('--color','#FFFFFF');
      this.document.documentElement.style.setProperty('color','#FFFFFF');
       const cssT = CSSTextGenerator(this.theme) + UIModeGenerator('dark');
       this.setGlobalCSS(cssT);
       this.storage.set('theme', cssT);
     }

    setTheme(theme){
      const cssText = CSSTextGenerator(theme);
      this.setGlobalCSS(cssText);
      this.storage.set('theme', cssText); // <--- SAVE THEME HERE

    }

    setVariable(name, value){
      this.document.documentElement.style.setProperty(name,value);
    }

    private setGlobalCSS(css:string){
      this.document.documentElement.style.cssText = css;
    }


}




function contrast(color, ratio = 0.8) {
  color = Color(color);
  return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
}



function UIModeGenerator(scheme){

  if(scheme === 'dark'){


    return `
    --ion-background-color: #000000 !important;
    --background: #000000 !important;
      background: #000000 !important;
    --color: #ffffff !important;
      color: #ffffff !important;

 


    `
  }

  if(scheme === 'light'){

  
    return `

    ion-card{

    }

    `
    
  }


}

function CSSTextGenerator(colors) {
  colors = { ...defaults, ...colors };

  const {
    primary,
    secondary,
    tertiary,
    success,
    warning,
    danger,
    dark,
    medium,
    light
  } = colors;

  const shadeRatio = 0.1;
  const tintRatio = 0.1;

  return `
    --ion-color-base: ${light};
    --ion-color-contrast: ${primary};

    --ion-color-primary: ${primary};
    --ion-color-primary-rgb: 56,128,255;
    --ion-color-primary-contrast: ${contrast(primary)};
    --ion-color-primary-contrast-rgb: 255,255,255;
    --ion-color-primary-shade:  ${Color(primary).darken(shadeRatio)};

    --ion-background-color: ${light};
      background:  ${light};
      --background:  ${light};

      --ion-overlay-background-color:  ${light};
 
      color:  ${dark};
    --color: ${dark};
    --ion-text-color: ${dark};
  
  border-color: ${primary};
  -- border-color: ${primary};
  
  --ion-color-step-850:  ${primary};
  --ion-color-step-550:  ${dark};

  --highlight-color-valid:  ${primary};
  --highlight-color-focused:  ${primary};

  --ion-color-success: ${primary};

    // omitted other styles, see full source code
`;
}

const defaults = {
  primary: '#3880ff',
  secondary: '#0cd1e8',
  tertiary: '#7044ff',
  success: '#3880ff',
  warning: '#ffce00',
  danger: '#f04141',
  dark: '#222428',
  medium: '#989aa2',
  light: '#f4f5f8'
};
