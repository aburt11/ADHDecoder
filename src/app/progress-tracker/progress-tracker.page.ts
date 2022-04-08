import { Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';


import { Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { Storage} from '@ionic/storage';
import {Chart} from 'chart.js';


  // import { threadId } from 'worker_threads';
import { AdMobFreeBannerConfig, AdMobFree } from '@ionic-native/admob-free/ngx';
import { getPreviousOrParentTNode } from '@angular/core/src/render3/state';
import { R3TargetBinder } from '@angular/compiler';




@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.page.html',
  styleUrls: ['./progress-tracker.page.scss'],
})
export class ProgressTrackerPage {
  @ViewChild('progressChart') progressChart;

  @ViewChild('mathChart') mathChart;

  mathchart: any;
  // chart stuff
  chart: any;
  colorArray: any;

  lineGradient;

  progressChartHidden = false;
  mathChartHidden = false;

  public mathContext: CanvasRenderingContext2D;

  scoreChunks: any = [];

  datesArray = [];
  levelsArray = [];
  timeArray = [];
  mistakeArray = [];

  primaryColour;

 gradientStroke;

 gradientStroke2;

 gradientStroke3;

 canvasElement;

 ctx;

lastX;
lastY;
currentColour;
brushSize;

bannerIsShowing = false;


  scoreProgress = []; // saves each play as date, level, timetaken , incorrectMatches

  mathProgress = [];
  mathProgressDates = [];
  currentDate;



  constructor( private storage: Storage, private admobFree: AdMobFree, private platform: Platform) {

    Chart.defaults.global.responsive = true;


  }

  ionViewDidLeave() {

    this.admobFree.banner.remove();
  }

  showBannerAd() {
    this.bannerIsShowing = true;
    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-2805990037771913/1385200255',
      isTesting: false,
      autoShow: true,

        // id: "ca-app-pub-3940256099942544/6300978111"
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then(() => {

        // success
    }).catch(e => alert(e));
}


hideShowMenu(  menu) {

  if (menu === 'ADHD') {
    if ( this.progressChartHidden === false) {
      this.progressChartHidden = true;
    } else {
      this.progressChartHidden = false;
    }
  }

  if (menu === 'MATH') {
    if ( this.mathChartHidden === false) {
      this.mathChartHidden = true;
    } else {
      this.mathChartHidden = false;
    }
  }

}



  getElements() {


    this.canvasElement = this.progressChart.canvas.nativeElement;
    this.scaleCanvas(this.canvasElement);
    window.addEventListener('resize', () => { this.scaleCanvas(this.canvasElement); });


    }

    scaleCanvas(canvasElement) {
      canvasElement.renderer.setElementAttribute(canvasElement, 'width', this.platform.width() + '');
      canvasElement.setElementAttribute(canvasElement, 'height', this.platform.height() + '');
    }

    changeColour(colour) {
    this.currentColour = colour;
    }

    changeSize(size) {
    this.brushSize = size;
    }

    handleStart(ev) {
    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
    }

    handleMove(ev) {
    const ctx = this.canvasElement.getContext('2d');
    const currentX = ev.touches[0].pageX;
    const currentY = ev.touches[0].pageY;

    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = this.currentColour;
    ctx.lineWidth = this.brushSize;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
    }

