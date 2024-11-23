import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinePointsModalComponent } from './define-points-modal.component';

describe('DefinePointsModalComponent', () => {
  let component: DefinePointsModalComponent;
  let fixture: ComponentFixture<DefinePointsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefinePointsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefinePointsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
