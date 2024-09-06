import { Dialog, DialogTitle, DialogContent, FormControlLabel, DialogActions, Button, Alert, Box, Switch } from "@mui/material"
import React, { useEffect, useState } from "react"
import { DialogProps } from "./ChangePasswordDialog"
import { getNotifications, saveNotifications } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

const DeleteAccountDialog = (props: DialogProps) => {
    const [message, setMessage] = useState('');
    const [disabledSave, setDisabledSave] = useState(false);
    const navigate = useNavigate();
    const [newReservationRequestNotification, setNewReservationRequestNotification] = useState(false);
    const [cancelReservationNotification, setCancelReservationNotification] = useState(false);
    const [rateHostNotification, setRateHostNotification] = useState(false);
    const [rateAccommodationNotification, setRateAccommodationNotification] = useState(false);
    const [answerReservationRequestNotification, setAnswerReservationRequestNotification] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const save = async () => {
        const request = {
            newReservationRequestNotification,
            cancelReservationNotification,
            rateHostNotification,
            rateAccommodationNotification,
            answerReservationRequestNotification
        };
        const responseMessage = await saveNotifications(request);
        if(responseMessage === ""){
            setMessage('Successfully saved.');
            setDisabledSave(true);
        } else {
            setMessage(responseMessage);
            setDisabledSave(true);
        }
    };

    const loadNotifications = async () => {
        try {
            const response = await getNotifications();
            setNewReservationRequestNotification(response.newReservationRequestNotification);
            setCancelReservationNotification(response.cancelReservationNotification);
            setAnswerReservationRequestNotification(response.answerReservationRequestNotification);
            setRateAccommodationNotification(response.rateAccommodationNotification);
            setRateHostNotification(response.rateHostNotification);
        } catch(error) {
            setMessage(error as string);
        }
    }

    useEffect(() => {
        loadNotifications();
    }, [])

    return(
        <Dialog
            maxWidth="xs"
            open={props.open}
        >
            <DialogTitle>
                Notification settings
            </DialogTitle>
            {message !== "" && 
                <Alert color={message === 'Successfully saved.' ? 'success' : 'error'}>
                    {message}
                </Alert>
            }
            <DialogContent>
                <Box display='flex' flexDirection='column'>
                    <FormControlLabel
                        style={{marginLeft: 70, marginTop: 10}}
                        control={
                            <Switch checked={newReservationRequestNotification} onChange={() => setNewReservationRequestNotification(!newReservationRequestNotification)} name="gilad" />
                        }
                        label="Notifications about new reservation request"
                    />
                    <FormControlLabel
                        style={{marginLeft: 70, marginTop: 10}}
                        control={
                            <Switch checked={cancelReservationNotification} onChange={() => setCancelReservationNotification(!cancelReservationNotification)} name="gilad" />
                        }
                        label="Notifications about cancelling reservations"
                    />
                    <FormControlLabel
                        style={{marginLeft: 70, marginTop: 10}}
                        control={
                            <Switch checked={rateHostNotification} onChange={() => setRateHostNotification(!rateHostNotification)} name="gilad" />
                        }
                        label="Notifications about your new rates"
                    />
                    <FormControlLabel
                        style={{marginLeft: 70, marginTop: 10}}
                        control={
                            <Switch checked={rateAccommodationNotification} onChange={() => setRateAccommodationNotification(!rateAccommodationNotification)} name="gilad" />
                        }
                        label="Notifications about new rates of your accommodations"
                    />
                    <FormControlLabel
                        style={{marginLeft: 70, marginTop: 10}}
                        control={
                            <Switch checked={answerReservationRequestNotification} onChange={() => setAnswerReservationRequestNotification(!answerReservationRequestNotification)} name="gilad" />
                        }
                        label="Notifications about answering on reservation requests"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>
                    Close
                </Button>
                <Button 
                    onClick={save} 
                    disabled={disabledSave}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
};
export default DeleteAccountDialog;