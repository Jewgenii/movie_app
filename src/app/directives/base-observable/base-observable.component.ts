import { Directive, OnDestroy, } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Directive()
export class BaseObservableDirective implements OnDestroy {

  private destroy$ = new Subject<void>();
  protected subscription = new Subscription();

  protected untilDestroyContext: <T>(obs: Observable<T>) => Observable<T>;

  constructor() {
    //invoke this this context
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

    this.subscription.unsubscribe();
  }



}
