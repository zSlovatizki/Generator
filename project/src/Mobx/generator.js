import { observable, makeObservable,makeAutoObservable  } from 'mobx';

class Generator {

   @observable  generators = [];

  addGenerator(address, amperAmount) {
    this.generators.push({address, amperAmount});
    //call conect add generator
  }
  constructor()
  {
    makeAutoObservable(this)
  }

}
export default new Generator();