import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomepaagePage } from './homepaage.page';

describe('HomepaagePage', () => {
  let component: HomepaagePage;
  let fixture: ComponentFixture<HomepaagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepaagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomepaagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
