import { Injectable } from '@angular/core';
import { Http , RequestOptions , Response , Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constant } from '../constant/Contant';

@Injectable()
export class TndTrainingHistoryService{

    // private serviceEndPoint;
    private phpServicePoint;
    constructor(private http:Http){
        // this.serviceEndPoint = Constant.tndBaseURL;
        this.phpServicePoint = Constant.phpServerURL;
    }

    applyFilter(sendJson: any) {
        // let headers = new Headers({'Content-Type':'application/json'});
        // headers.append("Access-Control-Allow-Origin", "*");
        // let options = new RequestOptions({ headers:headers });
        // return this.http.post(this.serviceEndPoint+"trainingHistroryFilterSearch",sendJson,options)
        //         .map((response:Response) => response.json())
        //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        let jsonData = JSON.stringify(sendJson);
        return this.http.post(this.phpServicePoint+'trainingHistroryFilterSearch.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getCertiDetails(viewedEmpId: any) {
        // let headers = new Headers({'Content-Type':'application/json'});
        // headers.append("Access-Control-Allow-Origin", "*");
        // let options = new RequestOptions({ headers:headers });
        // return this.http.get(this.serviceEndPoint+"getCertiDetails/"+viewedEmpId,options)
        //         .map((response:Response) => response.json())
        //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        return this.http.get(this.phpServicePoint+'getCertiDetails.php?empId='+viewedEmpId)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}