import Canvas from "@src/components/drawing/canvas";
import Relative from "@src/components/elements/relative";
import Layout from "@src/components/layouts/layout";
import CanvasDrawer from "@src/containers/canvas-drawer";
import Tools from "@src/containers/tools";
import React from "react";

function Drawing() {
  return (
    <Layout>
      <Tools />
      <Relative
        render={(width, height) => (
          <CanvasDrawer width={width} height={height} />
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
