interface IApplicationContext {
  models: Object;
  services: Object;
}
export default class ApplicationContext implements IApplicationContext {
  models: any = null;
  services: any = null;
  
}