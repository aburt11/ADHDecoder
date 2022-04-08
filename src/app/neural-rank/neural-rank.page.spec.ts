import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuralRankPage } from './neural-rank.page';

describe('NeuralRankPage', () => {
  let component: NeuralRankPage;
  let fixture: ComponentFixture<NeuralRankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeuralRankPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeuralRankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
