import Canvas from "@src/components/drawing/canvas";
import Relative from "@src/components/elements/relative";
import Layout from "@src/components/layouts/layout";
import CanvasControls from "@src/containers/canvas-controls";
import Tools from "@src/containers/tools";
import React from "react";

function Drawing() {
  return (
    <Layout>
      <Tools />
      <Relative
        render={(width, height, origin) => (
          <CanvasControls width={width} height={height} origin={origin}/>
        )}
        theme={{
          width: '100%',
          height: '85vh'
        }}
      />
    </Layout>
  );
}

export default React.memo(Drawing);
