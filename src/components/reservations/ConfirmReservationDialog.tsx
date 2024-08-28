import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TableBody, Table, TableRow, TableCell, Alert } from "@mui/material";
import { Dispatch, SetStateAction, useState} from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";
import { swatches } from "../../theme";
import { SearchRequest } from "../../requests/accommodation/SearchRequest";
import { Accommodation } from "../../requests/accommodation/CreateAccommodationRequest";
import PeopleIcon from '@mui/icons-material/People';
import { addReservation } from "../../services/reservationService";

const ConfirmReservationDialog = (props: ConfirmReservationDialogProps) => {
    const [disabledButton, setDisabledButton] = useState(false);
    const [message, setMessage] = useState('');
    const confirmReservation = async () => {
        if(props.accommodation.id){
            const request = {
                startDate: props.searchRequest.startDate,
                endDate: props.searchRequest.endDate,
                accommodationId: props.accommodation.id,
                numberOfGuests: props.searchRequest.numberOfGuests
            };
            try{
                await addReservation(request);
                setMessage('Your reservation created successfully.');
                setDisabledButton(true);
            } catch(error) {
                setMessage('An error occured.');
            }
        }
    }
    
    return (
        <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        maxWidth='xl'
      >
        <DialogTitle marginTop={2} fontStyle={{color: swatches.primary}}>Create reservations for {props.accommodation.name}</DialogTitle>
        {message !== '' && <Alert color={message === 'An error occured.' ? 'error' : 'success'}>{message}</Alert>}
        <DialogContent>
            <Box>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{color:swatches.gray[100]}}>Date</TableCell>
                            <TableCell style={{color:swatches.gray[500]}}>{format(props.searchRequest.startDate, 'dd.MM.yyyy.')} - {format(props.searchRequest.endDate, 'dd.MM.yyyy.')}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{color:swatches.gray[100]}}>Number of guests</TableCell>
                            <TableCell style={{color:swatches.gray[500]}}>
                                <Box display='flex' flexDirection='row'>
                                    <PeopleIcon/>
                                    <Typography variant="body1" style={{marginLeft: 5, marginTop: 1, color: swatches.gray[500]}}>{props.searchRequest.numberOfGuests}</Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{color:swatches.gray[100]}}>Daily price</TableCell>
                            <TableCell style={{color:swatches.gray[500]}}>{props.accommodation.dailyPrice} € / {props.accommodation.priceType?.replace("_", " ")}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{color:swatches.gray[100]}}>Total price</TableCell>
                            <TableCell style={{color:swatches.gray[500]}}>{props.accommodation.totalPrice} €</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button 
                onClick={() => props.setOpen(false)}
            >
                Close
            </Button>
            <Button 
                onClick={() => confirmReservation()}
                disabled={disabledButton}
            >
                Create reservation
            </Button>
        </DialogActions>
      </Dialog>
    );
};
export default ConfirmReservationDialog;

interface ConfirmReservationDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    searchRequest: SearchRequest;
    accommodation: Accommodation;
}