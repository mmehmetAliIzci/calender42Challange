import {Inject,Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/observable/fromArray';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

const URL: string = 'https://demo.calendar42.com/api/v2/events/';
const TOKEN: string = '3c8da1482ffeea7a9c14f20cc512a8c83b805a0c';

@Injectable()
export class CalenderService  {

    constructor(public http: Http) {
    }

    postTime(start_time,end_time,start_time_zone,end_time_zone) {


      return new Promise(resolve => {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Token '+ TOKEN);

        let PAYLOAD = {
                      event_type: "normal",
                      title: "My Tracked time",
                      start: start_time,
                      start_timezone: start_time_zone,
                      end: end_time,
                      end_timezone: end_time_zone,
                      rsvp_status: "attending"
                  };
        let data = JSON.stringify(PAYLOAD);


       this.http.post(URL,data,{headers: headers})
       .map(res => res.json())
       .subscribe((response) => {
           // we've got back the raw data, now generate the core schedule data
           // and save the data for later reference
           console.log(response);
           resolve(response);
        },
        (error) => alert(error),
        () => alert("POST successfull finished")
      );
     });
   }

}
