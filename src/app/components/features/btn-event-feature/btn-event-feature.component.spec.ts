import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnEventFeatureComponent } from './btn-event-feature.component';

describe('BtnEventFeatureComponent', () => {
  let component: BtnEventFeatureComponent;
  let fixture: ComponentFixture<BtnEventFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnEventFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnEventFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
