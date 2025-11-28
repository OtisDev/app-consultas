import { Injectable ,signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService<T> {

  private _state = signal<T | null>(null);
  private _view = signal<string>("");

  // getter signal (se usa en el template con state())
  state = this._state.asReadonly();
  view = this._view.asReadonly();

  // actualizar el valor
  set(value: T) {
    this._state.set(value);
  }

  setView(value: string) {
    this._view.set(value);
  }

  // obtener el valor actual (no reactivo)
  get(): T | null {
    return this._state();
  }

  // resetear el valor
  clear() {
    this._state.set(null);
  }

}
