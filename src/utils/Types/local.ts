export type taskType = {
  id: number;
  positionLeft: number;
  positionTop: number;
  width: number;
  height: number;
  title: string;
  taskBody: string;
};

export type currentTaskToDragType = {
  elem: HTMLElement;
  selectPosition: positionType;
};

type positionType = {
  x: number;
  y: number;
};

export type authCredentialType = {
    username: string;
    password: string;
};

