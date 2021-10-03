import { Component, Input } from '@angular/core';
import { Generator } from './generator.service';

@Component({
  selector: 'app-child',
  template: '<h4>Child component {{ index }}: {{ valueObs$ | async }}</h4>',
  providers: [ Generator ]
})
export class ChildComponent {
  readonly valueObs$ = this.generator.subject$.asObservable();

  @Input() index!: number;

  constructor(private readonly generator: Generator) {
  }
}
