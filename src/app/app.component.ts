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
      "game": "missing"
    },
    {
      "name": "Herrera Kramer",
      "santa": "Kramer Herrera",
      "game": "missing"
    },
    {
      "name": "Jillian Wiley",
      "santa": "Wiley Jillian",
      "game": "missing"
    },
    {
      "name": "Mccarty George",
      "santa": "George Mccarty",
      "game": "missing"
    },
    {
      "name": "Herring West",
      "santa": "West Herring",
      "game": "missing"
    },
    {
      "name": "Camacho Casey",
      "santa": "Casey Camacho",
      "game": "missing"
    },
    {
      "name": "Susie Wright",
      "santa": "Wright Susie",
      "game": "missing"
    },
    {
      "name": "Sweet Fisher",
      "santa": "Fisher Sweet",
      "game": "missing"
    },
    {
      "name": "Imelda Arnold",
      "santa": "Arnold Imelda",
      "game": "missing"
    },
    {
      "name": "Lena Stein",
      "santa": "Stein Lena",
      "game": "missing"
    },
    {
      "name": "Suzette Snyder",
      "santa": "Snyder Suzette",
      "game": "scrambled"
    },
    {
      "name": "Ava Rojas",
      "santa": "Rojas Ava",
      "game": "scrambled"
    },
    {
      "name": "Moran Decker",
      "santa": "Decker Moran",
      "game": "scrambled"
    },
    {
      "name": "Mandy Davidson",
      "santa": "Davidson Mandy",
      "game": "scrambled"
    },
    {
      "name": "Leona Fitzgerald",
      "santa": "Fitzgerald Leona",
      "game": "scrambled"
    },
    {
      "name": "Tabitha Spencer",
      "santa": "Spencer Tabitha",
      "game": "scrambled"
    },
    {
      "name": "Lopez Mckee",
      "santa": "Mckee Lopez",
      "game": "scrambled"
    },
    {
      "name": "Alisa Mcgowan",
      "santa": "Mcgowan Alisa",
      "game": "missing"
    },
    {
      "name": "Magdalena Molina",
      "santa": "Molina Magdalena",
      "game": "missing"
    },
    {
      "name": "Kathleen Ballard",
      "santa": "Ballard Kathleen",
      "game": "missing"
    },
    {
      "name": "Maureen Flynn",
      "santa": "Flynn Maureen",
      "game": "scrambled"
    },
    {
      "name": "Regina Maxwell",
      "santa": "Maxwell Regina",
      "game": "scrambled"
    },
    {
      "name": "Ellison Hunter",
      "santa": "Hunter Ellison",
      "game": "missing"
    },
    {
      "name": "Adrienne Mccarthy",
      "santa": "Mccarthy Adrienne",
      "game": "missing"
    }
  ]

  chosenIndex: number = -1;


  sizeArray = ['xx-large', 'xxx-large', 'x-large', 'xx-large', 'xxx-large',];
  alignArray = ['flex-start', 'center', 'flex-end'];
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
      name.setAttribute('style', 'font-size:' + this.sizeArray[Math.floor(Math.random() * 5)] +
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

    if (santaObj?.game == "missing") {
      return this.getMissing(santaObj?.santa.split(' ')[0].toUpperCase()) + '\xa0\xa0\xa0\xa0' + this.getMissing(santaObj?.santa.split(' ')[1]?.toUpperCase());
    } else if (santaObj?.game == "scrambled") {
      return this.getScrambled(santaObj?.santa.split(' ')[0].toUpperCase()) + ' ' + this.getScrambled(santaObj?.santa.split(' ')[1]?.toUpperCase());
    }
    return "";
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


