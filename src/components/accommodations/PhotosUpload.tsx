import { Box, Button, Card, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const PhotosUpload = (props: PhotosUploadProps) => {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const newFiles = Array.from(selectedFiles);
            props.setFiles((prevFiles: File[]) => [...prevFiles, ...newFiles]);

            const newPreviews = newFiles.map((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                return new Promise<string>((resolve) => {
                    reader.onloadend = () => resolve(reader.result as string);
                });
            });

            Promise.all(newPreviews).then((newPreviewUrls) => {
                setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviewUrls]);
            });
        }
    };

    const handleRemoveImage = (index: number) => {
        props.setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                p: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Upload Photos
            </Typography>

            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="photo-upload"
                type="file"
                multiple
                onChange={handleFileChange}
            />
            <label htmlFor="photo-upload">
                <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    disabled={props.disabled}
                >
                    Choose Photos
                </Button>
            </label>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                {imagePreviews.map((preview, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                        <Card
                            sx={{
                                width: '100%',
                                height: 200,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={preview}
                                alt={`Selected photo ${index + 1}`}
                                sx={{ maxHeight: '100%', maxWidth: '100%' }}
                            />
                             <IconButton
                                disabled={props.disabled}
                                onClick={() => handleRemoveImage(index)}
                                sx={{
                                    position: 'absolute',
                                    bottom: 5,
                                    right: 5,
                                    backgroundColor: 'black',
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
};
export default PhotosUpload;

interface PhotosUploadProps {
    setFiles: Dispatch<SetStateAction<File[]>>;
    disabled: boolean;
}