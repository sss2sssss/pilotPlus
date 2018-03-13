import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  destinationForm: FormGroup;

  constructor(private navCtrl: NavController) {

  }

  ngOnInit(){
    this.destinationForm = new FormGroup({
      'from': new FormControl('', Validators.required),
      'to': new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    this.navCtrl.push(MapPage);
  }
}
