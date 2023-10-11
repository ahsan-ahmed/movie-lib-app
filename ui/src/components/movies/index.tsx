import React, { useState } from "react"
import AddMovies from "./AddMovies";
import ListMovies from "./ListMovies";
import Button from '@mui/material/Button';

const Movies = () => {
    const [openMoviesDialog, setOpenMoviesDialog] = useState(false);
    return (
        <>
            <div className="header">
                <Button variant="contained" onClick={() => { setOpenMoviesDialog(true) }}>Add Movies</Button>
            </div>
            <AddMovies open={openMoviesDialog} onClose={() => { setOpenMoviesDialog(false) }} />
            <ListMovies />
        </>
    )
}

export default Movies;