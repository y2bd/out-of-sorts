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
  addLeft
} from "./cell.state";
import { CellWidth, CellHeight } from "./cell.common";

export enum BoardState {
  Empty,
  Track
}

class Board implements GameObject {
  public static Rows = 16;
  public static Columns = 28;

  private _container: P.Container = new P.Container();
  private _cells: Cell[][] = [];

  public get displayObject() {
    return this._container;
  }

  public init(props: InitProps) {
    this._container.interactiveChildren = true;

    for (let r = 0; r < Board.Rows; r++) {
      this._cells[r] = [];
      for (let c = 0; c < Board.Columns; c++) {
        const cell = new Cell(CS.Empty, () => this._toggleCell(r, c));
        cell.init(props);

        cell.displayObject.x = c * CellWidth;
        cell.displayObject.y = r * CellHeight;

        this._container.addChild(cell.displayObject);
        this._cells[r].push(cell);
      }
    }
  }

  public update(updateProps: UpdateProps) {
    for (let r = 0; r < Board.Rows; r++) {
      for (let c = 0; c < Board.Columns; c++) {
        this._cells[r][c].update(updateProps);
      }
    }
  }

  private _toggleCell(row: number, col: number) {
    const up = this._getCell(row - 1, col);
    const left = this._getCell(row, col - 1);
    const down = this._getCell(row + 1, col);
    const right = this._getCell(row, col + 1);
    const center = this._getCell(row, col);

    console.log("clicked", row, col, up, left, down, right, center);

    if (!center) {
      console.error("Wait, you toggled a cell that doesn't exist", row, col);
      return;
    }

    if (center.cellState !== CS.Empty) {
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
        if (newLeft !== left.cellState && newCenter !== center.cellState) {
          left.cellState = newLeft;
          center.cellState = newCenter;
        }
      }

      if (right) {
        const newRight = addLeft(right.cellState);
        const newCenter = addRight(center.cellState, true);
        if (newRight !== right.cellState && newCenter !== center.cellState) {
          right.cellState = newRight;
          center.cellState = newCenter;
        }
      }

      if (up) {
        const newUp = addDown(up.cellState);
        const newCenter = addUp(center.cellState, true);
        if (newUp !== up.cellState && newCenter !== center.cellState) {
          up.cellState = newUp;
          center.cellState = newCenter;
        }
      }

      if (down) {
        const newDown = addUp(down.cellState);
        const newCenter = addDown(center.cellState, true);
        if (newDown !== down.cellState && newCenter !== center.cellState) {
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
}

export default Board;
