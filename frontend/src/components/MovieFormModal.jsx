import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { X, Film, Save, Star } from "lucide-react";

const MovieFormModal = ({
    isOpen,
    onClose,
    onSubmit,
    editingMovie = null
}) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch
    } = useForm({
        defaultValues: {
            titulo: '',
            anio: '',
            genero: '',
            director: '',
            calificacion: 1
        }
    });

    const calificacionValue = watch('calificacion');

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

    useEffect(() => {
        if (isOpen) {
            if (editingMovie) {
                reset({
                    titulo: editingMovie.titulo || '',
                    anio: editingMovie.anio || '',
                    genero: editingMovie.genero || '',
                    director: editingMovie.director || '',
                    calificacion: editingMovie.calificacion || 1
                });
            } else {
                reset({
                    titulo: '',
                    anio: '',
                    genero: '',
                    director: '',
                    calificacion: 1
                });
            }
        }
    }, [isOpen, editingMovie, reset]);

    const validationRules = {
        titulo: {
            required: 'El titulo es obligatorio',
            minLength: {
                value: 1,
                message: 'El titulo no puede estar vacío'
            },
            validate: value => value.trim().length > 0 || 'El título no puede estar vacío'
        },
        anio: {
            required: 'El año es obligatorio',
            min: {
                value: 1900,
                message: 'El año debe ser mayo a 1900'
            },
            max: {
                value: new Date().getFullYear() + 5,
                message: `El año no puede ser mayor a ${new Date().getFullYear() + 5}`
            },
            validate: value => {
                const num = parseInt(value);
                return (!isNaN(num) && num >= 1900 && num <= new Date().getFullYear() + 5) || 'Ingresa un año válido';
            }
        },
        genero: {
            required: 'Selecciona un género'
        },
        director: {
            required: 'El director es obligatorio',
            minLength: {
                value: 1,
                message: 'El director no puede estar vacío'
            },
            validate: value => value.trim().length > 0 || 'El director no puede estar vacío'
        },
        calificacion: {
            required: 'La calificación es obligatoria',
            min: {
                value: 1,
                message: 'La calificación mínima es 1'
            },
            max: {
                value: 5,
                message: 'La calificación máxima es 5'
            }
        }
    };

    const onFormSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,
                anio: parseInt(data.anio),
                calificacion: parseInt(data.calificacion)
            };

            await onSubmit(formattedData);
            onClose();
        } catch (error) {
            console.error('Error al enviar formulario: ', error);
        }
    };

    const renderStars = (currentRating) => {
        return [...Array(5)].map((_, index) => (
            <button
                key={index}
                type="button"
                onClick={() => setValue('calificacion', index + 1)}
                className="focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
                <Star
                    className={`w-6 h-6 transition-colors ${index < currentRating
                        ? 'text-yellow-400 fill-current hover:text-yellow-500'
                        : 'text-gray-300 hover:text-gray-400'
                        }`}
                />
            </button>
        ));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Film className="w-6 h-6" />
                            <h2 className="text-xl font-bold">
                                {editingMovie ? 'Editar Película' : 'Agregar Nueva Película'}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="p-6 space-y-6">
                    {/* Título */}
                    <div>
                        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                            Título de la Película *
                        </label>
                        <input
                            type="text"
                            id="titulo"
                            {...register('titulo', validationRules.titulo)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${errors.titulo ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Ej: Avengers: Endgame"
                        />
                        {errors.titulo && (
                            <p className="mt-1 text-sm text-red-600">{errors.titulo.message}</p>
                        )}
                    </div>

                    {/* Año */}
                    <div>
                        <label htmlFor="anio" className="block text-sm font-medium text-gray-700 mb-2">
                            Año de Lanzamiento *
                        </label>
                        <input
                            type="number"
                            id="anio"
                            {...register('anio', validationRules.anio)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${errors.anio ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="2023"
                            min="1900"
                            max={new Date().getFullYear() + 5}
                        />
                        {errors.anio && (
                            <p className="mt-1 text-sm text-red-600">{errors.anio.message}</p>
                        )}
                    </div>

                    {/* Género */}
                    <div>
                        <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-2">
                            Género *
                        </label>
                        <select
                            id="genero"
                            {...register('genero', validationRules.genero)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${errors.genero ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">Selecciona un género</option>
                            {generos.map(genero => (
                                <option key={genero} value={genero}>{genero}</option>
                            ))}
                        </select>
                        {errors.genero && (
                            <p className="mt-1 text-sm text-red-600">{errors.genero.message}</p>
                        )}
                    </div>

                    {/* Director */}
                    <div>
                        <label htmlFor="director" className="block text-sm font-medium text-gray-700 mb-2">
                            Director *
                        </label>
                        <input
                            type="text"
                            id="director"
                            {...register('director', validationRules.director)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${errors.director ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Ej: Christopher Nolan"
                        />
                        {errors.director && (
                            <p className="mt-1 text-sm text-red-600">{errors.director.message}</p>
                        )}
                    </div>

                    {/* Calificación */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Calificación *
                        </label>
                        <Controller
                            name="calificacion"
                            control={control}
                            rules={validationRules.calificacion}
                            render={({ field }) => (
                                <div className="flex items-center space-x-1">
                                    {renderStars(field.value)}
                                    <span className="ml-3 text-sm text-gray-600">
                                        {field.value}/5
                                    </span>
                                </div>
                            )}
                        />
                        {errors.calificacion && (
                            <p className="mt-1 text-sm text-red-600">{errors.calificacion.message}</p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit(onFormSubmit)}
                            disabled={isSubmitting}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            <Save className="w-4 h-4" />
                            <span>
                                {isSubmitting
                                    ? 'Guardando...'
                                    : editingMovie
                                        ? 'Actualizar'
                                        : 'Agregar Película'
                                }
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieFormModal;