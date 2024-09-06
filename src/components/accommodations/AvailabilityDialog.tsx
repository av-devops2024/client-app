import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, List, ListSubheader, ListItem, Typography, Alert } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DateRangePicker, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './styles.css';
import { format } from "date-fns";
import { AvailabilitySlot } from "../../model/availability-slot";
import { addAvailabilitySlot, getAvailabilitySlots, removeAvailabilitySlot } from "../../services/availabilitySlotService";
import { getReservations } from "../../services/accommodationService";

const Day = ({day, isBusy, isMarked}: {day: Date, isBusy: boolean, isMarked: boolean}) => {
    return(
        <div className={`date-cell ${isBusy ? 'special-date' : ''}`}>
            {day.getDate()}
            {isBusy && <span className="indicator" style={{color: 'red'}}>X</span>}
            {isMarked && <span className="marked-circle"></span>}
        </div>
    );
};

const AvailabilityDialog = (props: AvailabilityDialogProps) => {
    const currentDate = new Date();
    const [value, setValue] = useState<Range[]>([
        {
          startDate: currentDate,
          endDate: currentDate,
          key: 'selection'
        }
      ]);
    
    const [reservations, setReservations] = useState<Date[]>([]);
    const [formattedAvailabilityDates, setFormattedAvailabilityDates] = useState<Date[]>([]);
    const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
    const [disabledButton, setDisabledButton] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const getAllReservations = async () => {
        if(props.accommodationId) {
            const fetchedReservations = await getReservations(props.accommodationId);
            let formattedReservationsDate = [];
            for(const res of fetchedReservations.dates) {
                formattedReservationsDate.push(new Date(res));
            }
            setReservations(formattedReservationsDate);
        }
    }

    const getAllAvailabilitySlots = async () => {
        if(props.accommodationId) {
            const fetched = await getAvailabilitySlots(props.accommodationId);
            setAvailabilitySlots(fetched);
            formatListOfAvailabilityDates(fetched);
        }
    }

    const formatListOfAvailabilityDates = (dates: AvailabilitySlot[]) => {
        let formattedDates = [];
        for (const slot of dates) {
            const startDate = new Date(slot.startDate);
            const endDate = new Date(slot.endDate);
            let currentDate = startDate;
            while (currentDate.getTime() <= endDate.getTime()) {
                
                currentDate.setHours(0, 0, 0, 0);
                formattedDates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }          
        }
        setFormattedAvailabilityDates(formattedDates);
    }

    useEffect(() => {
        getAllReservations();
        getAllAvailabilitySlots();
    }, []);

    const formatUTCDate = (date: Date) => {
        return date.toISOString();
    }

    const saveNewAvailability = async () => {
        if(props.accommodationId && value[0].startDate && value[0].endDate){
            const availabilitySlotRequest = {
                startDate: value[0].startDate,
                endDate: value[0].endDate,
                accommodationId: props.accommodationId
            }
            try{
                const response = await addAvailabilitySlot(availabilitySlotRequest);
                if(response) {
                    setAvailabilitySlots(response);
                    formatListOfAvailabilityDates(response);
                    setDisabledButton(true);
                }
            } catch(error) {
                setErrorMessage(error as string);
            }
        }
        
    }

    const markSlotAsInvalid = async (slotId: number|undefined) => {
        if(props.accommodationId && slotId) {
            try{
                const response = await removeAvailabilitySlot(props.accommodationId, slotId);
                setAvailabilitySlots(response);
                formatListOfAvailabilityDates(response);
            } catch (error){
                setErrorMessage(error as string);
            }
        }
    }

    
    return (
        <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        maxWidth='xl'
      >
        <DialogTitle marginTop={2}>Change accommodation availability - {props.accommodationName}</DialogTitle>
        <DialogContent>
        <Box display='flex' flexDirection='row' justifyContent='space-between' width='1000px'>
            {errorMessage !== "" && <Alert color='error'>{errorMessage}</Alert>}
                <Box>
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                              Added availability slots
                            </ListSubheader>
                        }
                    >
                        {
                            availabilitySlots.map(availabilitySlot => (
                                <ListItem style={{display: 'flex', flexDirection: 'row'}}>
                                    <Typography variant="body2" style={{marginRight: 10}}>{format(availabilitySlot.startDate, 'dd.MM.yyyy.')} - {format(availabilitySlot.endDate as Date, 'dd.MM.yyyy.')}</Typography>
                                    <Button onClick={() => markSlotAsInvalid(availabilitySlot.id)}>Mark as invalid</Button>
                                </ListItem>
                            ))
                        }
                        
                    </List>
                </Box>
            <Box>
                <DateRangePicker
                    onChange={(item:any) => {setValue([item.selection]); setDisabledButton(false);}}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    ranges={value}
                    direction='horizontal'
                    minDate={currentDate}
                    dayContentRenderer={(day:Date) => 
                        <Day day={day} isBusy={reservations.some(date => date.getTime() === day.getTime())} isMarked={formattedAvailabilityDates.some(date => date.getTime() === day.getTime())}/>
                    }
                    disabledDay={(day: Date) => [...reservations, ...formattedAvailabilityDates].some(date => date.getTime() === day.getTime())}
                />
            </Box>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button 
                onClick={() => props.setOpen(false)}
            >
                Close
            </Button>
            <Button 
                onClick={() => saveNewAvailability()}
                disabled={disabledButton}
            >
                Save new availability slot
            </Button>
        </DialogActions>
      </Dialog>
    );
};
export default AvailabilityDialog;

interface AvailabilityDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    accommodationName: string;
    accommodationId: number|undefined;
}