    clearCanvas() {
    const ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

  ionViewDidEnter() {
 //   this.getElements();
// this.getColours();

this.getProgress();

this.showBannerAd();






  }

  getColours() {



  //  this.primaryColour = document.getElementsByClassName('primary')
  // let colour =  this.primaryColour.style.getPropertyValue('--ion-color-primary');

 // console.log(colour);



 // this.primaryColour = document.querySelector('body > app-root > ion-app > ion-split-pane > ion-router-outlet > app-progress-tracker > ion-content > ion-grid > ion-row > ion-col > canvas');



  }

  addGradientFillStroke(firstColour, secondColour, thirdColour, fourthColour, gradientStroke) {
    this.ctx =  this.progressChart;
    const width = window.innerWidth || document.body.clientWidth;
    const mygradientStroke = this.ctx.createLinearGradient(0, 0, width, 0);
    mygradientStroke.addColorStop(0, firstColour);
    mygradientStroke.addColorStop(0.3, secondColour);
    mygradientStroke.addColorStop(0.6, thirdColour);
    mygradientStroke.addColorStop(1, fourthColour);


    gradientStroke = mygradientStroke;


  }



  getProgress() {

    this.storage.get('scores').then(data => { // with these lines of code i load ALL the messages saved
      let lastId = 0;
      if (data !== null && data.length !== 0) { // we have to check if the key is set (otherwise the get method returns null)
        this.scoreProgress = data;
        lastId = data[0].Id; // assuming that the first element of the array is the one with the biggest ID
      }
      /* HERE i use the lastId variable to ask the server if there are new messages to download*/
      this.createChart();
    });


    this.storage.get('quickmaths').then(data => { // with these lines of code i load ALL the messages saved
      const lastId = 0;
      if (data !== null && data.length !== 0) { // we have to check if the key is set (otherwise the get method returns null)
        this.mathProgress = data[0];
        if (data[1] !== undefined) {
          this.mathProgressDates = data[1];
          console.log("MATH PROG DATES ", this.mathProgressDates);
        }


      }
      /* HERE i use the lastId variable to ask the server if there are new messages to download*/
      this.createMathChart();
    });

  }

  createMathChart() {

    for (let x = 0; x < this.mathProgress.length; x++) {
      this.mathProgress[x] = this.mathProgress[x] / 1000;
    }


    this.mathContext = ( this.mathChart.nativeElement as HTMLCanvasElement ).getContext('2d');
    this.lineGradient = this.mathContext.createLinearGradient(0, 0, 500, 200);


// gradient.addColorStop(0, 'rgba(41, 128, 185,1)');
// gradient.addColorStop(1, 'rgba(109, 213, 250,1)');

    this.lineGradient.addColorStop(0, 'rgba(18, 194, 233,1)');
    this.lineGradient.addColorStop(1, 'rgba(196, 113, 237,1)');

    if (this.mathProgressDates === null || this.mathProgressDates === undefined || this.mathProgressDates.length === 0) {
  
      for(let t = 0; t < this.mathProgress.length; t++){

        this.mathProgressDates.push(new Date().toLocaleString());
      }
  
}

console.log(this.mathProgressDates, "MATH PROG DATES");


    const MathChart = new Chart(this.mathChart.nativeElement, {
      responsive: true,
      scaleOverride: true,
      scaleSteps: 9,
      scaleStartValue: 0,
      scaleStepWidth: 1,
      type: 'line',


      axisX: {
     pointLabelFontSize: 4,
        labelMaxWidth: 2,
        labelWrap: true,   // change it to false
        interval: 2,
        // prefix: "Very long label "
        enableSmartLabels: true
      },
      chart: {
        caption: '',
        xaxisname: '',
        yaxisname: '',
          numberprefix: '',
        enableSmartLabels: 1,
        manageLabelOverflow: 1,

},

      data: {
   
        datasets: [
          {
            label: 'Time Taken (in seconds)',
            data: this.mathProgress,
            backgroundColor: ' rgb(51, 51, 153)', // array should have same number of elements as number of dataset
            borderColor:  this.lineGradient ,
            pointBorderColor: 'rgb(255, 255, 255)',
            pointBackgroundColor: 'rgb(111, 25, 142)',
            pointHoverBackgroundColor: 'rgb(173, 48, 219)',
            pointHoverBorderColor: 'rgb(138, 30, 175)',
            pointBorderWidth: 8,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 1,
            pointRadius: 2,
            fill: false,
            borderWidth: 4
          }


        ]
      },

    //  options: chartoptions
    });


    MathChart.render();




  }



  createChart() {

    let i, j, temparray, chunk = 4;
    for (i = 0, j = this.scoreProgress.length; i < j; i += chunk) {
      temparray = this.scoreProgress.slice(i, i + chunk);
      // do whatever
      this.scoreChunks.push(temparray);
    }
    console.log(this.scoreChunks);


    // loop through and split dates for labels
    for (let n = 0; n < this.scoreChunks.length; n++) {
      this.datesArray.push(this.scoreChunks[n][0].split(','));


    }
    console.log('datesArray ' + this.datesArray);


    // loop through and split dates for level
    for (let t = 0; t < this.scoreChunks.length; t++) {
      this.levelsArray.push(this.scoreChunks[t][1]);


    }
    console.log('levelsArray ' + this.levelsArray);


    // loop through and split dates for level
    for (let c = 0; c < this.scoreChunks.length; c++) {
      this.timeArray.push(this.scoreChunks[c][2]);


    }
    console.log('timeArray ' + this.timeArray);

    // loop through and split dates for level
    for (let d = 0; d < this.scoreChunks.length; d++) {
      this.mistakeArray.push(this.scoreChunks[d][3]);


    }

    console.log('mistakeArray ' + this.mistakeArray);

    const chartoptions = {
      pointLabelFontSize: 8
    };


    this.chart = new Chart(this.progressChart.nativeElement, {
      responsive: true,
      scaleOverride: true,
      scaleSteps: 9,
      scaleStartValue: 0,
      scaleStepWidth: 1,
      type: 'line',


      axisX: {
     pointLabelFontSize: 4,
        labelMaxWidth: 2,
        labelWrap: false,   // change it to false
        interval: 2,
        // prefix: "Very long label "
        enableSmartLabels: true
      },
      chart: {
        caption: '',
        xaxisname: '',
        yaxisname: '',
          numberprefix: '',
        enableSmartLabels: 1,
        manageLabelOverflow: 1,

},

      data: {
        labels: this.datesArray,
        datasets: [
          {
            label: 'Level Selected',
            data: this.levelsArray,
            backgroundColor: ' rgb(51, 51, 153)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(186, 150, 198)' ,
            pointBorderColor: 'rgb(138, 30, 175)',
            pointBackgroundColor: 'rgb(111, 25, 142)',
            pointHoverBackgroundColor: 'rgb(173, 48, 219)',
            pointHoverBorderColor: 'rgb(138, 30, 175)',
            pointBorderWidth: 8,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 1,
            pointRadius: 2,
            fill: false,
            borderWidth: 4
          },
          {
            label: 'Incorrect Matches',
            data: this.mistakeArray,
            backgroundColor: 'rgb(186, 150, 198)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(181, 16, 57)' ,
            pointBorderColor: 'rgb(226, 97, 129)',
            pointBackgroundColor: 'rgb(193, 25, 67)',
            pointHoverBackgroundColor: 'rgb(193, 25, 67)',
            pointHoverBorderColor: 'rgb(193, 25, 67)',
            pointBorderWidth: 8,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 1,
            pointRadius: 2,
            fill: false,
            borderWidth: 4
          },

          {
            label: 'Time Taken',
            data: this.timeArray,
            backgroundColor: 'rgb(47, 65, 82)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(63, 85, 107)' ,
            pointBorderColor: 'rgb(112, 158, 204)',
            pointBackgroundColor: 'rgb(112, 158, 204)',
            pointHoverBackgroundColor: 'rgb(71, 122, 170)',
            pointHoverBorderColor: 'rgb(46, 85, 122)',
            pointBorderWidth: 8,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 1,
            pointRadius: 2,
            fill: false,
            borderWidth: 4
          }


        ]
      },

    //  options: chartoptions
    });


    this.chart.render();


  }


}
