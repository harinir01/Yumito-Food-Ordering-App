import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidpageComponent } from './invalidpage.component';

describe('InvalidpageComponent', () => {
  let component: InvalidpageComponent;
  let fixture: ComponentFixture<InvalidpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
