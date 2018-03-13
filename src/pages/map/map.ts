import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpService } from '../../services/http';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnInit{
  lat: number = 15.554725; 
  lng: number = 86.382633;
  Url: string = "../assets/icon/ldpi.png";
  zoom: number = 4;
  lists = [];
  selected: string = "1";
  selectedPlace = [];
  selectedWild = [];
  selectedLocation = {
    lat: 3.1390,
    lng: 101.6869
  };
  selectedCulture = [];
  constructor(private navCtrl: NavController, private navParams: NavParams, private http: HttpService, private loadingCtrl: LoadingController) {
  
  }

  ngOnInit(){
    this.http.getCoord().subscribe((list)=>{
      for(let i = 0; i < list.coord.length; i++){
        if(i != list.coord.length - 1 ){
          this.lists.push({lat1: parseFloat(list.coord[i].lat), lng1: parseFloat(list.coord[i].long), lat2: parseFloat(list.coord[i+1].lat), lng2: parseFloat(list.coord[i+1].long)});
        } else {
          this.lists.push({lat1: parseFloat(list.coord[i].lat), lng1: parseFloat(list.coord[i].long), lat2: parseFloat(list.coord[i].lat), lng2: parseFloat(list.coord[i].long)});
        }
      }
    })

    this.http.getData("kl").subscribe((list)=>{
      const temp = list.data;
      this.selectedPlace = temp.place;
      this.selectedWild = temp.wildlife;
      this.selectedLocation = temp.pinPoint;
      this.selectedCulture = temp.culture;
    })
  }

  onChange(selected: string){
    const loading = this.loadingCtrl.create({
      content: "Please Wait..."
    })
    loading.present();
    if(selected == "1"){
      this.http.getData("kl").subscribe((list)=>{
        const temp = list.data;
        this.selectedPlace = temp.place;
        this.selectedWild = temp.wildlife;
        this.selectedLocation = temp.pinPoint;
        this.selectedCulture = temp.culture;
        loading.dismiss();
      },err=>{
        this.restoreDefault();
        loading.dismiss();
      });
    } else if(selected == "3"){
      this.http.getData("db").subscribe((list)=>{
        const temp = list.data;
        this.selectedPlace = temp.place;
        this.selectedWild = temp.wildlife;
        this.selectedLocation = temp.pinPoint;
        this.selectedCulture = temp.culture;
        loading.dismiss();
      },err=>{
        this.restoreDefault();
        loading.dismiss();
      });
    } else {
      this.http.getData("in").subscribe((list)=>{
        const temp = list.data;
        this.selectedPlace = temp.place;
        this.selectedWild = temp.wildlife;
        this.selectedLocation = temp.pinPoint;
        this.selectedCulture = temp.culture;
        loading.dismiss();
      },err=>{
        this.restoreDefault();
        loading.dismiss();
      });
    }
  }

  restoreDefault(){
    this.selectedPlace = [];
    this.selectedWild = [];
    this.selectedLocation = {
      lat: 3.1390,
      lng: 101.6869
    };
    this.selectedCulture = [];
  }

  onCamera(){
    window.open("http://192.168.43.133:8080/");
  }
}
