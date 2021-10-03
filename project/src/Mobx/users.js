import { observable, makeObservable,makeAutoObservable  } from 'mobx';

class Users {
   @observable  usersArray;
  constructor() {
     this.usersArray=null;
    makeAutoObservable(this)
    

  }

  setHeaders(usersArray) {
    this.usersArray = usersArray;
  }

 
}
export default new Users();