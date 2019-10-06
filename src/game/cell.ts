import * as P from "pixi.js";
import { GameObject, UpdateProps, InitProps } from "../engine/gameObject";
import { lease } from "../util";
import { CellState } from "./cell.state";
import {
  hoverTexture,
  soloTexture,
  leftTexture,
  rightTexture,
  upTexture,
  downTexture,
  horizontalTexture,
  verticalTexture,
  upLeftTexture,
  upRightTexture,
  downLeftTexture,
  downRightTexture,
  redFilterTexture,
  milaHouseTexture,
  simonHouseTexture
} from "./cell.texture";

class Cell implements GameObject {
  public static HoverInEase = 3;
  public static HoverOutEase = 10;

  public get displayObject() {
    return this._container;
  }

  public get cellState() {
    return this._cellState;
  }

  public set cellState(value: CellState) {
    if (value !== this._cellState) {
      this._cellSprite.texture =
        this._textureMap[value] || this._textureMap[CellState.Solo];

      this._cellState = value;
    }
  }

  private _container!: P.Container;

  private _cellSprite!: P.Sprite;

  private _hoverSprite!: P.Sprite;
  private _hover: boolean = false;

  private _textureMap!: Record<CellState, P.Texture>;

  public constructor(
    private _cellState: CellState,
    private readonly _onClick?: () => void
  ) {}

  init(props: InitProps) {
    this._textureMap = {
      [CellState.Empty]: P.Texture.EMPTY,
      [CellState.Solo]: soloTexture(props.pixi.renderer),
      [CellState.Left]: leftTexture(props.pixi.renderer),
      [CellState.Right]: rightTexture(props.pixi.renderer),
      [CellState.Up]: upTexture(props.pixi.renderer),
      [CellState.Down]: downTexture(props.pixi.renderer),
      [CellState.Horizontal]: horizontalTexture(props.pixi.renderer),
      [CellState.Vertical]: verticalTexture(props.pixi.renderer),
      [CellState.UpLeft]: upLeftTexture(props.pixi.renderer),
      [CellState.UpRight]: upRightTexture(props.pixi.renderer),
      [CellState.DownLeft]: downLeftTexture(props.pixi.renderer),
      [CellState.DownRight]: downRightTexture(props.pixi.renderer),
      [CellState.RedFilter]: redFilterTexture(props.pixi.renderer),
      [CellState.MilaHouse]: milaHouseTexture(props.pixi.renderer),
      [CellState.SimonHouse]: simonHouseTexture(props.pixi.renderer)
    } as Record<CellState, P.Texture>;

    this._cellSprite = new P.Sprite(this._textureMap[this.cellState]);
    this._hoverSprite = new P.Sprite(hoverTexture(props.pixi.renderer));

    this._hoverSprite.alpha = 0;
    this._hoverSprite.interactive = true;
    this._hoverSprite.buttonMode = true;
    this._hoverSprite.on("pointerover", this._onOver);
    this._hoverSprite.on("pointerout", this._onOut);
    this._hoverSprite.on("pointerdown", this._onDown);

    this._container = new P.Container();
    this._container.addChild(this._cellSprite, this._hoverSprite);
  }

  update(props: UpdateProps) {
    this._hoverSprite.alpha = lease(
      this._hoverSprite.alpha,
      this._hover ? 0.75 : 0,
      this._hover ? Cell.HoverInEase : Cell.HoverOutEase
    );
  }

  private _onDown = () => {
    this._onClick && this._onClick();
  };

  private _onOver = (evt: P.interaction.InteractionEvent) => {
    this._hover = true;
  };

  private _onOut = (evt: P.interaction.InteractionEvent) => {
    this._hover = false;
  };
}

export default Cell;
