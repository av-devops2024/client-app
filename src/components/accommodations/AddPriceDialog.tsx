import { Dialog, Alert, DialogTitle, DialogContent, TextField, InputAdornment, IconButton, DialogActions, Button, Box, FormControl, InputLabel, Select, OutlinedInput, MenuItem, List, ListSubheader, ListItem, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DateRangePicker, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import './styles.css';
import EuroIcon from '@mui/icons-material/Euro'
import { Price } from "../../model/price";
import { addPrice, getPrices } from "../../services/priceService";
import { format } from "date-fns";
import { swatches } from "../../theme";
import { getReservations } from "../../services/accommodationService";

const Day = ({day, isBusy}: {day: Date, isBusy: boolean}) => {
    return(
        <div className={`date-cell ${isBusy ? 'special-date' : ''}`}>
            {day.getDate()}
            {isBusy && <span className="indicator" style={{color: 'red'}}>X</span>}
        </div>
    );
};

const AddPriceDialog = (props: AddPriceDialogProps) => {
    const currentDate = new Date();
    const [selectedType, setSelectedType] = useState('PER PERSON');
    const [value, setValue] = useState<Range[]>([
        {
          startDate: currentDate,
          endDate: currentDate,
          key: 'selection'
        }
      ]);
    
    const [reservations, setReservations] = useState<Date[]>([]);
    const [prices, setPrices] = useState<Price[]>([]);
    const [price, setPrice] = useState(0);

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

    const getAllPrices = async () => {
        if(props.accommodationId) {
            const fetchedPrices = await getPrices(props.accommodationId);
            console.log(fetchedPrices)
            setPrices(fetchedPrices);
        }
    }

    useEffect(() => {
        console.log('ee');
        getAllReservations();
        getAllPrices();
    }, []);

    const addNewPrice = async () => {
        if(props.accommodationId && value[0].startDate && value[0].endDate){
            const priceRequest = {
                startDate: value[0].startDate ,
                endDate: value[0].endDate,
                value: price,
                type: getType()
            }
            try{
                const newPrice = await addPrice(props.accommodationId, priceRequest);
                if(newPrice) {
                    setPrices((prevPrices) => [...prevPrices, newPrice]);
                }
            } catch(error) {
                console.log(error);
            }
        }
        
    }

    const getType = () => {
        return selectedType === "PER PERSON" ? "PER_PERSON" : "PER_ACCOMMODATION";
    }
    
    return (
        <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        maxWidth='xl'
      >
        <DialogTitle marginTop={2}>Change price - {props.accommodationName}</DialogTitle>
        <DialogContent>
            <Box display='flex' flexDirection='row' justifyContent='space-between' width='1000px'>
                <Box>
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                              Added prices
                            </ListSubheader>
                        }
                    >
                        {
                            prices.map(price => (
                                <ListItem style={{display: 'flex', flexDirection: 'row'}}>
                                    <Typography variant="body2" style={{marginRight: 10}}>{format(price.startDate, 'dd.MM.yyyy.')} - {format(price.endDate, 'dd.MM.yyyy.')}</Typography>
                                    <Typography variant="body2" style={{marginRight: 10}}>{price.type}</Typography>
                                    <Typography variant="body1" style={{marginRight: 10, color: swatches.primary}}>{price.value} €</Typography>
                                </ListItem>
                            ))
                        }
                        
                    </List>
                </Box>
                <Box>
                    <DateRangePicker
                        onChange={(item:any) => setValue([item.selection])}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={value}
                        direction='horizontal'
                        minDate={currentDate}
                        dayContentRenderer={(day:Date) => 
                            <Day day={day} isBusy={reservations.some(date => date.getTime() === day.getTime())}/>
                        }
                        disabledDay={(day: Date) => reservations.some(date => date.getTime() === day.getTime())}
                    />
                    <Box display='flex' flexDirection='row'>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            id="price"
                            label="Enter new price"
                            autoFocus
                            style={{marginRight: '10px'}}
                            value={price}
                            onChange={(event) => setPrice(+event.target.value)}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <EuroIcon color="primary"/>
                                </InputAdornment>
                                )
                            }}
                        />
                        <FormControl fullWidth margin='normal'>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        value={selectedType}
                                        onChange={(event: any) => setSelectedType(event.target.value)}
                                        input={<OutlinedInput label="Type" />}
                                        sx={{ width: '100%' }}
                                    >
                                        <MenuItem value="PER PERSON">PER PERSON</MenuItem>
                                        <MenuItem value="PER ACCOMMODATION">PER ACCOMMODATION</MenuItem>
                                    </Select>
                                </FormControl>
                    </Box>
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
                onClick={() => addNewPrice()}
            >
                Add price
            </Button>
        </DialogActions>
      </Dialog>
    );
};
export default AddPriceDialog;

interface AddPriceDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    accommodationName: string;
    accommodationId: number|undefined;
}