import { Box, Button, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Reservation } from "../../reponses/Reservation";
import { format } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import GuestInfoDialog from "./GuestInfoDialog";
import { acceptReservationRequest, cancelResOrReq, declineReservationRequest } from "../../services/reservationService";

const ReservationsTable = ({reservations, setReservations, isRequests, isHost}: {reservations: Reservation[], setReservations: Dispatch<SetStateAction<Reservation[]>>, isRequests: boolean, isHost: boolean}) => {
    const [openGuestInfo, setOpenGuestInfo] = useState(false);
    const [currentGuest, setCurrentGuest] = useState<{guestName: string, numberOfCanceledReservations: number, numberOfReservations: number}>();
    const [message, setMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const acceptRequest = async (id: number) => {
        try{
            const response = await acceptReservationRequest(id);
            setReservations(response);
        } catch(error){
            setOpenSnackbar(true);
            setMessage('An error occured');
        }
    }

    const declineRequest = async (id: number) => {
        try{
            const response = await declineReservationRequest(id);
            setReservations(response);
        } catch(error){
            setOpenSnackbar(true);
            setMessage('An error occured');
        }
    }

    const cancelReservationOrRequest = async (id: number) => {
        try{
            const response = await cancelResOrReq(id);
            setReservations(response);
        } catch(error){
            setOpenSnackbar(true);
            setMessage('An error occured');
        }
    }
    return (
        reservations.length > 0 ?
        (
            <Table>
                <TableHead>
                    <TableCell>Number</TableCell>
                    <TableCell>Accommodation</TableCell>
                    <TableCell>Start date</TableCell>
                    <TableCell>End date</TableCell>
                    <TableCell>Number of guests</TableCell>
                    <TableCell>Price</TableCell>
                    {isHost && <TableCell>Guest info</TableCell>}
                    <TableCell></TableCell>
                </TableHead>
                <TableBody>
                    {
                        reservations.map((reservation, index) => (
                            <TableRow>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{reservation.accommodation.name}</TableCell>
                                <TableCell>{format(reservation.startDate, 'dd.MM.yyyy.')}</TableCell>
                                <TableCell>{format(reservation.endDate, 'dd.MM.yyyy.')}</TableCell>
                                <TableCell>{reservation.numberOfGuests}</TableCell>
                                <TableCell>{reservation.price} €</TableCell>
                                {isHost && 
                                    <TableCell>
                                        <Button
                                            onClick={() => {
                                                setOpenGuestInfo(true);
                                                setCurrentGuest(
                                                    {
                                                        guestName: reservation.guestName,
                                                        numberOfCanceledReservations: reservation.numberOfCanceledReservations,
                                                        numberOfReservations: reservation.numberOfReservations
                                                    }
                                                );
                                            }}
                                        >
                                            View guest
                                        </Button>
                                    </TableCell>
                                }
                                <TableCell>
                                    {
                                        isRequests && isHost &&
                                        <Box display='flex' flexDirection='row'>
                                            <Button
                                                onClick={() => acceptRequest(reservation.id)}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                onClick={() => declineRequest(reservation.id)}
                                            >
                                                Decline
                                            </Button>
                                        </Box>
                                    }
                                    {
                                        !isHost && 
                                        <Button
                                                onClick={() => cancelReservationOrRequest(reservation.id)}
                                            >
                                                Cancel
                                            </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {openGuestInfo && currentGuest && <GuestInfoDialog open={openGuestInfo} setOpen={setOpenGuestInfo} numberOfCanceledReservations={currentGuest.numberOfCanceledReservations} numberOfReservations={currentGuest.numberOfReservations} guestName={currentGuest.guestName} />}
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}
                    message={message}
                />
            </Table>
        )
        :
        <Box display='flex' justifyContent='center' marginTop={5}>
            <Typography variant="h4">{isRequests ? 'No reservation requests' : 'No reservations'}</Typography>
        </Box>
    );
};
export default ReservationsTable;