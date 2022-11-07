import React from "react";
import s from "./style.module.scss";

interface ModalsBaseProps {
  children: React.ReactNode;
}

const ModalsBase: React.FC<ModalsBaseProps> = ({ children }) => {
  console.log("work3");
  return <div className={s.base}>{children}</div>;
};

export default React.memo(ModalsBase);
