import { Component, OnInit } from '@angular/core';
import jsQR from "jsqr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  scanSuccess(evt) {
    alert("Scan Success");
  }
  camerasNotFound(evt) {
    alert("Camera não encontrada.");
  }
}
