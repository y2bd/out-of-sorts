import * as P from "pixi.js";
import { GameObject, UpdateProps } from "./gameObject";

export default abstract class Stateful<State> implements GameObject {
  private _do: P.Text;
  private _state!: State;

  protected get state(): Readonly<State> {
    return this._state;
  }

  constructor() {
    this._do = new P.Text("Stateful");
  }

  public get displayObject() {
    return this._do;
  }

  public init() {}

  public update(props: UpdateProps) {
    const nextState = this.internalUpdate(this._state, props);

    for (const key of Object.keys(nextState) as (keyof State)[]) {
      this._state[key] = nextState[key]!;
    }
  }

  protected setInitialState(state: State) {
    this._state = state;
  }

  protected abstract internalUpdate(
    prevState: Readonly<State>,
    updateProps: UpdateProps
  ): Partial<State>;
}

export function stateful<State, Context>(args: {
  init: () => [State, Context];
  update: (
    prevState: State,
    updateProps: UpdateProps,
    context: Context
  ) => State;
}) {
  return class StatefulImpl extends Stateful<State> {
    private _context!: Context;

    public init() {
      const [state, context] = args.init();

      this._context = context;
      this.setInitialState(state);
    }

    public internalUpdate(
      prevState: State,
      updateProps: UpdateProps
    ): Partial<State> {
      return args.update(prevState, updateProps, this._context);
    }
  };
}
