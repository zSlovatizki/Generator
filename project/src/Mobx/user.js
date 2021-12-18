import { observable, makeObservable,makeAutoObservable  } from 'mobx';

class User {
   @observable  currentUser;

  constructor() {   
     this.currentUser=null;
    makeAutoObservable(this)
  }

  setHeaders(currentUser) {
    this.currentUser = currentUser;
  }

 
}

export default new User();