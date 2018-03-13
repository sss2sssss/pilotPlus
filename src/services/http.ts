import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService{
    constructor(private http: Http){

    }

    getCoord(){
        return this.http.get('http://localhost:26000/getLocation')
        .map((response: Response) => {
            return response.json()
        });
    }

    getData(place: string){
        let body = '{"id":"'+place+'"}';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:26000/getData', JSON.parse(body), options)
        .map((response: Response) => {
            return response.json()
        });
    }
}