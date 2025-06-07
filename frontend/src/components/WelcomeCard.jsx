import React from "react";
import { useNavigate } from 'react-router-dom';
import { Film, Star, Play, ArrowRight, Popcorn, Calendar, BookOpen } from 'lucide-react';
import { useDashboardAccess } from "../context/AuthContext";

/**
 * COMPONENTE: WelcomeCard - Tarjeta de bienvenida y punto de entrada a la aplicación
 * 
 * Funcionalidades:
 * - Presenta la aplicación al usuario
 * - Maneja la navegación controlada al dashboard
 * - Gestiona permisos de acceso a través del contexto de autenticación
 */

const WelcomeCard = () => {

    // Hook de navegación de React Router
    const navigate = useNavigate();

    /**
     * MÓDULO: Gestión de acceso al dashboard
     * Extrae funciones del contexto de autenticación para controlar el acceso
     */

    const { allowDashboardAccess, revokeDashboardAccess } = useDashboardAccess();

    /**
     * MÓDULO: Revocación automática de acceso al montar componente
     * Asegura que el usuario pase por el flujo de bienvenida antes de acceder al dashboard
     */

    React.useEffect(() => {
        revokeDashboardAccess(); // Revocar acceso automáticamente al cargar la página
    }, []); // Array de dependencias vacío = solo ejecuta al montar

    /**
     * MÓDULO: Navegación controlada al dashboard
     * Maneja la secuencia: otorgar acceso → navegar al dashboard
     */

    const handleNavigateToDashboard = () => {
        allowDashboardAccess(); // Otorgar permiso de acceso
        // setTimeout con delay 0: Permite que el estado se actualice completamente
        // antes de ejecutar la navegación (evita race conditions)
        setTimeout(() => {
            navigate('/dashboard');
        }, 0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
            <br />
            {/* Floating movie elements */}
            <div className="absolute top-20 left-10 animate-bounce">
                <Film className="w-8 h-8 text-yellow-400 opacity-60" />
            </div>
            <div className="absolute top-40 right-20 animate-pulse">
                <Popcorn className="w-10 h-10 text-red-400 opacity-50" />
            </div>
            <div className="absolute bottom-20 left-20 animate-bounce delay-300">
                <Star className="w-6 h-6 text-blue-400 opacity-70" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                {/* Header Section */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-30"></div>
                            <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full">
                                <Film className="w-12 h-12 text-slate-900" />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                        SEBA'S MOVIES BlOG
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 max-w-3xl mx-auto leading-relaxed">
                        Tu pasión por el cine merece un lugar especial
                    </p>
                </div>

                {/* Description Section */}
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20 shadow-2xl">
                        <p className="text-lg text-gray-200 leading-relaxed mb-6">
                            Sebastián es un apasionado del cine que disfruta analizar películas y escribir reseñas.
                            Con el tiempo, se le hizo difícil recordar todas las películas que ha visto y las
                            calificaciones que les ha dado.
                        </p>
                        <p className="text-lg text-gray-200 leading-relaxed">
                            Por eso creó su propia base de datos en línea para registrar películas con detalles
                            como título, género, año de lanzamiento y calificaciones personales. Aquí podrá
                            consultar rápidamente su historial cinematográfico y compartir recomendaciones.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                            <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Reseñas Detalladas</h3>
                            <p className="text-gray-400 text-sm">Analiza y documenta cada película con reseñas completas</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Sistema de Calificación</h3>
                            <p className="text-gray-400 text-sm">Califica y organiza tus películas favoritas</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                            <Calendar className="w-8 h-8 text-green-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Historial Completo</h3>
                            <p className="text-gray-400 text-sm">Mantén un registro organizado de tu experiencia cinematográfica</p>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <button
                        onClick={handleNavigateToDashboard}
                        className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                        <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        Explorar Dashboard
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />

                        {/* Button glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    </button>

                    <p className="text-gray-400 text-sm mt-4">
                        Descubre, califica y comparte tu pasión por el cine
                    </p>
                </div>
            </div>

            {/* Bottom gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
            <br />
        </div>
    );
};

export default WelcomeCard;