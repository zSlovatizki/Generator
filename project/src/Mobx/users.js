import { observable, makeObservable,makeAutoObservable  } from 'mobx';
import { any } from 'prop-types';
class Users {
 
   @observable  users=[];
  constructor() {
     this.usersArray=null;
    makeAutoObservable(this
      )
    

  }

  setUsers(usersArray) {
    this.usersArray = usersArray;
  }

 
}
export default new Users();