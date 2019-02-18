import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroe.inteface';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesURL:string = "https://heroresapp-546.firebaseio.com/heroes.json";
  heroeURL:string = "https://heroresapp-546.firebaseio.com/heroes/";


  constructor(private http:HttpClient) { }

  nuevoHeroe(heroe:Heroe){

    let body:string = JSON.stringify(heroe);

    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.post(this.heroesURL, body, {headers})
    .pipe( map(res => {
      console.log(res);
      return res;

    }));


  }

  actualizarHeroe(heroe:Heroe, key$:string){

    let body:string = JSON.stringify(heroe);

    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    let urlHeroe = this.heroeURL+`${key$}.json`;

    return this.http.put(urlHeroe, body, {headers})
    .pipe( map(res => {
      console.log(res);
      return res;

    }));


  }


  getHeroe(key$:string){

    let url = this.heroeURL+`${key$}.json`;

    console.log("dentro");


    return this.http.get(url).pipe(map((res:any) => res));

  }


  getHeroes(){

    return this.http.get(this.heroesURL).pipe(map((res:any) => res));

  }

  eliminar(key:string){


    let url = this.heroeURL+"/"+key+".json";

     return this.http.delete(url);

  }




}//end service
