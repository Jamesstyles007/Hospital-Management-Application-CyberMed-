import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHospitalData } from '../context/HospitalContext';
import { Activity, Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
    const { login } = useHospitalData();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(formData.email, formData.password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gray-50 dark:bg-black transition-colors duration-300">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full blur-[100px] bg-cyan-200/40 dark:bg-cyan-500/20"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full blur-[100px] bg-fuchsia-200/40 dark:bg-fuchsia-500/20"></div>
            </div>

            <div className="
                relative z-10 w-full max-w-md p-8 rounded-3xl shadow-2xl border
                bg-white/80 backdrop-blur-xl border-gray-200
                dark:bg-gray-900/60 dark:border-gray-800
            ">
                <div className="text-center mb-8">
                    <div className="
                        w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg
                        bg-gradient-to-tr from-cyan-500 to-blue-600
                        dark:shadow-[0_0_20px_rgba(6,182,212,0.5)]
                    ">
                        <Activity size={32} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Welcome Back</h2>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to access CyberMed</p>
                </div>

                {error && (
                    <div className="
                        px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2 border
                        bg-red-50 text-red-600 border-red-200
                        dark:bg-red-900/20 dark:text-red-200 dark:border-red-500/50
                    ">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-red-600 dark:bg-red-500"></span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-gray-400 group-focus-within:text-cyan-600 dark:text-gray-500 dark:group-focus-within:text-cyan-400" size={20} />
                        <input 
                            type="email" 
                            required
                            placeholder="Email Address"
                            className="
                                w-full rounded-xl py-3.5 pl-12 pr-4 transition-all focus:outline-none focus:ring-1 border
                                bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500
                                dark:bg-gray-950/50 dark:border-gray-800 dark:text-white dark:placeholder-gray-600 dark:focus:border-cyan-500 dark:focus:ring-cyan-500
                            "
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-gray-400 group-focus-within:text-cyan-600 dark:text-gray-500 dark:group-focus-within:text-cyan-400" size={20} />
                        <input 
                            type="password" 
                            required
                            placeholder="Password"
                            className="
                                w-full rounded-xl py-3.5 pl-12 pr-4 transition-all focus:outline-none focus:ring-1 border
                                bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500
                                dark:bg-gray-950/50 dark:border-gray-800 dark:text-white dark:placeholder-gray-600 dark:focus:border-cyan-500 dark:focus:ring-cyan-500
                            "
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="
                            w-full font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg
                            bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/20
                            dark:shadow-[0_0_20px_rgba(6,182,212,0.4)]
                        "
                    >
                        Sign In
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
                    Don't have an account? {' '}
                    <Link to="/register" className="font-semibold transition-colors text-cyan-600 hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
