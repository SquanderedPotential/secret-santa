import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('namesDiv') namesDiv: ElementRef | undefined;
  names = [{"name":"Mohan Thirumaliah","santa":"Kiran Abhang"},{"name":"Ankit Choudhary","santa":"Rupinder Singh"},{"name":"Nishant Menaria","santa":"Nikita Khare"},{"name":"Nikita Khare","santa":"Amit Jain"},{"name":"Apurva Joshi","santa":"Rahul Shelke"},{"name":"Shwetali Dhumal","santa":"Tripur Patel"},{"name":"Natwar Singh","santa":"Ishan Sharma"},{"name":"Vanita Saxena","santa":"Pooja Kadam"},{"name":"Tripur Patel","santa":"Shwetali Dhumal"},{"name":"Tejas Pawar","santa":"Sandip Hade"},{"name":"Amruta Kasar","santa":"Sandesh Patil"},{"name":"Tanya Dutt","santa":"Saurav Khandagale"},{"name":"Tirthankar Kundu","santa":"Praveen J R"},{"name":"Sandesh Patil","santa":"Tanya Dutt"},{"name":"Sandip Hade","santa":"Natwar Singh"},{"name":"Nikita Marne","santa":"Amruta Kasar"},{"name":"Manish Choudhary","santa":"Mohan Thirumaliah"},{"name":"Amit Jain","santa":"Vanita Saxena"},{"name":"Praveen J R","santa":"Ankit Choudhary"},{"name":"Pooja Kadam","santa":"Tejas Pawar"},{"name":"Kuldeep Patel","santa":"Ayushi Dantulwar"},{"name":"Rahul Shelke","santa":"Nikita Marne"},{"name":"Ishan Sharma","santa":"Tirthankar Kundu"},{"name":"Rupinder Singh","santa":"Apurva Joshi"},{"name":"Kushal Devra","santa":"Nishant Menaria"},{"name":"Sagar Sahoo","santa":"Kushal Devra"},{"name":"Ayushi Dantulwar","santa":"Kuldeep Patel"},{"name":"Saurav Khandagale","santa":"Manish Choudhary"},{"name":"Sampada Nandanwar","santa":"Mithilesh Sutrave"},{"name":"Mithilesh Sutrave","santa":"Sagar Sahoo"},{"name":"Kiran Abhang","santa":"Pranjal Borhada"},{"name":"Vivek Bapardekar","santa":"Nikash Saxena"},{"name":"Pranjal Borhada","santa":"Vivek Bapardekar"},{"name":"Nikash Saxena","santa":"Sampada Nandanwar"}]
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

  constructor() { }

  ngOnInit(): void { }

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
      this.playAudio('../assets/sounds/tick.wav');
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
      this.playAudio('../assets/sounds/tick.wav');
      this.gameText = this.getGameText(this.names[this.chosenIndex]);
      this.santaView = "game";
      this.timerSeconds = 30;
      this.startTimer();
    }
    else if (this.santaView == "game") {
      this.playAudio('../assets/sounds/tada.wav')
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


