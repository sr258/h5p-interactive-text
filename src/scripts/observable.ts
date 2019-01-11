export interface IObserver {
  onChanged(caller: IObservable, propertyName: string): void;
}

export interface IObservable {
  registerObserver(observer: IObserver): void;
  unregisterObserver(observer: IObserver): void;
}
