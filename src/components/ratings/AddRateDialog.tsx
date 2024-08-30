import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Rating, TextField, Typography, Box } from "@mui/material";
import { swatches } from "../../theme";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { addRating, deleteRating, updateRating } from "../../services/ratingService";
import { RatingResponse } from "../../reponses/RatingResponse";

const AddRateDialog = (props: AddRateDialogProps) => {
    const [accommodationText, setAccommodationText] = useState<string>(props.rating?.accommodationText ?? '');
    const [hostText, setHostText] = useState<string>(props.rating?.hostText ?? '');
    const [accommodationValue, setAccommodationValue] = useState<number|null>(props.rating?.accommodationValue ?? 0);
    const [hostValue, setHostValue] = useState<number|null>(props.rating?.hostValue ?? 0);

    useEffect(() => {
        if(props.rating) {
            console.log(props.rating);
            setAccommodationText(props.rating.accommodationText);
            setHostText(props.rating.hostText);
            setAccommodationValue(props.rating.accommodationValue);
            setHostValue(props.rating.hostValue);
        }
    }, [props.rating])

    const saveRate = async () => {
        if(props.reservationId && accommodationText && accommodationValue && hostText && hostValue){
            try{
                let request = {
                    accommodationText: accommodationText,
                    accommodationValue: accommodationValue,
                    hostText: hostText,
                    hostValue: hostValue,
                    reservationId: props.reservationId
                };

                const response = props.rating ? await updateRating(request, props.rating.id) : await addRating(request);
                console.log(response);
                if(response === '') {
                    props.onClose(props.rating !== undefined);
                }
            } catch(error) {
                console.log(error);
            }
        } 
    }

    const deleteRate = async () => {
        try{
            if(props.rating && props.rating.id){
                console.log(props.rating.id)
                const response = await deleteRating(props.rating.id);
                if(response === '') {
                    props.onClose(props.rating === undefined);
                }
            }
        } catch(error) {
            console.log(error);
        }
    } 

    return (
        <Dialog
        open={props.open}
        onClose={() => props.onClose(false)}
        maxWidth='xl'
      >
        <DialogTitle marginTop={2} fontStyle={{color: swatches.primary}}>
            <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Typography variant="h5">{props.rating ? 'Update' : 'Add'} rate for {props.accommodationName}</Typography>
                {props.rating && <Button
                    onClick={deleteRate}
                >DELETE RATE</Button>
                }
            </Box>
        </DialogTitle>
        <DialogContent>
            <Box display='flex' flexDirection='column' width={600} marginTop={3}>
                <Box display='flex' flexDirection='row'>
                    <Typography component="legend" variant='body2' style={{marginTop: 2}}> Accommodation rate</Typography>
                    <Rating 
                        value={accommodationValue} 
                        onChange={(event, value) => setAccommodationValue(value)}
                    />
                </Box>
                <TextField
                    label='Your comment about accommodation'
                    value={accommodationText}
                    onChange={(event) => setAccommodationText(event.target.value)}
                    margin="normal"
                    multiline
                    rows={3}
                />
                <Box display='flex' flexDirection='row'>
                    <Typography component="legend" variant='body2' style={{marginTop: 2}}> Host rate</Typography>
                    <Rating 
                        value={hostValue} 
                        onChange={(event, value) => setHostValue(value)}
                    />
                </Box>
                <TextField
                    label='Your comment about host'
                    value={hostText}
                    onChange={(event) => setHostText(event.target.value)}
                    margin="normal"
                    multiline
                    rows={3}
                />
            </Box>
        </DialogContent>
        <DialogActions>
            <Button 
                onClick={() => props.onClose(false)}
            >
                Close
            </Button>
            <Button 
                onClick={saveRate}
            >
                {props.rating ? 'update' : 'save'}
            </Button>
        </DialogActions>
      </Dialog>
    );
};
export default AddRateDialog;

interface AddRateDialogProps {
    open: boolean;
    onClose: (updating: boolean) => void;
    accommodationName: string;
    reservationId: number;
    rating?: RatingResponse;
}