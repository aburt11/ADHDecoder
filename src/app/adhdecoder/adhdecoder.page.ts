import {
  Component,
  OnInit,
  ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { Storage} from '@ionic/storage';
import {Chart} from 'chart.js';
//import { threadId } from 'worker_threads';
import { AdMobFreeBannerConfig, AdMobFree } from '@ionic-native/admob-free/ngx';

///import { Flip } from 'number-flip'

@Component({
  selector: 'app-adhdecoder',
  templateUrl: './adhdecoder.page.html',
  styleUrls: ['./adhdecoder.page.scss'],
})
export class ADHDecoderPage implements OnInit {

  @ViewChild('progressChart') progressChart;

  currentNumber = 0;

  roundsPerGame = 12;
  currentRound = 1;

  gameTime = 240; // 60 secs
  gameTimeInterval;

  originalGameTime;
  timeTaken = 0;

  rewardSecret;

  numSequences = 3;
  digitsPerSequence = 3;
  GeneratedSequences = [];
  CompletedSequences = [];
  numberSpeed = 1000; // speed in ms
  gameState = 'startscreen';
  insertSequence = false;
  sequenceChosen = false;
  targetSequence = 0;
  PlayerSequences = [];
  activeSequence = [];

  adMobbanner:any;

  clickedSequence = false;

  showEndScreen = false;

  bannerIsShowing = false;

  showMainScreen = true;

  showStartScreen = true;

  gameWon;

  gameTick;

  sequenceProbability = 0.84; // the chance of displaying one of the sequences 0.7; best 0.84;

  currentSequencePlace = 0;

  currentScore = 0;
  maxScore = 4;

  incorrectMatches = 0;

  selectedLevel: number;

  wordInterval;
  clickTimeout;

  scoreProgress = []; // saves each play as date, level, timetaken , incorrectMatches
  currentDate;

  // chart stuff
  chart: any;
  colorArray: any;

  scoreChunks: any = [];

  datesArray = [];
  levelsArray = [];
  timeArray = [];
  mistakeArray = [];

  constructor(private router: Router, private storage: Storage, private admobFree: AdMobFree) {
   /*
    this.currentNumber = 0;

    this.roundsPerGame = 12;
    this.currentRound = 1;

    this.gameTime = 240; // 60 secs
    this.timeTaken = 0;



    this.numSequences = 3;
    this.digitsPerSequence = 3;
    this.GeneratedSequences = [];
    this.CompletedSequences = [];
    this.numberSpeed = 1000; // speed in ms
    this.gameState = 'startscreen';
    this.insertSequence = false;
    this.sequenceChosen = false;
    this.targetSequence = 0;
    this.PlayerSequences = [];
    this.activeSequence = [];

    this.clickedSequence = false;

    this.showEndScreen = false;
    this.showMainScreen = true;

    this.showStartScreen = true;

    this.gameWon = false;

    this.sequenceProbability = 0.84; // the chance of displaying one of the sequences 0.7; best 0.84;

    this.currentSequencePlace = 0;

    this.currentScore = 0;
    this.maxScore = 4;

    this.incorrectMatches = 0;

*/

  }



  ionViewWillEnter(){
   
    this.currentNumber = 0;

    this.roundsPerGame = 12;
    this.currentRound = 1;

    this.gameTime = 240; // 60 secs
    this.timeTaken = 0;



    this.numSequences = 3;
    this.digitsPerSequence = 3;
    this.GeneratedSequences = [];
    this.CompletedSequences = [];
    this.numberSpeed = 1000; // speed in ms
    this.gameState = 'startscreen';
    this.insertSequence = false;
    this.sequenceChosen = false;
    this.targetSequence = 0;
    this.PlayerSequences = [];
    this.activeSequence = [];

    this.clickedSequence = false;

    this.showEndScreen = false;
    this.showMainScreen = true;

    if(this.bannerIsShowing == true){
      this.showStartScreen = true;

      this.admobFree.banner.remove();

      

    }

    this.showStartScreen = true;

  
    

    this.gameWon = false;

    this.sequenceProbability = 0.84; // the chance of displaying one of the sequences 0.7; best 0.84;

    this.currentSequencePlace = 0;

    this.currentScore = 0;
    this.maxScore = 4;

    this.incorrectMatches = 0;



  }


  ionViewDidEnter() {
    this.createChart();




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


/*
    this.chart = new Chart(this.progressChart.nativeElement, {
      type: 'line',
      axisX: {
        labelMaxWidth: 70,
        labelWrap: true,   // change it to false
        interval: 1,
        //prefix: "Very long label "
        enableSmartLabels: true
      },
      chart: {
        caption: '',
        xaxisname: '',
        yaxisname: '',
          numberprefix: '',
        enableSmartLabels: 1,
        manageLabelOverflow: 1
},

      data: {
        labels: this.datesArray,
        datasets: [{
            label: 'Incorrect Matches',
            data: this.mistakeArray,
            backgroundColor: 'rgb(255,255,255)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(249, 96, 102)', // array should have same number of elements as number of dataset
            borderWidth: 4
          },

          {
            label: 'Time Taken',
            data: this.timeArray,
            backgroundColor: 'rgb(255,255,255)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(138, 170, 229)', // array should have same number of elements as number of dataset
            borderWidth: 4
          }

        ]
      },

    //  options: chartoptions
    });

this.chart.render();

*/
  }


  /*      options:  {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      } */




  resetProgress() {

    this.scoreProgress = [];

    this.storage.set('scores', this.scoreProgress); // when i leave the page, i store the new messages Array.

  }


  setProgress() {


    // get the current date .toLocaleString();
    //  this.currentDate = new Date().toISOString();
    this.currentDate = new Date().toLocaleString();

    this.scoreProgress.push(this.currentDate, this.selectedLevel, this.timeTaken, this.incorrectMatches);

    this.storage.set('scores', this.scoreProgress);

  }

  getProgress() {

    this.storage.get('scores').then(data => { // with these lines of code i load ALL the messages saved
      let lastId = 0;
      if (data !== null && data.length !== 0) { // we have to check if the key is set (otherwise the get method returns null)
        this.scoreProgress = data;
        lastId = data[0].Id; // assuming that the first element of the array is the one with the biggest ID
      }
      /* HERE i use the lastId variable to ask the server if there are new messages to download*/
    });

  }


  ngOnInit() {

           // if no previously saved data, we dont neeed to merge the score
           this.getProgress();


  }



  // go to level function

  goToLevel(level) {
    console.log(' level chosen ' + level);

    this.selectedLevel = level;

    this.showStartScreen = false;
    this.showMainScreen = true;

    this.selectDifficulty();

  }

  selectDifficulty() {

    if (this.selectedLevel === 1) {
     

    }
    if (this.selectedLevel === 2) {

  


    }
    if (this.selectedLevel === 3) {
      // boss level, less time
    


    }
    if (this.selectedLevel === 4) {

    

    }
    if (this.selectedLevel === 5) {
      this.numSequences = 4;
  
    //short sequences, many instances
    }
    if (this.selectedLevel === 6) {
      // boss level, less time
         //short sequences, many instances
      this.numSequences = 4;
   
      this.sequenceProbability = 0.82;

    }
    if (this.selectedLevel === 7) {
   
      this.numSequences = 5;

      //short sequences, many instances

      this.sequenceProbability  = 0.82;


    }
    if (this.selectedLevel === 8) {
      // boss level, less time
this.gameTime += 200;
      this.numSequences = 5;
 
    //short sequences, many instances

      this.sequenceProbability  = 0.84;

    }
    if (this.selectedLevel === 9) {
      // boss level, less time
   

      this.numSequences = 5;
 
    //short sequences, many instances
      this.sequenceProbability  = 0.8;

    }
    if (this.selectedLevel === 10) {
      // boss level, less time
    this.gameTime += 250;

      this.numSequences = 5;
      this.digitsPerSequence = 5;
    //medium sequences, many instances
      this.sequenceProbability  = 0.86;


    }
    if (this.selectedLevel === 11) {
      // boss level, less time
   

      this.numSequences = 5;
      this.digitsPerSequence = 4;
   
      this.sequenceProbability  = 0.8;


    }
    if (this.selectedLevel === 12) {
      // boss level, less time
      this.gameTime += 260; 

      this.numSequences = 6;
      this.digitsPerSequence = 6;
     

      this.sequenceProbability  = 0.9;


    }




    // wildcard mode

    if (this.selectedLevel === 69) {
      // boss level, less time
      this.gameTime = Math.floor(Math.random() * (1000 * Math.random())); // change timer to 1 mins


      if (this.gameTime < 30) {

        this.gameTime += 90;

      }

      if (this.gameTime > 200) {

        this.gameTime = 360;
        this.sequenceProbability = Math.floor(10 * Math.random());
        console.log(this.sequenceProbability);

      }


      this.digitsPerSequence = Math.floor(10 * Math.random());
      this.numberSpeed -= Math.floor(Math.random() * 10);

    }



  }


  goHome() {

    this.router.navigateByUrl('/home');
  }

  onPlayDecoder() {

    this.originalGameTime = this.gameTime;

    if (this.gameState == 'startscreen') {
      this.getSequences();
      this.gameState = 'playing';
      this.StartTimers();
    }





  }

  showBannerAd() {
    this.bannerIsShowing =true;
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


  onClickMatch() {

    this.clickedSequence = true;

    //was 800
    const TIME_IN_MS = 1500; //originally 1000
    let onclickTimeout = setTimeout(() => {
      // somecode

      this.clickedSequence = false;


    }, TIME_IN_MS);



  }

  showEndGame() {

    this.showBannerAd();

    clearTimeout(this.wordInterval);
    this.giveReward();

    this.showMainScreen = false;
    this.showEndScreen = true;


  }



  StartTimers() {

    this.gameTimeInterval = setInterval(() => {

        if (this.gameTime > 0) {
          
          if(this.gameTick == true){

            this.gameTick = false;

          }
          else{
            this.gameTick = true;
          }

          this.gameTime -= 1;
        } else {
          this.gameState = 'finished';
          this.gameWon = false;
          this.showEndScreen = true;
          this.showMainScreen = false;

        }
      },
      (1000)); // every second





    this.wordInterval = setInterval(() => {
        if (this.gameState === 'playing') {
          this.updateNumber();


        }

        if (this.gameState === 'finished') {
          this.showEndGame();

        }


      }, (this.numberSpeed) // speed in ms
    );

  }

  giveReward() {

    this.rewardSecret = this.getRandomWord(words);

  }

  getRandomWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  onRefreshGame() {
    this.gameState = 'playing';
    this.gameTime = 60;
    this.currentRound = 1;
    this.currentNumber = 0;


    this.showEndScreen = false;
    this.showMainScreen = true;
    this.GeneratedSequences = [];
    this.CompletedSequences = [];
    this.PlayerSequences = [];
    this.activeSequence = [];

    this.getSequences();
    this.StartTimers();


  }

  updateNumber() {

    if (this.currentRound >= this.roundsPerGame) {
      this.gameState = 'finished';
      this.gameWon = true;
      this.timeTaken = this.originalGameTime - this.gameTime;
      this.setProgress();

      console.log(this.scoreProgress);
      this.showEndGame();
    }

    if (Math.random() > this.sequenceProbability) {
      this.insertSequence = true;
    }

    if (!this.insertSequence) {
      // generate random number between 0-9
      let numGen = Math.floor(Math.random() * Math.floor(10));

      // if activeSequences.length < 3, then push to array, if greater then push + pop first element
      if (this.activeSequence.length <= this.digitsPerSequence) {
        this.activeSequence.push(numGen);
        this.currentNumber = numGen;
      } else {
        this.activeSequence.shift();
        this.activeSequence.push(numGen);
        this.currentNumber = numGen;


      }
    }
    if (this.insertSequence) {

      if (!this.sequenceChosen) {
        this.targetSequence = Math.floor(Math.random() * Math.floor(this.numSequences));
        this.sequenceChosen = true;
        this.currentSequencePlace = 0;
      }

      if (this.currentSequencePlace < this.digitsPerSequence) {
        let seqNums = this.GeneratedSequences[this.targetSequence];
        let seqPlace = seqNums[this.currentSequencePlace];

        this.activeSequence.push(seqPlace);
        this.currentNumber = seqPlace;
        this.currentSequencePlace++;
      } else {
        // sequence finished

        let postseqGen = Math.floor(Math.random() * Math.floor(10));
        this.currentNumber = postseqGen;
        // if clicked
        if (this.clickedSequence) {
          // award round to player
          this.currentRound += 1;
          this.insertSequence = false;
          if (this.currentRound >= this.roundsPerGame) {
            this.gameWon = true;
          }

        } else {
          /// incorrect Match
          this.incorrectMatches += 1;

        }


        this.sequenceChosen = false;
        this.currentSequencePlace = 0;
      }


    }


  }

  getSequences() {
    // generate each sequence
    for (let x = 0; x < this.numSequences; x++) {

      let thisSequence = [];
      // generate each number
      for (let d = 0; d < this.digitsPerSequence; d++) {
        let randNum = Math.floor(Math.random() * Math.floor(10));
        thisSequence.push(randNum);

      }

      // save sequences to generated array
      this.GeneratedSequences.push(thisSequence);
      this.PlayerSequences.push(thisSequence.join(' '));

    }


  }



}



let words = ['Accurate',
  'instantly',
  'Advantage',
  'Always',
  'A cut above',
  'Bargain',
  'Certain',
  'Certainly',
  'Confident',
  'Convenient',
  'Definitely',
  'Delighted',
  'Easy',
  'Ecstatic',
  'Effective',
  'Emphasize',
  'Extremely',
  'Freedom',
  'Guaranteed',
  'Introducing',
  'First ever',
  'Investment',
  'conscientious',
  'approving',
  'honored',
  'privileged',
  'adaptable',
  'relaxed',
  'Astonishing',
  'Astounded',
  'assured',
  'fulfilled',
  'genuine',
  'authentic',
  'self-sufficient',
  'reliable',
  'sure',
  'secure',
  'stable',
  'honest',
  'truthful',
  'supportive',
  'excellent',
  'responsible',
  'solid',
  'trusting',
  'supported',
  'Absolutely',
  'Bargain',
  'clarity',
  'transparency',
  'humility',
  'blissful',
  'joyous',
  'delighted',
  'overjoyed',
  'gleeful',
  'thankful',
  'festive',
  'ecstatic',
  'satisfied',
  'cheerful',
  'sunny',
  'elated',
  'jubilant',
  'jovial',
  'fun-loving',
  'lighthearted',
  'glorious',
  'innocent',
  'child-like',
  'gratified',
  'euphoric',
  'on top of the',
  'world',
  'playful',
  'courageous',
  'energetic',
  'liberated',
  'optimistic',
  'frisky',
  'animated',
  'spirited',
  'thrilled',
  'wonderful',
  'funny',
  'intelligent',
  'exhilarated',
  'spunky',
  'youthful',
  'vigorous',
  'tickled',
  'creative',
  'constructive',
  'helpful',
  'resourceful',
  'at ease',
  'comfortable',
  'pleased',
  'encouraged',
  'surprised',
  'content',
  'serene',
  'bright',
  'blessed',
  'Vibrant',
  'Bountiful',
  'Glowing',
  'motivated',
  'eager',
  'keen',
  'earnest',
  'inspired',
  'enthusiastic',
  'bold',
  'brave',
  'daring',
  'hopeful',
  'upbeat',
  'assured',
  'clear',
  'balanced',
  'fine',
  'okay',
  'grateful',
  'carefree',
  'adequate',
  'fulfilled',
  'genuine',
  'authentic',
  'forgiving',
  'sincere',
  'uplifted',
  'unburdened',
  'confident',
  'self-sufficient',
  'reliable',
  'sure',
  'unique',
  'dynamic',
  'tenacious',
  'cooperative',
  'productive',
  'exuberant',
  'in the zone',
  'responsive',
  'conscientious',
  'approving',
  'honored',
  'privileged',
  'adaptable',
  'Empowered',
  'Focused',
  'Capable',
  'calm',
  'at ease',
  'comfortable',
  'content',
  'quiet',
  'certain',
  'relaxed',
  'serene',
  'bright',
  'blessed',
  'balanced',
  'grateful',
  'carefree',
  'fulfilled',
  'genuine',
  'authentic',
  'forgiving',
  'sincere',
  'uplifted',
  'unburdened',
  'confident',
  'self-sufficient',
  'glowing',
  'radiant',
  'beaming',
  'reflective',
  'smiling',
  'grounded',
  'unhurried',
  'open-minded',
  'efficient',
  'non-controlling',
  'unassuming',
  'trusting',
  'supported',
  'fluid',
  'light',
  'spontaneous',
  'aware',
  'healthy',
  'meditative',
  'still',
  'rested',
  'waiting',
  'laughing',
  'graceful',
  'natural',
  'steady',
  'centered',
  'placid',
  'Clear',
  'Stoic',
  'Aligned'
];
