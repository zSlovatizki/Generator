import { observable, makeObservable, makeAutoObservable } from 'mobx';
import { getStorageItem } from '../services/Functions'

class User {
  @observable currentUser;

  constructor() {
    const user = JSON.parse(getStorageItem("user"));
    if (user)
      this.currentUser = user;
    else
      this.currentUser = null;
    makeAutoObservable(this)
  }

  setHeaders(currentUser) {
    this.currentUser = currentUser;
  }


}

export default new User();