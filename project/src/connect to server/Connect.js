import axios from 'axios';
import Users from '../Mobx/users'
import Cables from '../Mobx/cables'
import { toJS } from 'mobx'
import { TablePagination } from '@material-ui/core';

export const FetchCablesByManager = (id_manager) => {
   axios.get("https://localhost:44306/api/cable/get?idManager=1"

   ).then(({ data }) => {
      Cables.cables = data
      console.log("cables", Cables.cables)
      const x = toJS(Cables.cables)
      console.log("X", x);
      var newArr = [];
      var cordArr = x.map((c) => {
         var tmpa = [];
         var a = c.path.split(" ");
         a.map(cc => {
            var sA = cc.split(",");
            var s = { lat: Number(sA[0]), lng: Number(sA[1]) }
            tmpa.push(s);
         }
         )
         newArr.push(tmpa)

      }
      );
      console.log("newarr???????", newArr)

      Cables.cablesStringArr = newArr;

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
   var list
   // var json={"userId":,"firstName":"dassi","lastName":"donat","address":"kahaneman 69","phone":"0548543249","Email":"dassid1441@gmail.com","ampereAmount":50.0,"password":"1234","generatorId":2,"status":1}
   axios.get("https://localhost:44306/api/Values/get"
   ).then((data) => Users.setUsers(data.data), console.log("con"))
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