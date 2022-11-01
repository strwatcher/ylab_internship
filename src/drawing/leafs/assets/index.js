import leaf1 from "./leave1.png";
import leaf2 from "./leave2.png";
import leaf3 from "./leave3.png";
import leaf4 from "./leave4.png";
import leaf5 from "./leave5.png";
const urls = [leaf1, leaf2, leaf3, leaf4, leaf5];

export const getRand = () => {
  const index = Math.floor(Math.random() * urls.length);
  return urls[index];
};
