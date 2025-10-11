import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyFromImageComponent } from './reply-from-image.component';

describe('ReplyFromImageComponent', () => {
  let component: ReplyFromImageComponent;
  let fixture: ComponentFixture<ReplyFromImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyFromImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyFromImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
