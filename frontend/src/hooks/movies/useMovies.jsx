import { useState, useEffect } from "react";
import { url } from "../../utils/apiUrl";

const useMovies = (notifications = null) => {
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

            if (notifications) {
                notifications.showSuccess(
                    '¡Película agregada!',
                    `"${movieData.titulo}" se ha añadido a tu colección exitosamente.`
                );
            }

            return newMovie;
        } catch (error) {
            setError('Error adding movie: ', error);

            if (notifications) {
                notifications.showError(
                    'Error al agregar película',
                    `No se pudo agregar "${movieData.titulo}". Inténtalo de nuevo.`
                );
            }

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

            if (notifications) {
                notifications.showEdit(
                    '¡Película actualizada!',
                    `Los cambios en "${movieData.titulo}" se han guardado correctamente.`
                );
            }

            return updatedMovie;
        } catch (error) {
            setError(error.message);
            console.error('Error updating movie:', error);

            if (notifications) {
                notifications.showError(
                    'Error al actualizar película',
                    `No se pudieron guardar los cambios en "${movieData.titulo}".`
                );
            }

            throw error;
        }
    };

    const deleteMovie = async (id) => {
        const movieToDelete = movies.find(movie => movie.id === id);
        const movieTitle = movieToDelete?.titulo || 'la película';

        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });

            if(!response.ok){
                throw new Error('Error al eliminar la película');
            }

            setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));

            if (notifications) {
                notifications.showDelete(
                    '¡Película eliminada!',
                    `"${movieTitle}" se ha eliminado de tu colección.`
                );
            }

        } catch (error) {
            setError(error.message);
            console.error('Error deleting movie: ', error);

            if (notifications) {
                notifications.showError(
                    'Error al eliminar película',
                    `No se pudo eliminar "${movieTitle}". Inténtalo de nuevo.`
                );
            }
            
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