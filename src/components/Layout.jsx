import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, Calendar, Menu, X, Activity, LogOut, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useHospitalData } from '../context/HospitalContext';

const Layout = ({ children }) => {
    const { user, logout, theme, toggleTheme } = useHospitalData();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', label: 'Overview', icon: LayoutDashboard },
        { path: '/patients', label: 'Patients', icon: Users },
        { path: '/doctors', label: 'Medical Staff', icon: UserPlus },
        { path: '/appointments', label: 'Schedule', icon: Calendar },
    ];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 font-sans selection:bg-cyan-500 selection:text-black transition-colors duration-300">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-30 w-64 border-r shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] transform transition-all duration-300 ease-in-out
                md:relative md:translate-x-0
                bg-white border-gray-200
                dark:bg-gray-950 dark:border-gray-800
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <h1 className="text-2xl font-bold flex items-center gap-2 drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-colors">
                        <Activity className="text-cyan-600 dark:text-cyan-400" /> 
                        <span className="text-gray-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:to-fuchsia-500">
                            CyberMed
                        </span>
                    </h1>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                
                <nav className="mt-8 px-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                                    ${active 
                                        ? 'bg-cyan-50 text-cyan-700 border border-cyan-200 dark:bg-cyan-950/30 dark:text-cyan-400 dark:border-cyan-500/30' 
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100 border border-transparent'}
                                `}
                            >
                                <Icon size={20} className={`${active ? 'text-cyan-600 dark:text-cyan-400' : 'group-hover:text-cyan-600 dark:group-hover:text-cyan-300'} transition-colors`} />
                                <span className="font-medium tracking-wide">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-6 border-t border-gray-200 dark:border-gray-800">
                    {/* Theme Toggle */}
                    <button 
                        onClick={toggleTheme}
                        className="w-full mb-4 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    >
                        {theme === 'dark' ? (
                            <>
                                <Sun size={18} className="text-yellow-400" /> Light Mode
                            </>
                        ) : (
                            <>
                                <Moon size={18} className="text-indigo-600" /> Dark Mode
                            </>
                        )}
                    </button>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mb-4 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 dark:from-fuchsia-600 dark:to-purple-600 flex items-center justify-center text-white font-bold shadow-lg uppercase transition-colors">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">{user?.name || 'User'}</p>
                            <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">{user?.role || 'Guest'}</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 py-2 rounded-lg transition-colors border border-transparent hover:border-rose-200 dark:hover:border-rose-500/30"
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header for Mobile */}
                <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between md:hidden z-10 sticky top-0 transition-colors">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-cyan-600 dark:text-cyan-400">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-gray-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:to-fuchsia-500">CyberMed</span>
                    <div className="w-8" /> 
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-black p-6 md:p-8 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
