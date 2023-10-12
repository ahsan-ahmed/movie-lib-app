import React, { useState } from "react"
import AddMovies from "./AddMovies";
import ListMovies from "./ListMovies";
import Button from '@mui/material/Button';

interface IMoviesState {
    name: string;
    duration: string;
    rating: string;
}
const Movies = () => {
    const [openMoviesDialog, setOpenMoviesDialog] = useState(false);
    const [moviesList, setMoviesList] = useState<Array<IMoviesState>>([]);
    return (
        <>
            <div className="header">
                <Button variant="contained" onClick={() => { setOpenMoviesDialog(true) }}>Add Movies</Button>
            </div>
            <AddMovies
                open={openMoviesDialog}
                onClose={() => { setOpenMoviesDialog(false) }}
                submitMovies={(movie) => {
                    // console.log(movie, "movie");
                    setMoviesList([...moviesList, movie]);
                }}
            />
            <ListMovies moviesList={moviesList} />
        </>
    )
}

export default Movies;