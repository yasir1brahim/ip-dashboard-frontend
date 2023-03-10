import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProjectManagerComponent } from './project-project-manager.component';

describe('ProjectProjectManagerComponent', () => {
  let component: ProjectProjectManagerComponent;
  let fixture: ComponentFixture<ProjectProjectManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectProjectManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectProjectManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
