import { observable, makeObservable,makeAutoObservable  } from 'mobx';
import { any } from 'prop-types';
class Users {
  
   @observable  currentUser=0;
   @observable  usersArray=[];
  constructor() {
     this.usersArray=null;
    makeAutoObservable(this
      )
    

  }

  setUsers(usersArray) {
    console.log(usersArray,"usersArray")
    this.usersArray = usersArray;
  }

  setCurrentUser (currentUser){
    this.currentUser = currentUser;
  }
}
export default new Users();