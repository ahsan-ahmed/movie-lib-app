import React, { useEffect, useRef, useState } from "react"
import AddMovies from "./AddMovies";
import ListMovies from "./ListMovies";
import Button from '@mui/material/Button';
import { CSVLink } from 'react-csv'
import { MoviesItemType } from "../../utils/types";
import { downloadFileTxt } from "../../utils/helpers";

const Movies = () => {
    const csvLink = useRef(null) // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
    const [openMoviesDialog, setOpenMoviesDialog] = useState(false);
    const [moviesList, setMoviesList] = useState<Array<MoviesItemType>>([]);
    const [selectedMovie, setSelectedMovie] = useState<MoviesItemType | null>(null);

    useEffect(() => {
        fetch("http://localhost:6868/api/movies")
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                setMoviesList(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    const handleAddMovie = async (movie: MoviesItemType) => {
        const rawResponse = await fetch('http://localhost:6868/api/movies', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
        const content = await rawResponse.json();
        setMoviesList([...moviesList, content]);
    }

    const handleUpdateMovie = async (movie: MoviesItemType) => {
        const rawResponse = await fetch('http://localhost:6868/api/movies/' + movie.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
        await rawResponse.json();
        let _moviesList = [...moviesList];
        let foundIndex = _moviesList.findIndex(x => x.id === movie.id);
        _moviesList[foundIndex] = movie;
        setMoviesList(_moviesList);
    }
    return (
        <>
            <div className="header">
                <Button variant="contained" onClick={() => {
                    downloadFileTxt(moviesList);
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
                    if (selectedMovie) {
                        handleUpdateMovie(movie)
                    } else {
                        handleAddMovie(movie);
                    }
                }}
                selectedMovie={selectedMovie}
            />
            <ListMovies
                moviesList={moviesList}
                onClickEdit={(movie) => {
                    setOpenMoviesDialog(true);
                    setSelectedMovie(movie);
                }}
                selectedMovie={selectedMovie}
            />
        </>
    )
}

export default Movies;