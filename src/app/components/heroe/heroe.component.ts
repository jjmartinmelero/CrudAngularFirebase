import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from 'src/app/interfaces/heroe.inteface';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {


  heroe:Heroe = {

    nombre:"",
    bio: "",
    casa: "Marvel",

  }

  nuevo:boolean = false;
  id:string;

  constructor(private router:Router,private _heroeService:HeroesService,
                private activatedRoute:ActivatedRoute) {
                                            //SUSCRIBE  = OBSERVABLE
                  this.activatedRoute.params.subscribe(params => {

                    this.id = params['id']


                  if(this.id !== "nuevo")
                   this._heroeService.getHeroe(this.id).subscribe((heroe:Heroe) => this.heroe = heroe);

                  });

                 }

  ngOnInit() {


  }


  guardar(){

    console.log(this.heroe);

    if(this.id == "nuevo"){
      //insert


      this._heroeService.nuevoHeroe(this.heroe)
      .subscribe((data:any) => {

        this.router.navigate(['/heroe',data.name]);

      },
      error => {
        console.log('algo no mola');

      });



    }
    else {
      //update

      this._heroeService.actualizarHeroe(this.heroe, this.id)
      .subscribe((data:any) => {

        console.log(data);

      },
      error => {
        console.log('algo no mola');

      });



    }

  }


  agregarNuevo(form:NgForm){

  this.router.navigate(["/heroe", 'nuevo']);

  form.reset({
    casa:"Marvel"
  });//mandar un objeto si queremos algo por defecto


  }


}//end class
