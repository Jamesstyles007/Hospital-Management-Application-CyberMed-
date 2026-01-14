import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHospitalData } from '../context/HospitalContext';
import { User, Lock, Mail, ArrowRight, Shield } from 'lucide-react';

const Register = () => {
    const { register } = useHospitalData();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Patient' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await register(formData);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gray-50 dark:bg-black transition-colors duration-300">
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full blur-[100px] bg-fuchsia-200/40 dark:bg-fuchsia-500/20"></div>
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full blur-[100px] bg-violet-200/40 dark:bg-violet-500/20"></div>
            </div>

            <div className="
                relative z-10 w-full max-w-md p-8 rounded-3xl shadow-2xl border
                bg-white/80 backdrop-blur-xl border-gray-200
                dark:bg-gray-900/60 dark:border-gray-800
            ">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Create Account</h2>
                    <p className="text-gray-500 dark:text-gray-400">Join the CyberMed Network</p>
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

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-gray-400 group-focus-within:text-fuchsia-600 dark:text-gray-500 dark:group-focus-within:text-fuchsia-400" size={20} />
                        <input 
                            type="text" 
                            required
                            placeholder="Full Name"
                            className="
                                w-full rounded-xl py-3.5 pl-12 pr-4 transition-all focus:outline-none focus:ring-1 border
                                bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-fuchsia-500 focus:ring-fuchsia-500
                                dark:bg-gray-950/50 dark:border-gray-800 dark:text-white dark:placeholder-gray-600 dark:focus:border-fuchsia-500 dark:focus:ring-fuchsia-500
                            "
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-gray-400 group-focus-within:text-fuchsia-600 dark:text-gray-500 dark:group-focus-within:text-fuchsia-400" size={20} />
                        <input 
                            type="email" 
                            required
                            placeholder="Email Address"
                            className="
                                w-full rounded-xl py-3.5 pl-12 pr-4 transition-all focus:outline-none focus:ring-1 border
                                bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-fuchsia-500 focus:ring-fuchsia-500
                                dark:bg-gray-950/50 dark:border-gray-800 dark:text-white dark:placeholder-gray-600 dark:focus:border-fuchsia-500 dark:focus:ring-fuchsia-500
                            "
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-gray-400 group-focus-within:text-fuchsia-600 dark:text-gray-500 dark:group-focus-within:text-fuchsia-400" size={20} />
                        <input 
                            type="password" 
                            required
                            placeholder="Password"
                            className="
                                w-full rounded-xl py-3.5 pl-12 pr-4 transition-all focus:outline-none focus:ring-1 border
                                bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-fuchsia-500 focus:ring-fuchsia-500
                                dark:bg-gray-950/50 dark:border-gray-800 dark:text-white dark:placeholder-gray-600 dark:focus:border-fuchsia-500 dark:focus:ring-fuchsia-500
                            "
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <div className="relative group">
                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-gray-400 group-focus-within:text-fuchsia-600 dark:text-gray-500 dark:group-focus-within:text-fuchsia-400" size={20} />
                        <select 
                            className="
                                w-full rounded-xl py-3.5 pl-12 pr-4 transition-all focus:outline-none focus:ring-1 border appearance-none
                                bg-gray-50 border-gray-200 text-gray-900 focus:border-fuchsia-500 focus:ring-fuchsia-500
                                dark:bg-gray-950/50 dark:border-gray-800 dark:text-white dark:focus:border-fuchsia-500 dark:focus:ring-fuchsia-500
                            "
                            value={formData.role}
                            onChange={e => setFormData({...formData, role: e.target.value})}
                        >
                            <option value="Patient">Patient</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="
                            w-full font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group mt-2 shadow-lg
                            bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white shadow-fuchsia-500/20
                            dark:shadow-[0_0_20px_rgba(217,70,239,0.4)]
                        "
                    >
                        Create Account
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
                    Already have an account? {' '}
                    <Link to="/login" className="font-semibold transition-colors text-fuchsia-600 hover:text-fuchsia-500 dark:text-fuchsia-400 dark:hover:text-fuchsia-300">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
