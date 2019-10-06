export enum CellState {
  Empty,
  Solo,
  Left,
  Right,
  Up,
  Down,
  Vertical,
  Horizontal,
  UpLeft,
  UpRight,
  DownLeft,
  DownRight,
  RedFilter,
  MilaHouse,
  SimonHouse
}

export function addLeft(cellState: CellState, fillEmpty = false) {
  switch (cellState) {
    case CellState.Empty:
      return fillEmpty ? CellState.Left : CellState.Empty;
    case CellState.Solo:
      return CellState.Left;
    case CellState.Right:
      return CellState.Horizontal;
    case CellState.Up:
      return CellState.UpLeft;
    case CellState.Down:
      return CellState.DownLeft;
    default:
      return cellState;
  }
}

export function addRight(cellState: CellState, fillEmpty = false) {
  switch (cellState) {
    case CellState.Empty:
      return fillEmpty ? CellState.Right : CellState.Empty;
    case CellState.Solo:
      return CellState.Right;
    case CellState.Left:
      return CellState.Horizontal;
    case CellState.Up:
      return CellState.UpRight;
    case CellState.Down:
      return CellState.DownRight;
    default:
      return cellState;
  }
}

export function addUp(cellState: CellState, fillEmpty = false) {
  switch (cellState) {
    case CellState.Empty:
      return fillEmpty ? CellState.Up : CellState.Empty;
    case CellState.Solo:
      return CellState.Up;
    case CellState.Down:
      return CellState.Vertical;
    case CellState.Left:
      return CellState.UpLeft;
    case CellState.Right:
      return CellState.UpRight;
    default:
      return cellState;
  }
}

export function addDown(cellState: CellState, fillEmpty = false) {
  switch (cellState) {
    case CellState.Empty:
      return fillEmpty ? CellState.Down : CellState.Empty;
    case CellState.Solo:
      return CellState.Down;
    case CellState.Up:
      return CellState.Vertical;
    case CellState.Left:
      return CellState.DownLeft;
    case CellState.Right:
      return CellState.DownRight;
    default:
      return cellState;
  }
}

export function removeLeft(cellState: CellState) {
  switch (cellState) {
    case CellState.Left:
      return CellState.Solo;
    case CellState.Horizontal:
      return CellState.Right;
    case CellState.UpLeft:
      return CellState.Up;
    case CellState.DownLeft:
      return CellState.Down;
    default:
      return cellState;
  }
}

export function removeRight(cellState: CellState) {
  switch (cellState) {
    case CellState.Right:
      return CellState.Solo;
    case CellState.Horizontal:
      return CellState.Left;
    case CellState.UpRight:
      return CellState.Up;
    case CellState.DownRight:
      return CellState.Down;
    default:
      return cellState;
  }
}

export function removeUp(cellState: CellState) {
  switch (cellState) {
    case CellState.Up:
      return CellState.Solo;
    case CellState.Vertical:
      return CellState.Down;
    case CellState.UpLeft:
      return CellState.Left;
    case CellState.UpRight:
      return CellState.Right;
    default:
      return cellState;
  }
}

export function removeDown(cellState: CellState) {
  switch (cellState) {
    case CellState.Down:
      return CellState.Solo;
    case CellState.Vertical:
      return CellState.Up;
    case CellState.DownLeft:
      return CellState.Left;
    case CellState.DownRight:
      return CellState.Right;
    default:
      return cellState;
  }
}

export function isSpecial(cellState: CellState) {
  switch (cellState) {
    case CellState.RedFilter:
    case CellState.MilaHouse:
    case CellState.SimonHouse:
      return true;
    default:
      return false;
  }
}