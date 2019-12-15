import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminTasksPage } from './admin-tasks.page';

describe('AdminTasksPage', () => {
  let component: AdminTasksPage;
  let fixture: ComponentFixture<AdminTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTasksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
