import axios from 'axios';
import Users from '../Mobx/Users'
import User from '../Mobx/User'
import Generator from '../Mobx/Generator'
import Cables from '../Mobx/Cables'
import { toJS } from 'mobx'
import { getLatLngFromString } from '../services/Functions';

export async function getGeneratorsByManagerId(id) {
   var data;
   axios.get(`https://localhost:44306/api/Generator/GetGeneratorsByMenagerID?id=${id}`).then((d) => {
      d.data.map(generator => {
         generator.address = getLatLngFromString(generator.address)
      })
      Generator.generators = d.data;
   })
}

//#region ===========user==========
export async function FetchUserByPassword(password, email) {
   return axios.get(`https://localhost:44306/api/user/GetUserByIdAndPassword?password=${password}&email=${email}`
   ).then((data) => User.currentUser = data.data)
}

export async function FetchFullUserDetailsById(id) {
   var fullDetails = await axios.get(`https://localhost:44306/api/user/GetCompleteUserByID?id=${id}`)

   return fullDetails.data;
}

export function deleteUser(id) {
   return axios.delete(`https://localhost:44306/api/user/DeleteUser?id=${3}`).then()
}

export const updateUserDetails = (userDeatails) => {
   return axios
      .put(`https://localhost:44306/api/user/ChangeUser`, {
         "id": userDeatails.ID,
         "firstName": userDeatails.firstName,
         "lastName": userDeatails.lastName,
         "phone": userDeatails.phone,
         "Email": userDeatails.Email,
         "password": userDeatails.password,
         "status": userDeatails.status,
         "modify": userDeatails.modify
      })
}

export async function getUsersByManagerId(id) {
   var data;
   await axios.get(`https://localhost:44306/api/user/GetUsersByIDManager?id=${id}`).then((d) => data = d.data)
   return data;
}

export const aaaa = (id, firstName, lastName, phone, Email, password, status, modify) => {
   return axios.post(`https://localhost:44306/api/user/GetUserByIdAndPassword
                    ?id       = ${id}&
                    firstName = ${firstName}&
                    lastName  = ${lastName}&
                    phone     = ${phone}&
                    Email     = ${Email}&
                    password  = ${password}&
                    status    = ${status}&
                    modify    = ${modify}`
   ).then()
}
//#endregion ===========================

export const AddGenerator = (generatorDetails) => {

   return axios
      .post(`https://localhost:44306/api/Generator/AddGenerator`, {
         "generatorId": 0,
         "userID": generatorDetails.userID,
         "ampeAmount": generatorDetails.amperAmount,
         "address": generatorDetails.address
      })
}

export async function FetchCablesByManager(idManager) {

   await axios.get(`https://localhost:44306/api/cable/get?idManager=${idManager}`).then(({ data }) => {
      var tempArr = [];
      data.map((cable) => {
         var coordinatesAsLatLng = [];
         var points = cable.path.trim().split(" ");
         points.map(stringPoint => {
            var latLng = stringPoint.split(",");
            coordinatesAsLatLng.push({ lat: Number(latLng[0]), lng: Number(latLng[1]) });
         })
         tempArr.push({ id: cable.cableId, coordinates: coordinatesAsLatLng, thickness: cable.thickness, type: cable.type, generatorId: cable.generatorId })
      });
      Cables.cables = tempArr;
   })
}

export async function AddCable(cableDetails) {

   return await axios
      .post(`https://localhost:44306/api/Cable/AddCable`, {
         "thickness": cableDetails.thickness,
         "path": cableDetails.path,
         "generatorId": cableDetails.generatorId,
         "type": cableDetails.type,
         "height": 0.4
      })
}

export function addCableToAddress(cableId, addressId) {
   axios.post(`https://localhost:44306/api/Cable/AddCableToAddress`, {
      "cableId": cableId,
      "addressId": addressId,
   })
}

export async function AddUserAddress(userAddress) {

   return await axios
      .post(`https://localhost:44306/api/User/AddAddressToUser`, {
         "ampereAmount": userAddress.ampereAmount,
         "address": userAddress.address,
         "generatorID": userAddress.generatorID,
         "userID": userAddress.userID,
      })
}

export function DeleteAddressToUser(userAddressID) {
   axios.delete(`https://localhost:44306/api/User/DeleteAddressToUser?id=${userAddressID}`)
}

export const addAmpereToUser = (userAddressID, ampereAmount) => {
   return axios
      .put(`https://localhost:44306/api/user/AddAmpereToUser`, {
         "userAddressID": userAddressID,
         "ampereAmount": ampereAmount,
      })
}

export async function DeleteCable(cableId) {
   return await axios.delete(`https://localhost:44306/api/cable/DeleteCable?id=${cableId}`)
}

export async function CanAddUsesForDate(addressId) {
   var data;
   await axios.get(`https://localhost:44306/api/usesForDateToUser/CanAddUses?addressId=${addressId}`).then((d) => data = d.data)
   return data;
}

export const AddUserUsesForDate = (userAddressID, ampereAmount) => {
   return axios
      .post(`https://localhost:44306/api/usesForDateToUser/AddUserUsesForDate`, {
         "userAddressID": userAddressID,
         "ampereAmount": ampereAmount,
      })
}

export const AddNewUser = (user) => {
   return axios.post("https://localhost:44306/api/User/AddUser", user);
};

export const GetAllManagers = () => {
   return axios
      .get("https://localhost:44306/api/User/GetAllManagers")
      .then((data) => data.data);
};
export async function getUserUsesInYear(addressId, year) {
   return axios.get(`https://localhost:44306/api/UsesForDateToUser/GetUserUsesInYear?addressId=${addressId}&year=${year}`);
}
export async function getUsersUsesInYear(managerId, year) {
   return axios.get(`https://localhost:44306/api/UsesForDateToUser/GetUsersUsesInYear?managerId=${managerId}&year=${year}`);
}