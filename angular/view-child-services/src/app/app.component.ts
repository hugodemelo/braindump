import { AfterViewInit, ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { Generator } from './generator.service';
import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <app-child *ngFor="let i of [].constructor(5); let num = index"
               [index]=num>
    </app-child>
  `,
})
export class AppComponent implements AfterViewInit {

  @ViewChildren(Generator) services!: QueryList<Generator>;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    const functions = this.services.map(service => () => service.subject$.next(Math.random() * 100));
    from(functions)
      .pipe(
        concatMap(func => of(func).pipe(delay(100))),
      ).subscribe(func => func());
    // this.cdr.detectChanges();
  }
}
