import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTeamsPageComponent } from './other-teams-page.component';

describe('OtherTeamsPageComponent', () => {
  let component: OtherTeamsPageComponent;
  let fixture: ComponentFixture<OtherTeamsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherTeamsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherTeamsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
