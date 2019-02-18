import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { Heroe } from 'src/app/interfaces/heroe.inteface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes:Heroe[];
  public loading:boolean = true;

  constructor(private _heroesService:HeroesService) {

    this._heroesService.getHeroes()
    .subscribe(data => {

      console.log(data);
      //this.loading = false;

      setTimeout(()=> {
        this.heroes = data;
        this.loading = false;

      },3000);

    });

  }

  ngOnInit() {
  }

  eliminar(key:string){

    this._heroesService.eliminar(key)
          .subscribe(res => {

            if(res)
              console.error(res);
            else
              delete this.heroes[key];
              

            
            // success ===> res = null

          });
    

  }

}
