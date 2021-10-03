import { BehaviorSubject } from 'rxjs';

export class Generator {
  public readonly subject$ = new BehaviorSubject<number>(0);
}
