import Canvas from "@src/components/drawing/canvas";
import Resized from "@src/components/elements/resized";
import Layout from "@src/components/layouts/layout";
import Tools from "@src/containers/tools";
import React from "react";

function Drawing() {
  const canvasRef = React.useRef(null);
  return (
    <Layout>
      <Tools />
      <Resized
        render={(width, height) => (
          <Canvas ref={canvasRef} width={width} height={height} />
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
