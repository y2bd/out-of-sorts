import * as P from "pixi.js";
import { GameObject, InitProps, UpdateProps } from "../engine/gameObject";
import {
  CellState,
  removeLeft,
  removeUp,
  removeDown,
  removeRight
} from "./cell.state";
import { redTrainTexture, blueTrainTexture } from "./train.texture";
import Board from "./board";
import { CellWidth, CellHeight } from "./cell.common";
import { dist, sign } from "../util";

export enum TrainCar {
  Red,
  Blue,
  Gold
}

export enum MoveDirection {
  Up,
  Down,
  Left,
  Right,
  None
}

class Train implements GameObject {
  public static MoveSpeed = 3;
  public static TrainCarDelay = 12;

  public get displayObject() {
    return this._container;
  }

  private _container!: P.Container;

  private _trainSprites!: P.Sprite[];
  private _trainTargets!: [number, number][];

  private _textureMap!: Record<TrainCar, P.Texture>;

  private _trainCarTimer = 0;
  private _trainCarCount = 1;

  private _consumedAtJunction = false;
  private _leaderShouldFollow = false;

  private _trainDecisionQueues: [number, number, boolean][][] = [];

  public constructor(
    private readonly _trainCars: TrainCar[],
    private readonly _board: CellState[][],
    private readonly _startRow: number,
    private readonly _startCol: number
  ) {}

  init(props: InitProps) {
    const { renderer } = props.pixi;
    this._textureMap = {
      [TrainCar.Red]: redTrainTexture(renderer),
      [TrainCar.Blue]: blueTrainTexture(renderer)
    } as Record<TrainCar, P.Texture>;

    this._trainSprites = this._trainCars.map(car => {
      const sprite = new P.Sprite(this._textureMap[car]);
      sprite.x = this._startCol * CellWidth + CellWidth / 4;
      sprite.y = this._startRow * CellHeight + CellHeight / 4;
      return sprite;
    });

    this._trainTargets = this._trainCars.map(() => [
      this._startRow,
      this._startCol + 1
    ]);

    this._trainDecisionQueues = this._trainCars.map(() => []);

    this._container = new P.Container();
    this._container.addChild(...this._trainSprites);
  }

  update(props: UpdateProps) {
    const delta = Math.min(1, props.delta);

    this._trainCarTimer += delta;
    if (this._trainCarTimer > Train.TrainCarDelay) {
      this._trainCarTimer = 0;
      this._trainCarCount = Math.min(
        this._trainTargets.length,
        this._trainCarCount + 1
      );
    }

    let consumeHead = false;
    this._trainTargets.forEach(([tr, tc], i) => {
      if (i + 1 > this._trainCarCount) {
        return;
      }

      if (tr === -1 && tc === -1) {
        return;
      }

      const trainCar = this._trainCars[i];
      const sprite = this._trainSprites[i];
      const [mx, my, lastMoveDir, hitTarget, tx, ty] = this._move(
        delta,
        sprite.x,
        sprite.y,
        tr,
        tc
      );

      sprite.x += mx;
      sprite.y += my;

      if (hitTarget) {
        sprite.x = tx;
        sprite.y = ty;

        let nextDecision: [number, number, boolean];

        if (i === 0 && !this._leaderShouldFollow) {
          this._trainDecisionQueues[i].shift();
          const [nr, nc, consumed] = this._getNewTarget(
            tr,
            tc,
            lastMoveDir,
            trainCar
          );
          nextDecision = [nr, nc, consumed];
          this._trainDecisionQueues.forEach(queue => queue.push(nextDecision));
        } else {
          if (i === 0 && this._leaderShouldFollow) {
            this._leaderShouldFollow = false;
          }

          nextDecision = this._trainDecisionQueues[i].shift()!;
          if (nextDecision === undefined) {
            debugger;
          }
        }

        const nextTarget = [nextDecision[0], nextDecision[1]] as [
          number,
          number
        ];
        const consumed = nextDecision[2];
        this._trainTargets[i] = nextTarget;

        if (consumed && !this._consumedAtJunction && i === 0) {
          console.log("consumed");
          this._consumedAtJunction = true;
          this._leaderShouldFollow = true;
          consumeHead = true;
          if (this._trainDecisionQueues[1]) {
            debugger;
            this._trainDecisionQueues[1].push(nextDecision);
          }
        }

        if (consumed && i === this._trainCars.length - 1) {
          console.log("finished");
          this._consumedAtJunction = false;
        }
      }
    });

    if (consumeHead) {
      this._trainSprites.shift();
      this._trainTargets.shift();
      this._trainCars.shift();
      this.displayObject.removeChildAt(0);

      const lastLeader = this._trainDecisionQueues.shift()!;
      this._trainDecisionQueues[0] = lastLeader;
      console.log("removed", this._trainSprites.length);
    }
  }

