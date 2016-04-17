import {Component} from 'angular2/core';


@Component({
    selector: 'my-app',
    templateUrl: 'dev/app.html'

})
export class AppComponent {
  seconds=0;
  minutes=0;
  hours=0;
  timerTokens: Array<number> = [];
  items: Array<number> = [this.hours,this.minutes,this.seconds];
  constructor(){}

  startCounting(){
    this.timerTokens.push(setInterval(() =>{
      (this.items[2]++)%10;
    }, 1000));
    this.timerTokens.push(setInterval(() =>{
      (this.items[1]++)%60;
    }, 60000));
    this.timerTokens.push(setInterval(() =>{
      (this.items[0]++)%99;
    }, 360000));
  }
  stopCounting(){
    this.clearTimeTokens();
  }
  resetCounting(){
    this.clearTimeTokens();
    this.clearAll();
  }

  clearAll(){
    for (let i = 0; i < this.items.length; i++) {
        this.items[i]=0;
    }
  }
  clearTimeTokens(){
    for (let i = 0; i < this.timerTokens.length; i++) {
        clearTimeout(this.timerTokens[i]);
    }
  }
}
