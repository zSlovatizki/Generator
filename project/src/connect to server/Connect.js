import axios from 'axios';
import Users from '../Mobx/users'
import User from '../Mobx/user'
import Cables from '../Mobx/cables'
import { toJS } from 'mobx'
import { TablePagination } from '@material-ui/core';

export const FetchCablesByManager = (id_manager) => {
   axios.get("https://localhost:44306/api/cable/get?idManager=1"

   ).then(({ data }) => {
      Cables.cables = data
      const x = toJS(Cables.cables)
      var newArr = [];
      x.map((c) => {
         var tmpa = [];
         var a = c.path.split(" ");
         a.map(cc => {
            var sA = cc.split(",");
            var s = { lat: Number(sA[0]), lng: Number(sA[1]) }
            tmpa.push(s);
         }
         )
         newArr.push({ coordinates: tmpa, thickness: c.thickness, typeId: c.typeId })
      }
      );
      Cables.cablesStringArr = newArr;
      console.log(toJS(Cables.cablesStringArr))
   })
   // path = [
   //    { lat: 32.0855141, lng: 34.8441714 },
   //    { lat: 32.0859428, lng: 34.8442113 },
   //  ];

   return (
      <>
      </>
   )
}

export const FetchUsers = () => {
   axios.get("https://localhost:44306/api/User/get"
   ).then((data) => Users.setUsers(data.data), console.log("con"))
   return (
      <>
      </>
   )
}

export async function FetchUFullUserDetailsById (id) {
   var fullDetails;
    await axios.get(`https://localhost:44306/api/user/GetCompleteUserByID?id=${id}`)
    .then(((d) => fullDetails = d.data))
    return fullDetails;
}


export const FetchUserByPassword = (password, email) => {
   return axios.get(`https://localhost:44306/api/user/GetUserByIdAndPassword?password=${password}&email=${email}`
   ).then((data) => User.currentUser = data.data)
}

export const updateUser = (user) => {
   return axios.post(`https://localhost:44306/api/user/Post`, user
   ).then()
}

export async function  getUsersByManagerId (id) {
   var data;
   await axios.get(`https://localhost:44306/api/user/GetUsersByIDManager?id=${id}`).then((d)=> data=d.data)
return data;
}

export function updateUserUsingInDate()
{
//   axios.get(`https://localhost:44306/api/user/GetUsersByIDManager?id=${id}`).then((d)=> data=d.data)
}
// export const FetchLoginUser = (id_manager) => {
//    axios.post("https://localhost:44306/api/login/post?{}"
//    ).then(({ data }) => console.log(data))
//    return (
//       <>
//       </>
//    )
// }



   // export  const AddUser=(name,age,phone)=> {
   //    axios.post(`${baseURL}CreateChild`,{Name:name,Age:age,Tel:phone})
   //  .then((response) => {console.log( "create")})
   //  .catch((error) => {
   //  console.log("error on save child")
   //  })}