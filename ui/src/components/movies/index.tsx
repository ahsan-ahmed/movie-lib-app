import React, { useRef, useState } from "react"
import AddMovies from "./AddMovies";
import ListMovies from "./ListMovies";
import Button from '@mui/material/Button';
import { CSVLink } from 'react-csv'
import { MoviesItemType } from "../../utils/types";
import { downloadFileTxt } from "../../utils/helpers";
// import { downloadFileJson } from "../../utils/helpers";

const MOVIES_LIST = [
    { id: 1, name: "abc1", duration: "90", rating: "5" },
    { id: 2, name: "abc2", duration: "200", rating: "5" },
    { id: 3, name: "abc3", duration: "420", rating: "5" },
]
const Movies = () => {
    const csvLink = useRef(null) // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
    const [openMoviesDialog, setOpenMoviesDialog] = useState(false);
    const [moviesList, setMoviesList] = useState<Array<MoviesItemType>>([...MOVIES_LIST]);
    const [selectedMovie, setSelectedMovie] = useState<MoviesItemType | null>(null);

    return (
        <>
            <div className="header">
                <Button variant="contained" onClick={() => {
                    //  downloadFileJson(moviesList) 
                    downloadFileTxt(moviesList);
                    // csvLink.current && csvLink.current.link && csvLink.current.link.click();
                }} style={{ marginRight: 8 }}>Download Movies</Button>
                <Button variant="contained" onClick={() => { setOpenMoviesDialog(true) }}>Add Movies</Button>
            </div>
            <CSVLink
                data={moviesList}
                filename='movies.csv'
                className='hidden'
                ref={csvLink}
                target='_blank'
            />
            <AddMovies
                open={openMoviesDialog}
                onClose={() => { setOpenMoviesDialog(false); setSelectedMovie(null); }}
                submitMovies={(movie) => {
                    // console.log(movie, "submitMovies");
                    if (selectedMovie) {
                        let _moviesList = [...moviesList];
                        let foundIndex = _moviesList.findIndex(x => x.name === selectedMovie.name);
                        _moviesList[foundIndex] = movie;
                        setMoviesList(_moviesList);
                    } else {
                        setMoviesList([...moviesList, movie]);
                    }
                }}
                selectedMovie={selectedMovie}
            />
            <ListMovies
                moviesList={moviesList}
                onClickEdit={(movie) => {
                    // console.log(movie, "onClickEdit");
                    setOpenMoviesDialog(true);
                    setSelectedMovie(movie);
                }}
                selectedMovie={selectedMovie}
            />
        </>
    )
}

export default Movies;