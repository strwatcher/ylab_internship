import React from 'react';
import s from './style.module.scss';
function ModalsBase({children}) {
  return <div className={s.base}>{children}</div>
}

export default React.memo(ModalsBase);