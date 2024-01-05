declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}


declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";