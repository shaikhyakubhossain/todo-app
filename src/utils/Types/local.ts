export type taskType = {
  positionLeft: number;
  positionTop: number;
  width: number;
  height: number;
  textContent: string;
};

export type currentTaskToDragType = {
  elem: HTMLElement;
  selectPosition: positionType;
};

type positionType = {
  x: number;
  y: number;
};

