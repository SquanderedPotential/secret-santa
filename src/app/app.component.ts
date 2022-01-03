import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('namesDiv') namesDiv: ElementRef | undefined;
  names = [{"name":"Mohan","santa":"Kiran Abhang"},{"name":"Ankit","santa":"Rupinder Singh"},{"name":"Nishant","santa":"Nikita Khare"},{"name":"Nikita","santa":"Amit Jain"},{"name":"Apurva","santa":"Rahul Shelke"},{"name":"Shwetali","santa":"Tripur Patel"},{"name":"Natwar","santa":"Ishan Sharma"},{"name":"Vanita","santa":"Pooja Kadam"},{"name":"Tripur","santa":"Shwetali Dhumal"},{"name":"Tejas","santa":"Sandip Hade"},{"name":"Amruta","santa":"Sandesh Patil"},{"name":"Tanya","santa":"Saurav Khandagale"},{"name":"Tirthankar","santa":"Praveen J R"},{"name":"Sandesh","santa":"Tanya Dutt"},{"name":"Sandip","santa":"Natwar Singh"},{"name":"Nikita","santa":"Amruta Kasar"},{"name":"Manish","santa":"Mohan Thirumaliah"},{"name":"Amit","santa":"Vanita Saxena"},{"name":"Praveen","santa":"Ankit Choudhary"},{"name":"Pooja","santa":"Tejas Pawar"},{"name":"Kuldeep","santa":"Ayushi Dantulwar"},{"name":"Rahul","santa":"Nikita Marne"},{"name":"Ishan","santa":"Tirthankar Kundu"},{"name":"Rupinder","santa":"Apurva Joshi"},{"name":"Kushal","santa":"Nishant Menaria"},{"name":"Sagar","santa":"Kushal Devra"},{"name":"Ayushi","santa":"Kuldeep Patel"},{"name":"Saurav","santa":"Manish Choudhary"},{"name":"Sampada","santa":"Mithilesh Sutrave"},{"name":"Mithilesh","santa":"Sagar Sahoo"},{"name":"Kiran","santa":"Pranjal Borhade"},{"name":"Vivek","santa":"Nikash Saxena"},{"name":"Pranjal","santa":"Vivek Bapardekar"},{"name":"Nikash","santa":"Sampada Nandanwar"}]
  chosenIndex: number = -1;
  sizeArray = ['xx-large', 'xxx-large', 'x-large'];
  alignArray = ['flex-start', 'center', 'flex-end'];
  gameArray = ['missing', 'scrambled'];
  santaView = 'spoiler';
  timerHours = 0;
  timerMinutes = 0;
  timerSeconds = 0;
  gameText = "";
  timer: any;
  timeLeft: number = 30;
  tick: any;
  tada: any;

  constructor() { 

  }

  ngOnInit(): void { 
    this.tick = new Audio();
    this.tick.src = '../assets/sounds/tick.wav';
    this.tick.load();
    this.tada = new Audio();
    this.tada.src = '../assets/sounds/tada.wav';
    this.tada.load();
  }

  ngAfterViewInit(): void {
    for (let i = 0; i < this.names.length; i++) {
      let name = this.namesDiv?.nativeElement.children[i];
      name.setAttribute('style', 'font-size:' + this.sizeArray[Math.floor(Math.random() * 3)] +
        ';align-self:' + this.alignArray[Math.floor(Math.random() * 3)] +
        ';justify-self:' + this.alignArray[Math.floor(Math.random() * 3)]);
    }
  }

  async chooseRandom() {
    this.timerSeconds = 0;
    clearInterval(this.timer);
    this.santaView = 'spoiler';
    this.names = this.names.filter((obj: any) => obj.name != this.names[this.chosenIndex]?.name);
    for (let i = 0; i < 20; i++) {
      this.chosenIndex = Math.floor(Math.random() * this.names.length);
      //this.playAudio('../assets/sounds/tick.wav');
      this.tick.play();
      await new Promise(f => setTimeout(f, 100));
    }
  }

  getGameText(santaObj: any) {
    if (!santaObj?.hint) {
      let game = this.gameArray[Math.floor(Math.random() * 2)];
      if (game == "missing") {
        return this.getMissing(santaObj?.santa.split(' ')[0].toUpperCase()) + '\xa0\xa0\xa0\xa0' + this.getMissing(santaObj?.santa.split(' ')[1]?.toUpperCase());
      } else if (game == "scrambled") {
        return this.getScrambled(santaObj?.santa.split(' ')[0].toUpperCase()) + ' ' + this.getScrambled(santaObj?.santa.split(' ')[1]?.toUpperCase());
      }
    }
    return santaObj.hint;
  }

  reveal() {
    if (this.santaView == "spoiler") {
      //this.playAudio('../assets/sounds/tick.wav');
      this.tick.play();
      this.gameText = this.getGameText(this.names[this.chosenIndex]);
      this.santaView = "game";
      this.timerSeconds = 30;
      this.startTimer();
    }
    else if (this.santaView == "game") {
      //this.playAudio('../assets/sounds/tada.wav')
      this.tada.play();
      this.santaView = "santa";
      this.timerSeconds = 0;
      clearInterval(this.timer);
    }
  }

  getScrambled(word: string = "") {
    let arr = word.split('');
    let n = arr.length - 1;
    for (let i = 0; i < n; i++) {
      let j = Math.floor(Math.random() * n);
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr.join('');
  }

  getMissing(word: string = "") {
    let gameText = word;
    let n = Math.ceil(gameText.length / 2) + 1;
    let alreadyReplaced = new Set();
    for (let i = 0; i < n; i++) {
      let pos = -1
      do {
        pos = Math.floor(Math.random() * gameText.length);

      } while (alreadyReplaced.has(pos))
      alreadyReplaced.add(pos);
      gameText = gameText.replace(gameText.charAt(pos), '_');
    }
    return gameText.replace(/.{1}(?=(.{1})+$)/g, '$& ');
  }


  startTimer() {
    this.timer = setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
      } else {
        this.timerSeconds = 0;
        clearInterval(this.timer);
      }
    }, 1000)
  }

  playAudio(path: string) {
    let audio = new Audio();
    audio.src = path;
    audio.load();
    audio.play();
  }
}


