import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickmathsPage } from './quickmaths.page';

describe('QuickmathsPage', () => {
  let component: QuickmathsPage;
  let fixture: ComponentFixture<QuickmathsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickmathsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickmathsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
