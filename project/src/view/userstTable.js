import { DataGrid } from '@mui/x-data-grid';
import parseName from '@mui/material';
import { toJS } from 'mobx';
import { useState, useEffect } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import UpdateUserDetails from './updateUserDetails'
import * as React from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import UpdateAmountForAdress from './updateAmountForAdress'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Users from '../Mobx/users'
import { useHistory } from 'react-router';
import UserDetails from './userDetails'
import { getUsersByManagerId } from '../connect to server/Connect'
import User from '../Mobx/user'
import {FetchUFullUserDetailsById} from '../connect to server/Connect'
import {
  GridColumnMenuContainer,
  GridFilterMenuItem,
  SortGridMenuItems
} from '@material-ui/data-grid';

export default function DataTable() {
 const [rows, setRows] = useState(toJS(Users.usersArray))
  useEffect(
    async () => {
      var users = await getUsersByManagerId(toJS(User.currentUser).id);
      setRows(users);
   
      console.log("aaaaaaa", toJS(Users.usersArray),rows)
    }, [])

  const history = useHistory();


  const renderDetailsButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            console.log(toJS(params.row.lastName));
          }}
        >
          Delete user
            </Button>
      </strong>
    )
  }

  // const renderupdateUseButton = (params) => {
  //   return (
  //     <strong>
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         size="small"
  //         style={{ marginLeft: 16 }}
  //         onClick={() => {
  //           history.push("/update_use")
  //         }}
  //       >
  //         update using
  //         </Button>
  //     </strong>
  //   )
  // }


  const updateDetails = (params) => {
    return (
      <strong>
        <Button variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={ async () => {
              var user = await FetchUFullUserDetailsById(params.row.id)
            console.log("full", user)
             setselectedUser(params.row)
            history.push({pathname:'/userDetails',state:user});
            // setOpen(true);

          }}>
          update
      </Button>
      </strong>
    )
  }

  // const updtaeAmountButton = (params) => {
  //   return (
  //     <strong>
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         size="small"
  //         style={{ marginLeft: 16 }}
  //         onClick={() => {
  //           setselectedUser(params.row);
  //           setopenUpdateAmount(true);
  //         }}
  //       >
  //         update amount
  //           </Button>
  //     </strong>
  //   )
  // }

  const columns = [
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 150,
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true,
    },
    // {
    //   field: 'updateUse',
    //   headerName: 'updateUse',
    //   width: 150,
    //   renderCell: renderupdateUseButton,
    //   disableClickEventBubbling: true,
    // },
    {
      field: 'update',
      headerName: 'update',
      width: 150,
      renderCell: updateDetails,
      disableClickEventBubbling: true,
    },
    { field: 'id', headerName: 'ID', width: 70, sortable: false, disableColumnMenu: true },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'Email', headerName: 'Email', width: 130 },
    { field: 'ampereAmount', headerName: 'AmpereAmount', width: 130 },
    { field: 'password', headerName: 'Password', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    // {
    //   field: 'updtaeAmount',
    //   headerName: 'update amount',
    //   width: 150,
    //   renderCell: updtaeAmountButton,
    //   disableClickEventBubbling: true,
    // },
  ];
  // const rows = [
  //   { id: 1, firstName: 'Jon', com: [{ lat: "20.55996", lng: -88.388832 }], lastName: 'Snow', phone: 35, email: "inj@gmail.com", ampereAmount: 90, password: "ljlk", status: 1 },

  // ];

  const [open, setOpen] = useState(false);
  const [openUpdateAmount, setopenUpdateAmount] = useState(false);

  const [selectedUser, setselectedUser] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const [showPotography, setShowPotography] = useState(false);

  const setSelection = (value) => {
  }

  const addUser = ()=>{
    history.push("/addUser") 
  }
  // const filterListByName=(value)=>{
  //   rows =toJS(Users.usersArray).map(user=> user.firstName.includes(value));
  // }

  return (
    <div style={{ height: "80%", width: '100%' }}>
      {console.log("rows",rows)/* <input onChange={filterListByName()}></input> */}
      {/* <button onClick={addUser}>add user</button> */}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>update details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* <UpdateUserDetails user={selectedUser}></UpdateUserDetails> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={openUpdateAmount} onClose={handleClose}>
          <DialogTitle>update amount</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <UpdateAmountForAdress user={selectedUser}></UpdateAmountForAdress>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}





