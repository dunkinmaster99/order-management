import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryComponentComponent } from './try-component.component';

describe('TryComponentComponent', () => {
  let component: TryComponentComponent;
  let fixture: ComponentFixture<TryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TryComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
