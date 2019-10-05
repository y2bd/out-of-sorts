import * as P from "pixi.js";

export interface InitProps {
  readonly pixi: P.Application;
}

export interface UpdateProps {
  readonly pixi: P.Application;
  readonly delta: number;
}

export interface GameObject {
  readonly displayObject: P.DisplayObject;

  init(props: InitProps): P.DisplayObject | void;
  update(props: UpdateProps): void;
}
