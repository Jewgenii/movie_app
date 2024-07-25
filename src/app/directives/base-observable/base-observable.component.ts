import { Directive, OnDestroy, } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Directive()
export class BaseObservableDirective implements OnDestroy {

  private readonly destroy$ = new Subject<void>();
  protected readonly untilDestroyContext: <T>(obs: Observable<T>) => Observable<T>;

  constructor() {
    //invoke from current context
    this.untilDestroyContext = this.until.bind(this);
  }

  private until<T>(obs: Observable<T>): Observable<T> {
    return obs.pipe(takeUntil(this.destroy$));
  }

  protected catchError(err: any) {
    console.log(err);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
