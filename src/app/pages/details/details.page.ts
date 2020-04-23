import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  instName:any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    const sessionId = this.route.snapshot.paramMap.get('sessionId');

    this.instName = localStorage.getItem("InstName");
  }

}
