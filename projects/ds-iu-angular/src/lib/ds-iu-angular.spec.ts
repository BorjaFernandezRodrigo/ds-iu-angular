import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsIuAngular } from './ds-iu-angular';

describe('DsIuAngular', () => {
  let component: DsIuAngular;
  let fixture: ComponentFixture<DsIuAngular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsIuAngular]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsIuAngular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
