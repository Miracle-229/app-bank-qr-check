export type IData = {
  id: number;
};

export type IService = {
  value: string;
  name: string;
};

export interface IWebcam {
  current: {
    getScreenshot(): string;
  } | null;
}
