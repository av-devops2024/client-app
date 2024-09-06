import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert } from "@mui/material"
import React, { useState } from "react"
import { DialogProps } from "./ChangePasswordDialog"
import { deleteAccount } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

const DeleteAccountDialog = (props: DialogProps) => {
    const {logout} = useAuth();
    const [message, setMessage] = useState('');
    const [disabledYes, setDisabledYes] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        const responseMessage = await deleteAccount();
        if(responseMessage === ""){
            await logout();
            navigate("/auth");
        } else {
            setMessage(responseMessage);
            setDisabledYes(true);
        }
    };

    return(
        <Dialog
            maxWidth="xs"
            open={props.open}
        >
            <DialogTitle>
                Are you sure you want to delete the account?
            </DialogTitle>
            {message !== "" && 
                <Alert color='error'>
                    {message}
                </Alert>
            }
            <DialogContent>
                If you delete your account, all your reservations and registered accommodations will be deleted.
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>
                    No
                </Button>
                <Button 
                    onClick={handleDelete} 
                    disabled={disabledYes}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
};
export default DeleteAccountDialog;