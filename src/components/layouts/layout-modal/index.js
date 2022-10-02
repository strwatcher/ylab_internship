import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import "./style.less";

function LayoutModal({
  theme,
  labelClose,
  children,
  onClose,
  title,
}) {
  const cn = bem("LayoutModal");

  const verticalPlacementRef = useCallback(
    (node) => {
      if (!node) return;

      if (theme.scalable) {
        let top = 10;
        if (window.innerHeight > node.clientHeight) {
          top = Math.max(top, (window.innerHeight - node.clientHeight) / 2);
          node.style.marginTop = `${top}px`;
        }
      }

      const setProperty = node.style.setProperty.bind(node.style);
      theme?.contentDisplay &&
        setProperty("--content-display", theme.contentDisplay);
      theme?.contentFlexDirection &&
        setProperty("--content-flex-direction", theme.contentFlexDirection);
      theme?.contentAlignItems &&
        setProperty("--content-align-items", theme.contentAlignItems);
      theme?.contentJustifyContent &&
        setProperty("--content-justify-content", theme.contentJustifyContent);
      theme?.contentGap && setProperty("--content-gap", theme.contentGap);
      theme?.contentPadding &&
        setProperty("--content-padding", theme.contentPadding);
      theme?.frameMinWidth &&
        setProperty("--frame-min-width", theme.frameMinWidth);
      if (theme?.scalable) {
        setProperty("--frame-top", 0);
        setProperty("--frame-transform", 0);
      }
    },
    [theme]
  );
  
  return (
    <div className={cn()}>
      <div className={cn("frame")} ref={verticalPlacementRef}>
        <div className={cn("head")}>
          <h1 className={cn("title")}>{title}</h1>
          <button className={cn("close")} onClick={onClose}>
            {labelClose}
          </button>
        </div>
        <div className={cn("content")}>{children}</div>
      </div>
    </div>
  );
}

LayoutModal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  labelClose: PropTypes.string,
  theme: PropTypes.object,
};

LayoutModal.defaultProps = {
  title: "Модалка",
  labelClose: "Закрыть",
  onClose: () => {},
};

export default React.memo(LayoutModal);
