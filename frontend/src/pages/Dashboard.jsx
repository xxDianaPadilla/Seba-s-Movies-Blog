import React, { useState } from "react";
import { Plus, Film, Search, Filter, Loader, AlertCircle, RefreshCw } from "lucide-react";
import MovieFormModal from "../components/MovieFormModal";
import MovieCard from "../components/MovieCard";
import NotificationContainer from "../components/NotificationItem";
import useMovies from "../hooks/movies/useMovies";
import useNotifications from "../hooks/movies/useNotifications";

const Dashboard = () => {

    const notifications = useNotifications();

    const { movies, loading, error, addMovie, updateMovie, deleteMovie, refetchMovies } = useMovies(notifications);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");

    const generos = [
        'Accion',
        'Comedia',
        'Drama',
        'Terror',
        'Romance',
        'Ciencia Ficcion',
        'Aventura',
        'Animacion'
    ];

    const filteredMovies = movies.filter(movie => {
        // Validación defensiva: asegurar que las propiedades existan
        const titulo = movie.titulo || '';
        const director = movie.director || '';

        const matchesSearch = titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            director.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesGenre = selectedGenre === "" || movie.genero === selectedGenre;

        return matchesSearch && matchesGenre;
    });

    const handleAddMovie = () => {
        setEditingMovie(null);
        setIsModalOpen(true);
    };

    const handleEditMovie = (movie) => {
        setEditingMovie(movie);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingMovie) {
                await updateMovie(editingMovie.id, formData);
            } else {
                await addMovie(formData);
            }
            setIsModalOpen(false);
            setEditingMovie(null);
        } catch (error) {
            console.error('Error en el formulario: ', error);
        }
    };

    const handleDeleteMovie = async (movieId) => {
        try {
            await deleteMovie(movieId);
        } catch (error) {
            console.error('Error al eliminar película: ', error);
        }
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedGenre("");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Cargando películas...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Error al cargar</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={refetchMovies}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 mx-auto"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span>Reintentar</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
                                <Film className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Mi Colección de Películas</h1>
                                <p className="text-gray-600">
                                    {movies.length} película{movies.length !== 1 ? 's' : ''} en tu colección
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleAddMovie}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2 font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Agregar Película</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar por título o director..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        {/* Genre Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white min-w-[200px]"
                            >
                                <option value="">Todos los géneros</option>
                                {generos.map(genero => (
                                    <option key={genero} value={genero}>{genero}</option>
                                ))}
                            </select>
                        </div>

                        {/* Clear Filters */}
                        {(searchTerm || selectedGenre) && (
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>

                    {/* Results count */}
                    {(searchTerm || selectedGenre) && (
                        <div className="mt-4 text-sm text-gray-600">
                            {filteredMovies.length} resultado{filteredMovies.length !== 1 ? 's' : ''} encontrado{filteredMovies.length !== 1 ? 's' : ''}
                            {searchTerm && ` para "${searchTerm}"`}
                            {selectedGenre && ` en ${selectedGenre}`}
                        </div>
                    )}
                </div>

                {/* Movies Grid */}
                {filteredMovies.length === 0 ? (
                    <div className="text-center py-16">
                        <Film className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {movies.length === 0 ? '¡Comienza tu colección!' : 'No se encontraron películas'}
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            {movies.length === 0
                                ? 'Agrega tu primera película y comienza a construir tu biblioteca personal de cine.'
                                : 'Intenta ajustar tus filtros de búsqueda para encontrar lo que buscas.'
                            }
                        </p>
                        {movies.length === 0 && (
                            <button
                                onClick={handleAddMovie}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg font-medium"
                            >
                                Agregar Primera Película
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredMovies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onEdit={handleEditMovie}
                                onDelete={handleDeleteMovie}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <MovieFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingMovie(null);
                }}
                onSubmit={handleFormSubmit}
                editingMovie={editingMovie}
            />

            {/* Contenedor de Notificaciones */}
            <NotificationContainer
                notifications={notifications.notifications}
                onRemove={notifications.removeNotification}
            />
        </div>
    );
};

export default Dashboard;