import Game from "../engine/game";
import Root from "./root";

const game = new Game({
  backgroundColor: 0xfff1e9
});
game.registerGameObject(new Root());

export default game;
