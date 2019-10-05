import React from "react";
import PixiRenderer from "./PixiRenderer";
import game from "./game/game";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <PixiRenderer app={game.pixi} />
    </div>
  );
};

export default App;
