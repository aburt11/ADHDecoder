import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ADHDecoderPage } from './adhdecoder.page';

describe('ADHDecoderPage', () => {
  let component: ADHDecoderPage;
  let fixture: ComponentFixture<ADHDecoderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ADHDecoderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ADHDecoderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
