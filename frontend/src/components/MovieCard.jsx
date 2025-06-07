import React, { useState } from "react";
import { Star, Calendar, User, Tag, Edit, Trash2, MoreVertical } from 'lucide-react';

const MovieCard = ({ movie, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar "${movie.titulo}"?`)) {
            setIsDeleting(true);
            try {
                await onDelete(movie.id);
            } catch (error) {
                console.error('Error al eliminar: ', error);
            } finally {
                setIsDeleting(false);
            }
        }
        setShowMenu(false);
    };

    const handleEdit = () => {
        onEdit(movie);
        setShowMenu(false);
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                    }`}
            />
        ));
    };

    const getGenreColor = (genre) => {
        const colors = {
            'Accion': 'bg-red-100 text-red-800',
            'Comedia': 'bg-yellow-100 text-yellow-800',
            'Drama': 'bg-blue-100 text-blue-800',
            'Terror': 'bg-purple-100 text-purple-800',
            'Romance': 'bg-pink-100 text-pink-800',
            'Ciencia Ficcion': 'bg-green-100 text-green-800',
            'Aventura': 'bg-orange-100 text-orange-800',
            'Animacion': 'bg-indigo-100 text-indigo-800',
        };
        return colors[genre] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white relative">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1 capitalize">
                            {movie.titulo}
                        </h3>
                        <div className="flex items-center space-x-2 text-purple-100">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{movie.anio}</span>
                        </div>
                    </div>

                    {/* Menu dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-1 rounded-full hover:bg-white/20 transition-colors"
                            disabled={isDeleting}
                        >
                            <MoreVertical className="w-5 h-5" />
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg py-2 z-10 min-w-[120px]">
                                <button
                                    onClick={handleEdit}
                                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                >
                                    <Edit className="w-4 h-4" />
                                    <span>Editar</span>
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2 disabled:opacity-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>{isDeleting ? 'Eliminando...' : 'Eliminar'}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                        {renderStars(movie.calificacion)}
                        <span className="ml-2 text-sm font-medium text-gray-600">
                            {movie.calificacion}/5
                        </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getGenreColor(movie.genero)}`}>
                        <Tag className="w-3 h-3 inline mr-1" />
                        {movie.genero}
                    </span>
                </div>

                {/* Director */}
                <div className="flex items-center text-gray-600 mb-4">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                        <span className="font-medium">Director:</span> {movie.director}
                    </span>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>ID: {movie.id}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">
                            Reseña #{movie.id}
                        </span>
                    </div>
                </div>
            </div>

            {/* Click outside to close menu */}
            {showMenu && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowMenu(false)}
                />
            )}
        </div>
    );
};

export default MovieCard;