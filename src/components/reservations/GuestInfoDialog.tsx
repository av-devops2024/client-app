import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TableBody, Table, TableRow, TableCell } from "@mui/material";
import { Dispatch, SetStateAction} from "react";
import { swatches } from "../../theme";

const GuestInfoDialog = (props: GuestInfoDialogProps) => {

    return (
        <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        maxWidth='xl'
      >
        <DialogTitle marginTop={2} fontStyle={{color: swatches.primary}}>GUEST INFO</DialogTitle>
        <DialogContent>
            <Box>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{color:swatches.gray[100]}}>Name</TableCell>
                            <TableCell style={{color:swatches.gray[500]}}>{props.guestName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{color:swatches.gray[100]}}>Number of cancelled reservations</TableCell>
                            <TableCell style={{color:swatches.gray[500]}}>{props.numberOfCanceledReservations}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{color:swatches.gray[100]}}>Number of reservations</TableCell>
                            <TableCell style={{color:swatches.gray[500]}}>{props.numberOfReservations}</TableCell>
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
        </DialogActions>
      </Dialog>
    );
};
export default GuestInfoDialog;

interface GuestInfoDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    guestName: string;
    numberOfCanceledReservations: number;
    numberOfReservations: number;
}