import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  title = 'storage-app';

  constructor(private primeNgConfig: PrimeNGConfig){

  }

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }
}


