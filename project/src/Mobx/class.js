import { observable, makeObservable,makeAutoObservable  } from 'mobx';

class Data {
   @observable  id;
   
  constructor(id) {
     this.id=null;
    makeAutoObservable(this)
    
    this.id = id;

  }

  setHeaders(id) {
    this.id = id;
  }

  // receives an array and adds it to the data frame
  // returns the ID of the newly added row
//   addRow(row) {
//     if (this.data.length >= this.size) {
//       this.data.shift();
//     }
//     const id = this.lastGivenId++;
//     this.data.push([id, ...row]);
//     return id;
//   }

//   // deletes a row by its id
//   deleteRow(id) {
//     this.data = this.data.filter(row => row.id !== id);
//   }
}

//makeObservable (Data, {
//   id: observable,
// });

export default new Data(5);