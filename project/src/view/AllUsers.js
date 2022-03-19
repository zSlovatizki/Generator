import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import UserTable from "./UsersTable";
import Box from "@mui/material/Box";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@mui/material/IconButton";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Dialog } from "material-ui";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Button } from "@mui/material";
import AddUser from "./AddUser";
import { useHistory } from "react-router";
export default function AllUsers() {
  const history = useHistory();
  console.log(history);
  const [addNewUserState, setAddNewUserState] = useState({
    isOpen: false,
    isAdd: false,
  });

  const handleAdd = () => {
    setAddNewUserState({ ...addNewUserState, isOpen: true });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            alignItems: "center",
          },
        }}
      >
        <Paper
          elevation={3}
          style={{
            width: "90vw",
            height: "80vh",
          }}
        >
          <UserTable />
        </Paper>
        <IconButton
          aria-label="addIcon"
          style={{
            width: "10vh",
            height: "10vh",
            marginRight: "4vh",
          }}
          onClick={() => handleAdd()}
        >
          <AddIcon />
        </IconButton>
        <Paper elevation={3}>
          <Dialog
            open={addNewUserState.isOpen}
            onClose={() =>
              setAddNewUserState({ ...addNewUserState, isOpen: false })
            }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">הוספת משתמש</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <AddUser history={history} setAddNewUserState={setAddNewUserState} addNewUserState={addNewUserState} />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  setAddNewUserState({ ...addNewUserState, isOpen: false })
                }
                autoFocus
              >
                ביטול
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>
    </>
  );
}
