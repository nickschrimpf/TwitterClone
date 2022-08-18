import { TestBed } from '@angular/core/testing';

import { NewTweetService } from './new-tweet.service';

describe('NewTweetService', () => {
  let service: NewTweetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewTweetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
