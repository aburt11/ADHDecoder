import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedreaderPage } from './speedreader.page';

describe('SpeedreaderPage', () => {
  let component: SpeedreaderPage;
  let fixture: ComponentFixture<SpeedreaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedreaderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedreaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
