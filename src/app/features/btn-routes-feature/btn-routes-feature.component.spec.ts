import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnRoutesFeatureComponent } from './btn-routes-feature.component';

describe('BtnRoutesFeatureComponent', () => {
  let component: BtnRoutesFeatureComponent;
  let fixture: ComponentFixture<BtnRoutesFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnRoutesFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnRoutesFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
