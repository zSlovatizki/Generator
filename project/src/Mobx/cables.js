import { observable, makeObservable,makeAutoObservable  } from 'mobx';

class Cables {
   @observable  cablesStringArr;
   @observable  cables;
   @observable  markerAdd;

  constructor() {
     
     this.cables=null;
     this.markerAdd=5;
    makeAutoObservable(this)
    //makeObservable(this)
  }

  setHeaders(markerAdd) {
    this.markerAdd = markerAdd;
  }

 
}



export default new Cables();