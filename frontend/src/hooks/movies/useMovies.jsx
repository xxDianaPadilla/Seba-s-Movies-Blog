import { useState, useEffect } from "react";
import { url } from "../../utils/apiUrl";

const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch(url);
            if(!response.ok){
                throw new Error('Error al obtener las películas');
            }
            const data = await response.json();
            setMovies(data);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching movies: ', error);
        }finally{
            setLoading(false);
        }
    };
    
    const addMovie = async (movieData) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieData),
            });

            if(!response.ok){
                throw new Error('Error al agregar la película');
            }

            const newMovie = await response.json();
            setMovies(prevMovies => [...prevMovies, newMovie]);
            return newMovie;
        } catch (error) {
            setError('Error adding movie: ', error);
            throw error;
        }
    };

    const updateMovie = async (id, movieData) => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieData),
            });

            if(!response.ok){
                throw new Error('Error al actualizar la película');
            }

            const updatedMovie = await response.json();
            setMovies(prevMovies =>
                prevMovies.map(movie =>
                    movie.id === id ? updatedMovie : movie
                )
            );
            return updatedMovie;
        } catch (error) {
            setError(error.message);
            console.error('Error updating movie:', error);
            throw error;
        }
    };

    const deleteMovie = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });

            if(!response.ok){
                throw new Error('Error al eliminar la película');
            }

            setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
        } catch (error) {
            setError(error.message);
            console.error('Error deleting movie: ', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return{
        movies,
        loading,
        error,
        addMovie,
        updateMovie,
        deleteMovie,
        refetchMovies: fetchMovies,
    };
};

export default useMovies;