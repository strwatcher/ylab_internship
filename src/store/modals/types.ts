import React from "react";

export interface ModalsState {
  items: ModalItem<React.FC>[];
}

export interface ModalItem<TModal extends React.FC, TProps = any> {
  Modal: TModal;
  props: TProps;
  resolve?: Function;
}
