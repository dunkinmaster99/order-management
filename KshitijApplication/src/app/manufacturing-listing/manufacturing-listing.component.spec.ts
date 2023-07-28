import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingListingComponent } from './manufacturing-listing.component';

describe('ManufacturingListingComponent', () => {
  let component: ManufacturingListingComponent;
  let fixture: ComponentFixture<ManufacturingListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturingListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