  private _move(
    dt: number,
    x: number,
    y: number,
    tr: number,
    tc: number
  ): [number, number, MoveDirection, boolean, number, number] {
    dt = Math.min(1, dt);

    const tx = tc * CellWidth + CellWidth / 4;
    const ty = tr * CellHeight + CellHeight / 4;

    const sx = sign(tx - x);
    const sy = sign(ty - y);

    const mx = Train.MoveSpeed * sx * dt;
    const my = Train.MoveSpeed * sy * dt;

    const moveDir = (() => {
      if (sx > 0) return MoveDirection.Right;
      if (sx < 0) return MoveDirection.Left;
      if (sy < 0) return MoveDirection.Up;
      if (sy > 0) return MoveDirection.Down;

      return MoveDirection.None;
    })();

    if (dist(x, tx) < 5 && dist(y, ty) < 5) {
      return [mx, my, moveDir, true, tx, ty];
    } else {
      return [mx, my, moveDir, false, tx, ty];
    }
  }

  private _getNewTarget(
    tr: number,
    tc: number,
    lastMoveDir: MoveDirection,
    trainCar: TrainCar
  ): [number, number, boolean] {
    let targetCell = this._board[tr][tc];
    let newTarget = [-1, -1] as [number, number];

    if (targetCell === CellState.RedFilter) {
      if (
        trainCar === TrainCar.Red &&
        this._board[tr][tc + 1] !== removeLeft(this._board[tr][tc + 1])
      ) {
        return [tr, tc + 1, true];
      } else {
        return [tr + 1, tc, false];
      }
    }

    if (lastMoveDir === MoveDirection.Left) {
      // if removing does something, that means it has that component
      if (targetCell !== removeLeft(targetCell)) {
        newTarget = [tr, tc - 1];
      }
      if (targetCell !== removeUp(targetCell)) {
        newTarget = [tr - 1, tc];
      }
      if (targetCell !== removeDown(targetCell)) {
        newTarget = [tr + 1, tc];
      }
    }
    if (lastMoveDir === MoveDirection.Right) {
      // if removing does something, that means it has that component
      if (targetCell !== removeRight(targetCell)) {
        newTarget = [tr, tc + 1];
      }
      if (targetCell !== removeUp(targetCell)) {
        newTarget = [tr - 1, tc];
      }
      if (targetCell !== removeDown(targetCell)) {
        newTarget = [tr + 1, tc];
      }
    }
    if (lastMoveDir === MoveDirection.Up) {
      // if removing does something, that means it has that component
      if (targetCell !== removeLeft(targetCell)) {
        newTarget = [tr, tc - 1];
      }
      if (targetCell !== removeRight(targetCell)) {
        newTarget = [tr, tc + 1];
      }
      if (targetCell !== removeUp(targetCell)) {
        newTarget = [tr - 1, tc];
      }
    }
    if (lastMoveDir === MoveDirection.Down) {
      // if removing does something, that means it has that component
      if (targetCell !== removeLeft(targetCell)) {
        newTarget = [tr, tc - 1];
      }
      if (targetCell !== removeRight(targetCell)) {
        newTarget = [tr, tc + 1];
      }
      if (targetCell !== removeDown(targetCell)) {
        newTarget = [tr + 1, tc];
      }
    }
    return [...newTarget, false] as any;
  }
}

export default Train;
