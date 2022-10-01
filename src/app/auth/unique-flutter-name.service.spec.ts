import { TestBed } from '@angular/core/testing';

import { UniqueFlutterNameService } from './unique-flutter-name.service';

describe('UniqueFlutterNameService', () => {
  let service: UniqueFlutterNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueFlutterNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
