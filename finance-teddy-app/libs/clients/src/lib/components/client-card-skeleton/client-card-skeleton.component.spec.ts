import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientCardSkeletonComponent } from './client-card-skeleton.component';

describe('ClientCardSkeletonComponent', () => {
  let component: ClientCardSkeletonComponent;
  let fixture: ComponentFixture<ClientCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCardSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
