import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntitutionDetailPage } from './intitution-detail.page';

describe('IntitutionDetailPage', () => {
  let component: IntitutionDetailPage;
  let fixture: ComponentFixture<IntitutionDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntitutionDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntitutionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
