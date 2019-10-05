import * as P from "pixi.js";
import { GameObject } from "../engine/gameObject";

type ApplicationOptions = NonNullable<
  ConstructorParameters<typeof P.Application>[0]
>;

export default class Game {
  private readonly _pixi: P.Application;
  private readonly _gameObjects: GameObject[];

  public get pixi() {
    return this._pixi;
  }

  constructor(props?: ApplicationOptions) {
    this._pixi = new P.Application({
      width: 1280,
      height: 720,
      backgroundColor: 0x311054,
      ...props
    });

    this._gameObjects = [];

    this._pixi.ticker.add(this.update);
  }

  public registerGameObject(gameObject: GameObject) {
    const displayObject = gameObject.init({ pixi: this._pixi });
    if (displayObject) {
      this._pixi.stage.addChild(displayObject);
    }

    this._gameObjects.push(gameObject);
  }

  private update = (delta: number) => {
    for (const gameObject of this._gameObjects) {
      gameObject.update({ pixi: this._pixi, delta });
    }
  };
}
