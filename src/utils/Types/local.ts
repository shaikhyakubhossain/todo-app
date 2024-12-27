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

export type authComponentType = {
  updateAuthType: (type: string) => void;
  updateUsername: (username: string) => void;
  updatePassword: (password: string) => void;
  updateConfirmPassword?: (confirmPassword: string) => void;
  submit: () => void;
};
