import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModalComponent } from './create-modal.component';

describe('CreateRouteModalComponent', () => {
  let component: CreateModalComponent;
  let fixture: ComponentFixture<CreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
