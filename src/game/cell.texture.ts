import * as P from "pixi.js";
import { cacheDisplayObjectAsTexture } from "../util";
import { CellWidth, CellHeight } from "./cell.common";

export const BG = 0xfff1e9;
export const TRK = 0x70c1b3;
export const GRN = 0x2a9986;
export const RED = 0xff1654;
export const BLU = 0x247ba0;
export const BLK = 0x3a3042;
export const MLA = 0xff784f;
export const SMN = 0xdb9d47;

export const hoverTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(0xfc7fb2)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
);

export const soloTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(BG)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(TRK)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth / 2, CellHeight / 2)
    .endFill()
);

export const leftTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(BG)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(TRK)
    .drawRect(0, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .endFill()
);

export const rightTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(BG)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(TRK)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .endFill()
);

export const upTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(BG)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(TRK)
    .drawRect(CellWidth / 4, 0, CellWidth / 2, CellHeight * 0.75)
    .endFill()
);

export const downTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(BG)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(TRK)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth / 2, CellHeight * 0.75)
    .endFill()
);

export const horizontalTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(BG)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(TRK)
    .drawRect(0, CellHeight / 4, CellWidth, CellHeight / 2)
    .endFill()
);

export const verticalTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(BG)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(TRK)
    .drawRect(CellWidth / 4, 0, CellWidth / 2, CellHeight)
    .endFill()
);

export const upLeftTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(BG)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(TRK)
    .drawRect(CellWidth / 4, 0, CellWidth / 2, CellHeight * 0.75)
    .drawRect(0, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .endFill()
);

export const upRightTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(BG)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(TRK)
    .drawRect(CellWidth / 4, 0, CellWidth / 2, CellHeight * 0.75)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .endFill()
);

export const downLeftTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(BG)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(TRK)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth / 2, CellHeight * 0.75)
    .drawRect(0, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .endFill()
);

export const downRightTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(BG)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(TRK)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth / 2, CellHeight * 0.75)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .endFill()
);

export const redFilterTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(BG)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(GRN)
    .drawRect(0, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .drawRect(CellWidth / 4, 0, CellWidth / 2, CellHeight * 0.75)
    .endFill()
    .beginFill(BLK)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth / 2, CellHeight * 0.75)
    .endFill()
    .beginFill(RED)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .endFill()
);

export const milaHouseTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(MLA)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
);

export const simonHouseTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(SMN)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
);
