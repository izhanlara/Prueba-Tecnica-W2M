import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTitles } from './section-titles.component';

describe('SectionTitles', () => {
  let component: SectionTitles;
  let fixture: ComponentFixture<SectionTitles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTitles],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionTitles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
