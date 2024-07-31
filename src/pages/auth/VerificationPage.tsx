import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { verify } from '../../services/authService';

const Verification = () => {
    const [code, setCode] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

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
        setError('');
        const data = new FormData(event.currentTarget);
        const request = {
           verifyId: '',
           securityCode: code.join('')
        };
    

        try {
            const response = await verify(request);
            if (response.data.success) {
                navigate('/success');
            } else {
                setError('Invalid verification code. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
        >
            <Typography variant="h4" gutterBottom>
                Verify Your Account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate display="flex">
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
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Verify
            </Button>
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
};

export default Verification;
