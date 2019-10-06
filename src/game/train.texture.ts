import * as P from "pixi.js";
import { CellWidth, CellHeight } from "./cell.common";
import { cacheDisplayObjectAsTexture } from "../util";

export const BG = 0xfff1e9;
export const TRK = 0x70c1b3;
export const GRN = 0x2a9986;
export const RED = 0xff1654;
export const BLU = 0x247ba0;
export const BLK = 0x3a3042;
export const MLA = 0xff784f;
export const SMN = 0xdb9d47;

export const redTrainTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(RED)
    .drawCircle(CellWidth / 2, CellHeight / 2, CellWidth / 4)
    .endFill()
);

export const blueTrainTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(BLU)
    .drawCircle(CellWidth / 2, CellHeight / 2, CellWidth / 4)
    .endFill()
);
