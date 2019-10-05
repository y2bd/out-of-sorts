import React from "react";
import * as P from "pixi.js";

interface PixiRendererProps {
  readonly app: P.Application;
}

const PixiRenderer: React.FC<PixiRendererProps> = ({ app }) => {
  const canvasRef = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    if (canvasRef.current && canvasRef.current.children.length <= 0) {
      canvasRef.current.appendChild(app.view);
      app.start();
      console.log("started");
    }

    return () => app.stop();
  }, [app, canvasRef]);

  return <div ref={canvasRef} />;
};

export default PixiRenderer;
