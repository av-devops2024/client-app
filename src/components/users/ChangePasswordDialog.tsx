import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, InputAdornment, IconButton, Alert } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { updatePassword } from "../../services/userService";
import { UpdatePasswordRequest } from "../../requests/user/UpdatePasswordRequest";
import { useAuth } from "../../contexts/AuthContext";

const ChangePasswordDialog = (props: ChangePasswordDialogProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const {user} = useAuth();
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [clickedRegister, setClickedRegister] = useState(false);
    const [message, setMessage] = useState("");
    const { register, handleSubmit, getValues, formState: { errors, dirtyFields }, reset } = useForm();

    const validateConfirmPassword = (value: string) => {
        const { newPassword } = getValues();
        return value === newPassword || 'Passwords do not match';
    };

    const onSubmit = async (data: any) => {
        const responseMessage = await updatePassword({...data, id: user?.id} as UpdatePasswordRequest);
        if(responseMessage === ""){
            setMessage("Your password is updated successfully.");
            reset(data);
        } else {
            setMessage(responseMessage);
        }
    };


    return(
        <Dialog
        open={props.open}
        // onClose={() => props.setOpen(false)}
      >
        {message !== "" && <Alert color={message === "Your password is updated successfully." ? 'success' : 'error'}>
            {message}
        </Alert>
        }
        <DialogTitle marginTop={2}>Change password</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Current Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                style={{marginRight: 10}}
                disabled={clickedRegister}
                {...register('currentPassword', {
                    required: 'Password is required',
                    pattern: {
                        value:   /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{12,})/,
                        message: 'Password must contain at least 12 characters, one uppercase letter, one special character, and one number',
                    },
                    })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message?.toString() : ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    color="primary"
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            <TextField
                margin="normal"
                required
                fullWidth
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                style={{marginRight: 10}}
                disabled={clickedRegister}
                {...register('newPassword', {
                    required: 'Password is required',
                    pattern: {
                        value:   /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{12,})/,
                        message: 'Password must contain at least 12 characters, one uppercase letter, one special character, and one number',
                    },
                })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message?.toString() : ''}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                edge="end"
                                color="primary"
                            >
                                {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />


            <TextField
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                disabled={clickedRegister}
                {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    pattern: {
                        value:   /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{12,})/,
                        message: 'Password must contain at least 12 characters, one uppercase letter, one special character, and one number',
                    },
                    validate: validateConfirmPassword
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword ? errors.confirmPassword.message?.toString() : ''}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                                color="primary"
                            >
                                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </DialogContent>
        <DialogActions>
            <Button 
                onClick={() => props.setOpen(false)}
            >
                Cancel
            </Button>
            <Button 
                type="submit"
                disabled={Object.keys(dirtyFields).length === 0}
            >
                Confirm changes
            </Button>
        </DialogActions>
        </form>
      </Dialog>
    )
};
export default ChangePasswordDialog;

interface ChangePasswordDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;

};