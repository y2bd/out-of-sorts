enum KeyState {
  Unpressed = 0,
  JustDown,
  PastDown,
  Pressed,
  JustUp,
  PastUp
}

export enum Key {
  Up = "ArrowUp",
  Left = "ArrowLeft",
  Down = "ArrowDown",
  Right = "ArrowRight",

  Z = "KeyZ",
  X = "KeyX",

  A = "KeyA",
  S = "KeyS",
  D = "KeyD",
  W = "KeyW",
  J = "KeyJ",
  K = "KeyK"
}

class Input {
  private _currentlyDown: Record<string, KeyState>;
  private _lastPressed: string;

  constructor() {
    document.addEventListener("keydown", this._onKeyDown);
    document.addEventListener("keyup", this._onKeyUp);

    this._currentlyDown = {};
    this._lastPressed = "";
  }

  /**
   * update should be called at the beginning of your update loop.
   */
  public update() {
    for (const key of Object.keys(this._currentlyDown)) {
      if (
        this._currentlyDown[key] &&
        this._currentlyDown[key] !== KeyState.Unpressed &&
        this._currentlyDown[key] !== KeyState.Pressed
      ) {
        this._currentlyDown[key] = (this._currentlyDown[key] + 1) % 6;
      }
    }
  }

  public down(key: string) {
    return (
      this._currentlyDown[key] === KeyState.JustDown ||
      this._currentlyDown[key] === KeyState.PastDown ||
      this._currentlyDown[key] === KeyState.Pressed
    );
  }

  public up(key: string) {
    return !this.down(key);
  }

  public pressed(key: string) {
    return (
      this._currentlyDown[key] === KeyState.JustDown ||
      this._currentlyDown[key] === KeyState.PastDown
    );
  }

  public released(key: string) {
    return (
      this._currentlyDown[key] === KeyState.JustUp ||
      this._currentlyDown[key] === KeyState.PastUp
    );
  }

  public lastPressed(): string {
    return this._lastPressed;
  }

  private _onKeyDown = (keyEvent: KeyboardEvent) => {
    // prevent repeat-rate
    if (!this.down(keyEvent.code)) {
      this._currentlyDown[keyEvent.code] = KeyState.JustDown;
      this._lastPressed = keyEvent.code;
    }
  };

  private _onKeyUp = (keyEvent: KeyboardEvent) => {
    this._currentlyDown[keyEvent.code] = KeyState.JustUp;
  };
}

export default Input;
