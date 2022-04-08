import { FilePath } from '@ionic-native/file-path/ngx';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  loadLContext
} from '@angular/core/src/render3/discovery_utils';
import {
  Observable,
  observable
} from 'rxjs';
import 'rxjs';
import {
  FileChooser
} from '@ionic-native/file-chooser/ngx';

import {
  File
} from '@ionic-native/file/ngx';

@Component({
  selector: 'app-speedreader',
  templateUrl: './speedreader.page.html',
  styleUrls: ['./speedreader.page.scss'],
})
export class SpeedreaderPage implements OnInit {

  wpm = 350;
  wordspertick = 0;
  interval: any;
  paused: boolean;


  highlight: any;
  reader: any;
  sourceText = '';
  wordQueue: string[];
  playState = 'paused';
  wordStrings;
  currentWord: string;
  currentCenterLetter;

  totalwords;
  onCurrentWord = 0;
  currentWordLength;


  wordMid: string;
  wordSplit;
  wordStart;
  wordEnd;

  timerVar;
  timerVal;

  wordInterval;
  isReading = false;

  resolvedfilepath;


  constructor(private fileChooser: FileChooser, private file: File, private filepath: FilePath) {


    this.onCurrentWord = 0;




  }

  ionViewWillEnter() {
    this.wpm = 350;

    this.sourceText = '';

  }

  ionViewWillLeave() {
    clearInterval(this.wordInterval);
  }


  async onOpenFIle() {

    await this.fileChooser.open()
      .then(async (uri) => {


        await this.file.resolveLocalFilesystemUrl(uri).then(async (res) => {
          let path = res.toURL();

          this.filepath.resolveNativePath(path).then((result) =>{

            var filep = result;

                  
          console.log(filep);

          const pathsplit = filep.split('/');
          let filenamen = pathsplit[pathsplit.length - 1];
         this.file.readAsText(filep, filenamen).then(async (txt) => {

            this.sourceText = txt;
            await console.log(txt);

          });

           });

        });

        /* console.log(uri);

         this.file.resolveLocalFilesystemUrl(uri).then((resn) => {

           this.resolvedfilepath = resn.toURL();

           console.log(this.resolvedfilepath);

           const pathsplit =  this.resolvedfilepath.split('/');
           let filenamen = pathsplit[pathsplit.length-1];
          console.log(filenamen);

           debugger;


           let path =filename.replace(filename,'');
         
           this.file.readAsText(path, filename).then((res)=>{
         
             this.sourceText = res.toString();
         
         
          });


         }); */

      });
  }


  onStartReader() {
    this.getWordsFromText();
    this.wordspertick = (60000 / this.wpm);
    this.StartTimer();
    this.isReading = true;

  }

  onStopReader(){
    clearInterval(this.wordInterval);
    this.isReading = false;
  }

  StartTimer() {


    this.wordInterval = setInterval(() => {
      if (this.onCurrentWord < this.totalwords) {

        this.generateWord();
      }

    }, (this.wordspertick));

  }

  getWordsFromText() {
    // Array of all words; new lines are replaced with spaces
    var raw = this.sourceText;
    raw = raw.replace(/\n/g, ' ');
    this.wordStrings = raw.split(' ');

    this.totalwords = this.wordStrings.length;

  }

  generateWord() {

    if (this.onCurrentWord < this.totalwords) {
      //if there is text to generate
      this.currentWord = this.wordStrings[this.onCurrentWord];
      this.currentWordLength = this.currentWord.length;

      //if word is even letters

      if (this.currentWordLength % 2 === 0) {
        /*
        Extract the characters from position 3 to 8:

        var str = "Hello world!";
        var res = str.slice(3, 8);
        */
        //

        this.wordMid = this.currentWord[this.currentWordLength / 2];
        this.wordStart = this.currentWord.slice(0, this.currentWordLength / 2);
        this.wordEnd = this.currentWord.slice(this.currentWordLength / 2, this.currentWord.length);
      } else {
        //odd
        this.wordMid = this.currentWord[(this.currentWordLength + 1) / 2];

        this.wordStart = this.currentWord.slice(0, this.currentWordLength + 1 / 2);
        this.wordEnd = this.currentWord.slice(this.currentWordLength + 1 / 2, this.currentWord.length);


      }

      this.onCurrentWord++;

    } else {
      //end of reading
      this.onCurrentWord = 0;
    }





  }

  ngOnInit() {}

}
