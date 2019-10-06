import * as P from "pixi.js";
import { GameObject, UpdateProps, InitProps } from "../engine/gameObject";
import Cell from "./cell";
import {
  CellState as CS,
  removeRight,
  removeLeft,
  removeDown,
  removeUp,
  addRight,
  addDown,
  addUp,
  addLeft,
  CellState,
  isSpecial
} from "./cell.state";
import { CellWidth, CellHeight } from "./cell.common";
import { BoardRows, BoardColumns } from "./board.common";
import Train, { TrainCar } from "./train";
import Input, { Key } from "../engine/input";

export enum BoardState {
  Empty,
  Track
}

const milaStart = [5, 2];
const simonStart = [5, 15];

class Board implements GameObject {
  private _container: P.Container = new P.Container();
  private _cells: Cell[][] = [];

  private _trains: Train[] = [];

  private _input: Input = new Input();

  public get displayObject() {
    return this._container;
  }

  public init(props: InitProps) {
    this._container.interactiveChildren = true;
    this._container.x =
      props.pixi.view.width / 2 - (BoardColumns * CellWidth) / 2;
    this._container.y =
      props.pixi.view.height / 2 - (BoardRows * CellHeight) / 2;

    for (let r = 0; r < BoardRows; r++) {
      this._cells[r] = [];
      for (let c = 0; c < BoardColumns; c++) {
        const cellState = ((): CellState => {
          const [mr, mc] = milaStart;
          const [sr, sc] = simonStart;

          if (r === mr && c === mc) {
            return CS.MilaHouse;
          } else if (r === sr && c === sc) {
            return CS.SimonHouse;
          } else if (r === 5 && c === 9) {
            return CS.RedFilter;
          } else {
            return CS.Empty;
          }
        })();

        const cell = new Cell(cellState, () => this._toggleCell(r, c));
        cell.init(props);

        cell.displayObject.x = c * CellWidth;
        cell.displayObject.y = r * CellHeight;

        this._container.addChild(cell.displayObject);
        this._cells[r].push(cell);
      }
    }
  }

  public update(updateProps: UpdateProps) {
    this._input.update();

    for (let r = 0; r < BoardRows; r++) {
      for (let c = 0; c < BoardColumns; c++) {
        this._cells[r][c].update(updateProps);
      }
    }

    for (const train of this._trains) {
      train.update(updateProps);
    }

    if (this._input.released(Key.Space)) {
      this._addTestTrain(updateProps);
    }
  }

  private _toggleCell(row: number, col: number) {
    const up = this._getCell(row - 1, col);
    const left = this._getCell(row, col - 1);
    const down = this._getCell(row + 1, col);
    const right = this._getCell(row, col + 1);
    const center = this._getCell(row, col);

    if (!center) {
      console.error("Wait, you toggled a cell that doesn't exist", row, col);
      return;
    }

    if (center.cellState !== CS.Empty) {
      if (isSpecial(center.cellState)) {
        return;
      }

      if (left) {
        left.cellState = removeRight(left.cellState);
      }

      if (right) {
        right.cellState = removeLeft(right.cellState);
      }

      if (up) {
        up.cellState = removeDown(up.cellState);
      }

      if (down) {
        down.cellState = removeUp(down.cellState);
      }

      center.cellState = CS.Empty;
    } else {
      if (left) {
        const newLeft = addRight(left.cellState);
        const newCenter = addLeft(center.cellState, true);
        if (
          (newLeft !== left.cellState || isSpecial(newLeft)) &&
          newCenter !== center.cellState
        ) {
          left.cellState = newLeft;
          center.cellState = newCenter;
        }
      }

      if (right) {
        const newRight = addLeft(right.cellState);
        const newCenter = addRight(center.cellState, true);
        if (
          (newRight !== right.cellState || isSpecial(newRight)) &&
          newCenter !== center.cellState
        ) {
          right.cellState = newRight;
          center.cellState = newCenter;
        }
      }

      if (up) {
        const newUp = addDown(up.cellState);
        const newCenter = addUp(center.cellState, true);
        if (
          (newUp !== up.cellState || isSpecial(newUp)) &&
          newCenter !== center.cellState
        ) {
          up.cellState = newUp;
          center.cellState = newCenter;
        }
      }

      if (down) {
        const newDown = addUp(down.cellState);
        const newCenter = addDown(center.cellState, true);
        if (
          (newDown !== down.cellState || isSpecial(newDown)) &&
          newCenter !== center.cellState
        ) {
          down.cellState = newDown;
          center.cellState = newCenter;
        }
      }

      if (center.cellState === CS.Empty) {
        center.cellState = CS.Solo;
      }
    }
  }

  private _getCell(row: number, col: number): Cell | undefined {
    return this._cells[row] != null ? this._cells[row][col] : undefined;
  }

  private _getBoard(): CellState[][] {
    return this._cells.map(cr => cr.map(c => c.cellState));
  }

  private _addTestTrain(props: InitProps) {
    const testTrain = new Train(
      [TrainCar.Red, TrainCar.Red, TrainCar.Blue, TrainCar.Red, TrainCar.Red],
      this._getBoard(),
      5,
      2
    );
    testTrain.init(props);
    this._container.addChild(testTrain.displayObject);
    this._trains.push(testTrain);
  }
}

export default Board;
