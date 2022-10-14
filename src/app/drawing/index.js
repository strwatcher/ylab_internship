import Canvas from "@src/components/drawing/canvas";
import Layout from "@src/components/layouts/layout";
import Tools from "@src/containers/tools";
import React from "react";

function Drawing() {
  return (
    <Layout>
      <Tools />
      <Canvas />
    </Layout>
  );
}

export default React.memo(Drawing);
