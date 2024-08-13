import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, Snackbar } from '@mui/material';
import { verify } from '../../services/authService';

const Verification = () => {
    const [code, setCode] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, index: number) => {
        const { value } = event.target;
        if (/^[0-9]$/.test(value) || value === '') {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const request = {
           verifyId: id ?? "",
           securityCode: code.join('')
        };
        const isSucceed = await verify(request);
        if(isSucceed){
            setMessage("Verification successfully");
            setOpenSnackbar(true);
            navigate("/auth");
        } else {
            setMessage("An error occurred. Please try again.");
            setOpenSnackbar(true);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="60vh"  // Ensures the box takes the full height of the viewport
            width="40%"
            border="1px solid gray"
            borderRadius={3}
            mx="auto"
            mt={15}
        >
            <Typography variant="h4" gutterBottom marginBottom={5}>
                Verify Your Account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Box display="flex" marginBottom={5}>
                    {code.map((digit, index) => (
                        <TextField
                            key={index}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            inputRef={(el) => (inputRefs.current[index] = el)}
                            variant="outlined"
                            inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                            required
                            sx={{ mx: 1, width: '50px' }}
                        />
                    ))}
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginTop={2}
                >
                    <Button type="submit" variant="contained" color="primary">
                        Verify
                    </Button>
                </Box>
            </Box>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={message}
            />
        </Box>
    );
};

export default Verification;
