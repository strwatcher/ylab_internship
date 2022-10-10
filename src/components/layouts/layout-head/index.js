import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import React from 'react';
import './style.less';

function LayoutHead({title, children, fixed}){
  const cn = bem('LayoutHead');
  return (
    <div className={cn('', {fixed})}>
      <h1 className={cn('title')}>{title}</h1>
      <div className={cn('side')}>{children}</div>
    </div>
  )
}

LayoutHead.propTypes = {
  title: propTypes.string,
  children: propTypes.node,
}

LayoutHead.defaultProps = {
}

export default React.memo(LayoutHead);
