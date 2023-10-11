import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

interface AddMoviesProp {
    onClose: () => void;
    open: boolean;
}
const default_values = { name: "", duration: "", rating: "" };

export default function AddMovies({ open, onClose }: AddMoviesProp) {
    const [form, setForm] = useState(default_values);
    const handleFormSubmit = (e: any) => {
        e.preventDefault();
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <form onSubmit={handleFormSubmit}>
                <DialogTitle>Add Movie</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            autoFocus
                            id="movie-name"
                            label="Movie Name"
                            fullWidth
                            required
                            variant="standard"
                            value={form.name}
                            onChange={(e) => { setForm({ ...form, name: e.target.value }) }}
                            inputProps={{
                                maxLength: 100,
                                minLength: 2,
                            }}
                        />
                    </Box>
                    <Box
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            id="duration"
                            label="Duration"
                            fullWidth
                            required
                            variant="standard"
                            value={form.duration}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setForm({ ...form, duration: e.target.value })
                                }
                            }}
                        />
                    </Box>
                    <Box
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            id="rating"
                            label="Rating"
                            fullWidth
                            required
                            variant="standard"
                            value={form.rating}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value) && (Number(e.target.value) >= 1 && Number(e.target.value) <= 10)) {
                                    setForm({ ...form, rating: e.target.value })
                                }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onClose();
                        setForm({ ...default_values })
                    }}>
                        Cancel</Button>
                    <Button type={"submit"}>Add</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
