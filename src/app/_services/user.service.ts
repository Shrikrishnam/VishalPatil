import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    public static BaseUrl = "http://localhost:6565/";

    constructor(private http: Http) { }
    postfitnessdata(data){
      return this.http.post(UserService.BaseUrl+'allfriends',data,httpOptions).pipe(map((response: Response) => response.json()));
    }
    getfitnessdata() {
      return this.http.get(UserService.BaseUrl+'allfriends',httpOptions).pipe(map((response: Response) => response.json()));
    }
    deletefitnessdata(id) {
      return this.http.delete(UserService.BaseUrl+'allfriends/'+id,httpOptions).pipe(map((response: Response) => response.json()));
    }
    updatefitnessdata(data) {
      return this.http.put(UserService.BaseUrl+'allfriends/'+data.id,data,httpOptions).pipe(map((response: Response) => response.json()));
    }
    postcontactdata(data){
      return this.http.post(UserService.BaseUrl+'contact',data,httpOptions).pipe(map((response: Response) => response.json()));
    }
    getdata(id) {
      return this.http.get(UserService.BaseUrl+'allfriends/'+id,httpOptions).pipe(map((response: Response) => response.json()));
    }
}