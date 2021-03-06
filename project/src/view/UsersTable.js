import { DataGrid, heIL } from '@mui/x-data-grid';
import parseName from '@mui/material';
import { toJS } from 'mobx';
import { useState, useEffect } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import UpdateUserDetails from './UpdateUserDetails'
import * as React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import UpdateAmountForAdress from './UpdateAmperForUserAdress'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Users from '../Mobx/Users'
import { useHistory } from 'react-router';
import UserDetails from './UserDetails'
import { getUsersByManagerId, deleteUser } from '../connect to server/Connect'
import User from '../Mobx/User'
import { FetchFullUserDetailsById } from '../connect to server/Connect'
import Switch from '@material-ui/core/Switch'
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { heIL as hebrew } from '@mui/material/locale';
import { setStorageItem } from '../services/Functions';

export default function DataTable() {
  const [rows, setRows] = useState(toJS(Users.usersArray))
  useEffect(
    async () => {
      var users = await getUsersByManagerId(toJS(User.currentUser).id);
      setRows(users);

    }, [])

  const history = useHistory();

  const theme = createTheme(
    {
      direction: 'rtl',
      root: {
        direction: 'rtl',
      },
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    heIL,
    hebrew,
  );

  const renderDetailsButton = (params) => {
    return (
      <strong>
        <Button
          size="small"
          style={{ textAlign: "center" }}
          onClick={() => {
            deleteUser(params.row.id)
          }}
        >
          <DeleteIcon/>
        </Button>
      </strong>
    )
  }
  const renderSwitcButton = (params) => {
    return (
      <strong>
        <Switch disabled defaultChecked={params.row.status == 1}></Switch>
      </strong>
    )
  }


  const updateDetails = (params) => {
    return (
      <strong>
        <Button
          size="small"
          style={{ textAlign: "center" }}
          onClick={async () => {
            var user = await FetchFullUserDetailsById(params.row.id)
            setStorageItem("currentUser",JSON.stringify(user));
            setselectedUser(params.row)
            history.push({ pathname: `/userDetails/updateDetails`, search: `id=${user.ID}`, state: user });
            // setOpen(true);
          }}>
          <EditIcon/>
        </Button>
      </strong>
    )
  }

  const columns = [
    // {
    //   field: 'id', headerName: 'ID', width: 70, sortable: false, disableColumnMenu: true,
    //   renderCell: (cellValues) => {
    //     return (
    //       <div
    //         style={{
    //           textAlign: "right"
    //         }}
    //       >
    //         {cellValues.value}
    //       </div>
    //     );
    //   }
    // },
    {
      field: 'firstName', headerName: '???? ????????', width: 130,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              textAlign: "right"
            }}
          >
            {cellValues.value}
          </div>
        );
      }
    },
    {
      field: 'lastName', headerName: '???? ??????????', width: 130,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              textAlign: "right"
            }}
          >
            {cellValues.value}
          </div>
        );
      }
    },
    {
      field: 'phone', headerName: '????????????', width: 130,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              textAlign: "right"
            }}
          >
            {cellValues.value}
          </div>
        );
      }
    },
    {
      field: 'Email', headerName: '????????', width: 130,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              textAlign: "right"
            }}
          >
            {cellValues.value}
          </div>
        );
      }
    },
    // {
    //   field: 'password', headerName: '??????????', width: 130,
    //   renderCell: (cellValues) => {
    //     return (
    //       <div
    //         style={{
    //           textAlign: "right"
    //         }}
    //       >
    //         {cellValues.value}
    //       </div>
    //     );
    //   }
    // },
    {
      field: "update",
      headerName: "??????????",
      width: 80,
      renderCell: updateDetails,
      disableClickEventBubbling: true,
    },
    {
      field: "Delete",
      headerName: "??????????",
      width: 80,
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true,
    },
    // {
    //   field: "status",
    //   headerName: "??????????",
    //   width: 150,
    //   renderCell: renderSwitcButton,
    //   disableClickEventBubbling: true,
    // },
  ];


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

  return (
    <div style={{marginTop:'15vh'}}>
      {/* <ThemeProvider theme={theme}> */}
     <div style={{ height: 400}}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          // checkboxSelection
        />
        </div>
      {/* </ThemeProvider> */}

      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>update details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <UpdateUserDetails user={selectedUser}></UpdateUserDetails>
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





