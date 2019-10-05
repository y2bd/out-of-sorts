import * as P from "pixi.js";
import { GameObject, InitProps, UpdateProps } from "../engine/gameObject";
import Board from "./board";

class Root implements GameObject {
  private _container: P.Container = new P.Container();

  private _board!: Board;

  public get displayObject() {
    return this._container;
  }

  public init(props: InitProps) {
    this._board = new Board();
    this._board.init(props);

    this._container.addChild(this._board.displayObject);
    return this._container;
  }

  public update(props: UpdateProps) {
    this._board.update(props);
  }
}

export default Root;
