import {Component} from 'angular2/core';
import {CalenderService} from './services/calender.service';
declare var moment: any;
@Component({
    selector: 'my-app',
    templateUrl: 'dev/app.html',
    providers: [CalenderService]

})
export class AppComponent {
  //Service function params
  start_time:string;
  end_time:string;
  start_time_zone:string;
  end_time_zone:string;

  //Clock parameters
  miliseconds=0;
  seconds=0;
  minutes=0;
  hours=0;
  timerTokens: Array<number> = [];
  items: Array<number> = [this.hours,this.minutes,this.seconds,this.miliseconds];

  constructor(public calenderService: CalenderService){
    console.log(moment.tz.guess());
    this.start_time = moment().format('YYYY-MM-DDThh:mm:ss');
    this.start_time =this.start_time.concat('Z');
    console.log(this.start_time);
  }

  startCounting(){
    this.setStartParams();
    //I know this is horrible solution. I have 3 state checks
    //every milisecond. But I had animation issues where the
    //indicator moving faster.
    this.timerTokens.push(setInterval(() =>{
      (this.items[3]++);
      //console.log(this.items[3]%99);
      if(this.items[3]%99==0){
        //add to seconds
        this.items[2]++;
        //console.log(this.items[2]%60);
        if(this.items[2]%60==0){
          //add to mins
          this.items[1]++;
          //console.log(this.items[1]%60);
          if(this.items[1]%60==0){
            this.items[0]++;
            //console.log(this.items[0]%60);
          }
        }
      }
    }, 10));

  }
  stopCounting(){
    this.clearTimeTokens();
  }
  resetCounting(){
    this.setEndParams();
    this.calenderService.postTime(this.start_time,this.end_time,this.start_time_zone,this.end_time_zone)
    this.clearAll();
  }

  clearAll(){
    for (let i = 0; i < this.items.length; i++) {
        this.items[i]=0;
    }
    this.miliseconds = 0;
    console.log("all counters cleared")
    this.clearTimeTokens();

  }
  clearTimeTokens(){
    for (let i = 0; i < this.timerTokens.length; i++) {
        clearTimeout(this.timerTokens[i]);
    }
    console.log("all tokens cleared");
  }

  setStartParams(){
    this.start_time = moment().format('YYYY-MM-DDThh:mm:ss');
    this.start_time =this.start_time.concat('Z');
    this.start_time_zone = moment.tz.guess();
  }
  setEndParams(){
    this.end_time = moment().format('YYYY-MM-DDThh:mm:ss');
    this.end_time =this.end_time.concat('Z');
    this.end_time_zone = moment.tz.guess();
  }
}
