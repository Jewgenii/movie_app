import { Directive, OnDestroy, } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Directive()
export class BaseObservableDirective implements OnDestroy {

  protected destroy$ = new Subject<void>();
  protected subscription: Subscription = new Subscription();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.subscription.unsubscribe();
  }


  protected catchError(err: any) {
    console.log(err);
  }
}
