import { observable, makeObservable,makeAutoObservable  } from 'mobx';
import { toJS } from 'mobx'

class Cables {
   @observable cables = [];

  constructor() {
    makeAutoObservable(this)
    console.log("constructor!")
  }
   
  setHeaders(markerAdd) {
    this.markerAdd = markerAdd;
  }

  removeCable(id)
  {
    if (this.cables != null)
      this.cables = this.cables.filter(cable => cable.id != id)
  }
 
}



export default new Cables();