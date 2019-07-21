import { Component, OnInit, ViewChild } from '@angular/core';
import QrcodeDecoder from 'qrcode-decoder';
import * as $ from 'jquery';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public static myimg;
  public static v;
  public static qr;

  fImg;

  result = null;

  constructor() { }
  ngAfterViewInit() {
    // console.log("sadhasjdh");
    window.myvar = this;
    // this.result = window['myvar'];
    window.onload = (ev) => {
      HomeComponent.v = document.querySelector("#vid");
      HomeComponent.myimg = document.querySelector("#myimg");
      HomeComponent.qr = new QrcodeDecoder();
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(res => {
          console.log(res);
          HomeComponent.v['srcObject'] = res;
          // v.play();
          requestAnimationFrame(HomeComponent.checkVideo);
        }, err => {
          console.log(err);
        });
    };

  }
  ngOnInit() {

  }

  filePicked(ev) {
    let files = ev.target.files;
    if (files.length < 1) {

    } else {
      let file = files[0];
      console.log(file);
      if (/image/.test((file.type).toLowerCase())) {
        HomeComponent.myimg.src = URL.createObjectURL(file);
        HomeComponent.myimg.onload = () => {
          HomeComponent.qr.decodeFromImage(HomeComponent.myimg)
            .then((res) => {
              if (res && res['data'] != "") {
                console.log(res);
                alert(res.data);
                window.myvar.result = res.data;
              }
            });
        };
      } else {
        // console.log("It is not a image");
      }
    }
  }

  static checkVideo() {
    if (HomeComponent.v.readyState === HomeComponent.v.HAVE_ENOUGH_DATA) {

      HomeComponent.qr.decodeFromVideo(HomeComponent.v)
        .then((res) => {
          if (res && res['data'] != "") {
            HomeComponent.v.classList.add("swing");
            setTimeout(() => {
              HomeComponent.v.classList.remove("swing");
            }, 1200);
            console.log(res);
            // alert(res.data);
            window.myvar.result = res.data;
          }
        });
    }
    // console.log(this);
    requestAnimationFrame(HomeComponent.checkVideo);
  }



}