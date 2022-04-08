import {
  Storage
} from '@ionic/storage';
import {
  Router
} from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-quickmaths',
  templateUrl: './quickmaths.page.html',
  styleUrls: ['./quickmaths.page.scss'],
})
export class QuickmathsPage implements OnInit {

  isPlaying = false;
  gameFinished = false;
  gameTimer;
  rounds = 20; // 20
  currentRound = 0;
  playerTime = 0; // in ms
  playerTimeInSeconds = 0;
  showCorrect = false;

  isTock = false;

  showCorrectTimer;

  playerProgress = [];

  playerProgressDates = [];

  playerProgressLevels = [];

  playerErrors = 0;

  firstNumber = 0;
  secondNumber = 0;
  currentEquationString;
  equationAnswer;

  playerRating;

  userInput = '';

  gameLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  selectedLevel = 1;


  constructor(private router: Router, private storage: Storage) {}

  ngOnInit() {
    this.showCorrect = false;
  }

  getProgress() {
    this.storage.get('quickmaths').then(data => { // with these lines of code i load ALL the messages saved

      if (data !== null && data.length !== 0) { // we have to check if the key is set (otherwise the get method returns null)
        
        this.playerProgressLevels = data[0];
        this.playerProgress = data[1];
        this.playerProgressDates = data[2];
        console.log('PLAYER PROGRESS ', this.playerProgress);
      }
      /* HERE i use the lastId variable to ask the server if there are new messages to download*/
    });
  }


  clearButton() {
    this.userInput = '';
  }

  buttonPressed(btn) {
    console.log('BTN PRESS');
    this.userInput += parseInt(btn);
    console.log('USER INPUT ', this.userInput);
  }

  setProgress() {

    this.playerProgressDates.push(new Date().toLocaleString());

    this.playerProgressLevels.push(this.selectedLevel);

    console.log('DATE OF ROUND', this.playerProgressDates[this.playerProgressDates.length - 1]);


    this.storage.set('quickmaths', [this.playerProgressLevels,
    this.playerProgress, this.playerProgressDates]).then(data => { // with these lines of code i load ALL the messages saved

      if (data !== null && data.length !== 0) { // we have to check if the key is set (otherwise the get method returns null)
        console.log('SCORES SET!');
        console.log('PLAYER PROGRESS ', this.playerProgress);
      }
      /* HERE i use the lastId variable to ask the server if there are new messages to download*/
    });


  }


  ionViewWillLEave(){
    this.isPlaying = false;
    this.gameFinished = false;

    this.rounds = 20; // 20
    this.currentRound = 0;
    this. playerTime = 0; // in ms
    this.playerTimeInSeconds = 0;
    this.showCorrect = false;
  
    this. isTock = false;
  
  
  
    this.playerProgress = [];
  
    this.playerProgressDates = [];
  
    this.playerProgressLevels = [];
  
    this.playerErrors = 0;

  
    this.playerRating = 0;
  
    this.userInput = '';
  
   
    this.selectedLevel = 1;
  }

  ionViewDidLoad() {


    this.showCorrect = false;
  }

  startMultiplication() {


    this.getProgress();



    this.isPlaying = true;
    this.generateEquation();
    this.gameTimer = setInterval(() => {


      this.gameLoop();
    }, 100);

  }


  generateEquation() {
    var min;
    var max;


    switch (this.selectedLevel) {

      case 1:

        min = Math.ceil(1);
        max = Math.floor(10);
        this.firstNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.secondNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        break;


      case 2:


        min = Math.ceil(5);
        max = Math.floor(10);
        this.firstNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.secondNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        break;


      case 3:


        min = Math.ceil(1);
        max = Math.floor(12);
        this.firstNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.secondNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        break;

      case 4:


        min = Math.ceil(1);
        max = Math.floor(15);
        this.firstNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.secondNumber = Math.floor(Math.random() * (max - min + 1)) + min;


        break;

      case 5:


        min = Math.ceil(5);
        max = Math.floor(15);
        this.firstNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.secondNumber = Math.floor(Math.random() * (max - min + 1)) + min;


        break;

      case 6:


        min = Math.ceil(8);
        max = Math.floor(15);
        this.firstNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.secondNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        break;

      case 7:

        min = Math.ceil(1);
        max = Math.floor(18);
        this.firstNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.secondNumber = Math.floor(Math.random() * (max - min + 1)) + min;


        break;

      case 8:

        min = Math.ceil(9);
        max = Math.floor(18);
        this.firstNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.secondNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        break;

      case 9:

        min = Math.ceil(12);
        max = Math.floor(18);
        this.firstNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.secondNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        break;

      case 10:

        min = Math.ceil(3);
        max = Math.floor(20);
        this.firstNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.secondNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        break;



    }



    this.equationAnswer = this.firstNumber * this.secondNumber;
    this.currentEquationString = this.firstNumber + ' X ' + this.secondNumber + ' = ';

  }


  gameLoop() {
    this.playerTime += 100;

    if (this.userInput === this.equationAnswer) {
      this.userInput = '';
      console.log('EQ CORRECT!');

      if (this.isTock === false) {
        this.isTock = true;
      } else {
        this.isTock = false;
      }

      this.showCorrect = true;
      this.showCorrectTimer = setTimeout(() => {
        this.showCorrect = false;
        clearTimeout(this.showCorrectTimer);
      }, 500);

      // generate new equation
      this.generateEquation();

      if (this.currentRound < this.rounds) {
        this.currentRound += 1;
      } else {
        this.gameFinished = true;
        clearInterval(this.gameTimer);



        this.getPlayerRating();


      }

    }



    if (this.playerTime > 1000) {
      this.playerTimeInSeconds = Math.round(this.playerTime / 1000);
    }



  }

  getPlayerRating() {

    if (this.playerTimeInSeconds > 80) {
      this.playerRating = 'Slow Poke';
    }

    if (this.playerTimeInSeconds < 80 && this.playerTimeInSeconds > 60) {
      this.playerRating = 'Poor';
    }

    if (this.playerTimeInSeconds < 60 && this.playerTimeInSeconds > 40) {
      this.playerRating = 'Average';
    }

    if (this.playerTimeInSeconds < 40 && this.playerTimeInSeconds > 30) {
      this.playerRating = 'Pro';
    }

    if (this.playerTimeInSeconds < 30) {
      this.playerRating = 'Amazing';
    }

    this.playerProgress.push(this.playerTime);

    this.setProgress();

  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  playAgain() {

    this.isPlaying = false;
    this.gameFinished = false;
    this.rounds = 20;
    this.currentRound = 0;
    this.playerTime = 0; // in ms
    this.playerTimeInSeconds = 0;


    this.firstNumber = 0;
    this.secondNumber = 0;
    this.currentEquationString = '';
    this.equationAnswer = 0;
    this.playerProgress = [];
    this.playerRating = '';
    

    this.startMultiplication();

  }

}
