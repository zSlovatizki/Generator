import axios from 'axios';
import Users from '../Mobx/users'

export const FetchCablesByManager = (id_manager) => {
   axios.get("https://localhost:44306/api/cable/get?idManager=7"
   ).then(({ data }) => console.log(data))
   return (
      <>
      </>
   )
}

export const FetchUsers = () => {
   var list
   // var json={"userId":,"firstName":"dassi","lastName":"donat","address":"kahaneman 69","phone":"0548543249","Email":"dassid1441@gmail.com","ampereAmount":50.0,"password":"1234","generatorId":2,"status":1}
   axios.get("https://localhost:44306/api/Values/get"
   ).then(( data ) => Users.setUsers( data.data))
   return (
      <>
      </>
   )
}

// export const FetchLoginUser = (id_manager) => {
//    axios.post("https://localhost:44306/api/login/post?{}"
//    ).then(({ data }) => console.log(data))
//    return (
//       <>
//       </>
//    )
// }