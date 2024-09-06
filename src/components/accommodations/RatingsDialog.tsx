import { Dialog, DialogTitle, Alert, DialogContent, Box, Table, TableBody, TableRow, TableCell, Typography, DialogActions, Button, TableHead, Rating } from "@mui/material";
import { format } from "date-fns";
import { swatches } from "../../theme";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RatingSummaryResponse } from "../../reponses/RatingResponse";
import { getRatings } from "../../services/ratingService";

const RatingsDialog = (props: RatingsDialogProps) => {
    const [rating, setRating] = useState<RatingSummaryResponse>();
    const [errorMessage, setErrorMessage] = useState('');
    const loadRatings = async () => {
        if(props.accommodationId){
            try{
                const response = await getRatings(props.accommodationId);
                if(response) {
                    if(response?.ratings && response.ratings.length === 0){
                        setRating(undefined);
                    } else {
                        setRating(response);
                    }
                }
            } catch(error) {
                setErrorMessage(error as string);
            }
        } 
    }

    useEffect(() => {
        loadRatings();
    }, []);

    return (
        <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        maxWidth='xl'
      >
        <DialogTitle marginTop={2} fontStyle={{color: swatches.primary}}>Ratings for {props.accommodationName}</DialogTitle>
        <DialogContent>
            {errorMessage !== "" && <Alert color='error'>{errorMessage}</Alert>}
            {rating ?
                <Box>
                    <Rating value={rating?.meanRating ?? 0} readOnly/>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Number</TableCell>
                                <TableCell>Accommodation rate</TableCell>
                                <TableCell>Accommodation comment</TableCell>
                                <TableCell>Host rate</TableCell>
                                <TableCell>Host comment</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Guest</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rating && rating.ratings.map((r, index) => 
                                (
                                    <TableRow>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>
                                            <Rating value={r.accommodationValue ?? 0} readOnly/>
                                        </TableCell>
                                        <TableCell>
                                            {r.accommodationText}
                                        </TableCell>
                                        <TableCell>
                                            <Rating value={r.hostValue ?? 0} readOnly/>
                                        </TableCell>
                                        <TableCell>
                                            {r.hostText}
                                        </TableCell>
                                        <TableCell>
                                            {format(r.date, 'dd.MM.yyyy.')}
                                        </TableCell>
                                        <TableCell>
                                            {r.guestName}
                                        </TableCell>
                                    </TableRow>
                                )
                                )
                            }
                        </TableBody>
                    </Table>
                </Box>
                :
                <Box width={500} justifyContent='center' alignItems='center' display='flex' marginTop={3}>
                    <Typography variant='h4'>No ratings</Typography>
                </Box>
            }
        </DialogContent>
        <DialogActions>
            <Button 
                onClick={() => props.setOpen(false)}
            >
                Close
            </Button>
        </DialogActions>
      </Dialog>
    );
};
export default RatingsDialog;

interface RatingsDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    accommodationName: string;
    accommodationId: number|undefined;
}