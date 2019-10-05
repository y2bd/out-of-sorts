import * as P from "pixi.js";
import { cacheDisplayObjectAsTexture } from "../util";
import { CellWidth, CellHeight } from "./cell.common";

export const hoverTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(0xfc7fb2)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
);

export const soloTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(0x512c96)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(0x3c6f9c)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth / 2, CellHeight / 2)
    .endFill()
);

export const leftTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(0x512c96)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(0x3c6f9c)
    .drawRect(0, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .endFill()
);

export const rightTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(0x512c96)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(0x3c6f9c)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .endFill()
);

export const upTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(0x512c96)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(0x3c6f9c)
    .drawRect(CellWidth / 4, 0, CellWidth / 2, CellHeight * 0.75)
    .endFill()
);

export const downTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(0x512c96)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(0x3c6f9c)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth / 2, CellHeight * 0.75)
    .endFill()
);

export const horizontalTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(0x512c96)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(0x3c6f9c)
    .drawRect(0, CellHeight / 4, CellWidth, CellHeight / 2)
    .endFill()
);

export const verticalTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(0x512c96)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(0x3c6f9c)
    .drawRect(CellWidth / 4, 0, CellWidth / 2, CellHeight)
    .endFill()
);

export const upLeftTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(0x512c96)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(0x3c6f9c)
    .drawRect(CellWidth / 4, 0, CellWidth / 2, CellHeight * 0.75)
    .drawRect(0, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .endFill()
);

export const upRightTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(0x512c96)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(0x3c6f9c)
    .drawRect(CellWidth / 4, 0, CellWidth / 2, CellHeight * 0.75)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .endFill()
);

export const downLeftTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(0x512c96)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(0x3c6f9c)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth / 2, CellHeight * 0.75)
    .drawRect(0, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .endFill()
);

export const downRightTexture = cacheDisplayObjectAsTexture(
  new P.Graphics()
    .beginFill(0x512c96)
    .drawRect(0, 0, CellWidth, CellHeight)
    .endFill()
    .beginFill(0x3c6f9c)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth / 2, CellHeight * 0.75)
    .drawRect(CellWidth / 4, CellHeight / 4, CellWidth * 0.75, CellHeight / 2)
    .endFill()
);
