import { Injectable } from '@angular/core';
import { Http , RequestOptions , Response , Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constant } from '../constant/Contant';

@Injectable()
export class TndNotificationService{
    // private serviceEndPoint;
    private phpServicePoint;
    constructor(private http:Http){
        // this.serviceEndPoint = Constant.tndBaseURL;
        this.phpServicePoint = Constant.phpServerURL;
    }

    public submitNotification(jsonData: any) {
        return this.http.post(this.phpServicePoint+'submitNotification.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        // let headers = new Headers({'Content-Type':'application/json'});
        // headers.append("Access-Control-Allow-Origin", "*");
        // let options = new RequestOptions({ headers:headers });
        // return this.http.post(this.serviceEndPoint+"submitNotification",sendJson,options)
        //         .map((response:Response) => response.json())
        //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}