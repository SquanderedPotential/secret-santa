import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('namesDiv') namesDiv: ElementRef | undefined;
  constructor(private changeDetRef: ChangeDetectorRef) { }


  names = [
    {
      "name": "Corinneabcdefek Roman",
      "santa": "Roman",
      "hint": "They are this this and this"
    },
    {
      "name": "Herrera Kramer",
      "santa": "Kramer Herrera",
      "hint": ""
    },
    {
      "name": "Jillian Wiley",
      "santa": "Wiley Jillian",
      "hint": ""
    },
    {
      "name": "Mccarty George",
      "santa": "George Mccarty",
      "hint": ""
    },
    {
      "name": "Herring West",
      "santa": "West Herring",
      "hint": ""
    },
    {
      "name": "Camacho Casey",
      "santa": "Casey Camacho",
      "hint": "They are this this and this"
    },
    {
      "name": "Susie Wright",
      "santa": "Wright Susie",
      "hint": ""
    },
    {
      "name": "Sweet Fisher",
      "santa": "Fisher Sweet",
      "hint": ""
    },
    {
      "name": "Imelda Arnold",
      "santa": "Arnold Imelda",
      "hint": "They are this this and this"
    },
    {
      "name": "Lena Stein",
      "santa": "Stein Lena",
      "hint": ""
    },
    {
      "name": "Suzette Snyder",
      "santa": "Snyder Suzette",
      "hint": ""
    },
    {
      "name": "Ava Rojas",
      "santa": "Rojas Ava",
      "hint": "They are this this and this"
    },
    {
      "name": "Moran Decker",
      "santa": "Decker Moran",
      "hint": ""
    },
    {
      "name": "Mandy Davidson",
      "santa": "Davidson Mandy",
      "hint": ""
    },
    {
      "name": "Leona Fitzgerald",
      "santa": "Fitzgerald Leona",
      "hint": ""
    },
    {
      "name": "Tabitha Spencer",
      "santa": "Spencer Tabitha",
      "hint": "They are this this and this"
    },
    {
      "name": "Lopez Mckee",
      "santa": "Mckee Lopez",
      "hint": "They are this this and this"
    },
    {
      "name": "Alisa Mcgowan",
      "santa": "Mcgowan Alisa",
      "hint": ""
    },
    {
      "name": "Magdalena Molina",
      "santa": "Molina Magdalena",
      "hint": ""
    },
    {
      "name": "Kathleen Ballard",
      "santa": "Ballard Kathleen",
      "hint": ""
    },
    {
      "name": "Maureen Flynn",
      "santa": "Flynn Maureen",
      "hint": ""
    },
    {
      "name": "Regina Maxwell",
      "santa": "Maxwell Regina",
      "hint": ""
    },
    {
      "name": "Ellison Hunter",
      "santa": "Hunter Ellison",
      "hint": ""
    },
    {
      "name": "Adrienne Mccarthy",
      "santa": "Mccarthy Adrienne",
      "hint": "They are this this and this"
    }
  ]

  chosenIndex: number = -1;


  sizeArray = ['xx-large', 'xxx-large', 'x-large'];
  alignArray = ['flex-start', 'center', 'flex-end'];
  gameArray = ['missing', 'scrambled'];
  santaView = 'spoiler';
  timerHours = 0;
  timerMinutes = 0;
  timerSeconds = 0;
  gameText = "";
  timer:any;
  timeLeft: number = 30;



  ngOnInit(): void {

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
    this.names = this.names.filter((obj) => obj.name != this.names[this.chosenIndex]?.name);
    for (let i = 0; i < 20; i++) {
      this.chosenIndex = Math.floor(Math.random() * this.names.length);
      this.playAudio('../assets/sounds/tick.wav');
      await new Promise(f => setTimeout(f, 100));
    }
  }

  getGameText(santaObj: any) {
    if(!santaObj?.hint){
      let game = this.gameArray[Math.floor(Math.random()*2)];
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
      if(this.timerSeconds > 0) {
        this.timerSeconds--;
      } else {
        this.timerSeconds = 0;
        clearInterval(this.timer);
      }
    },1000)
  }

  playAudio(path: string){

    let audio = new Audio();

    audio.src = path;
    audio.load();
    audio.play();
  }
}


