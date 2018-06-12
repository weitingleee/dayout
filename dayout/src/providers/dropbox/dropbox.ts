import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the DropboxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Dropbox {
  accessToken: any;
  folderHistory: any = [];

  constructor(public http: HttpClient) {
    console.log('Hello DropboxProvider Provider');
  }

setAccessToken(token) {
    this.accessToken = token;
  }
 
  getUserInfo(){
    let headers = new Headers();
  
    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/json');
  
    return this.http.post('https://api.dropboxapi.com/2-beta-2/users/get_current_account', "null", {headers: headers})
      .map(res => res.json()); 
  }
 
  getFolders(path?){
 
  let headers = new Headers();
 
  headers.append('Authorization', 'Bearer ' + this.accessToken);
  headers.append('Content-Type', 'application/json');
 
  let folderPath;
 
  if(typeof(path) == "undefined" || !path){
 
    folderPath = {
      path: ""
    };   
 
  } else {
 
    folderPath = {
      path: path
    };
 
    if(this.folderHistory[this.folderHistory.length - 1] != path){
      this.folderHistory.push(path);
    }
 
  }
 
  return this.http.post('https://api.dropboxapi.com/2-beta-2/files/list_folder', JSON.stringify(folderPath), {headers: headers})
    .map(res => res.json()); 
  }
 
  goBackFolder(){
   if(this.folderHistory.length > 0){
 
    this.folderHistory.pop();
    let path = this.folderHistory[this.folderHistory.length - 1];
 
    return this.getFolders(path);
  }
  else {
    return this.getFolders();
  }
  }

}
