import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'queries',
  templateUrl: './queries.page.html',
  styleUrls: ['./queries.page.scss'],
})
export class QueriesPage implements OnInit {
  dynamicColor: any;
  constructor() {
    this.dynamicColor = 'orange';
  }

  ngOnInit() {
  }

}
