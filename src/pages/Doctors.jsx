import { useState } from 'react';
import { useHospitalData } from '../context/HospitalContext';
import { Plus, X, Stethoscope } from 'lucide-react';

const Doctors = () => {
    const { doctors, addDoctor, user } = useHospitalData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', specialization: '', available: true });

    const canAddDoctor = ['Nurse', 'Admin'].includes(user?.role);

    const handleSubmit = (e) => {
        e.preventDefault();
        addDoctor(formData);
        setIsModalOpen(false);
        setFormData({ name: '', specialization: '', available: true });
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Medical Staff</h2>
                    <p className="text-gray-500 dark:text-gray-400">View and manage doctor availability and profiles.</p>
                </div>
                {canAddDoctor && (
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="
                            flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all transform hover:-translate-y-0.5
                            bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-lg shadow-fuchsia-500/30
                            dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-fuchsia-500 dark:hover:from-fuchsia-500 dark:hover:to-fuchsia-400 dark:text-white dark:shadow-[0_0_15px_rgba(217,70,239,0.3)] dark:hover:shadow-[0_0_25px_rgba(217,70,239,0.5)]
                        "
                    >
                        <Plus size={20} /> Add Doctor
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map(doctor => (
                    <div key={doctor.id} className="
                        group relative p-8 rounded-2xl border transition-all duration-300 shadow-sm
                        bg-white border-gray-100 hover:border-gray-200 hover:shadow-md
                        dark:bg-gray-900/50 dark:backdrop-blur-sm dark:border-gray-800 dark:hover:border-gray-700 dark:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]
                    ">
                        {/* Glow effect on hover (Dark mode only) */}
                        <div className="hidden dark:block absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="hidden dark:block absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="
                                w-24 h-24 rounded-full p-1 mb-4 shadow-inner
                                bg-gray-100
                                dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900
                            ">
                                <div className="
                                    w-full h-full rounded-full flex items-center justify-center text-3xl font-bold border transition-colors
                                    bg-white border-gray-200 text-cyan-600 group-hover:border-cyan-300
                                    dark:bg-gray-950 dark:border-gray-800 dark:text-cyan-400 dark:group-hover:border-cyan-500/50
                                ">
                                    {doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-1 transition-colors text-gray-900 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">{doctor.name}</h3>
                            <div className="flex items-center gap-2 text-sm mb-6 text-gray-500 dark:text-gray-500">
                                <Stethoscope size={16} />
                                {doctor.specialization}
                            </div>
                            <span className={`
                                px-4 py-1.5 text-sm font-semibold rounded-full border
                                ${doctor.available 
                                    ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/10 dark:border-green-500/30 dark:text-green-400 dark:shadow-[0_0_10px_rgba(74,222,128,0.1)]' 
                                    : 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/10 dark:border-rose-500/30 dark:text-rose-400 dark:shadow-[0_0_10px_rgba(251,113,133,0.1)]'
                                }
                            `}>
                                {doctor.available ? '● Available Now' : '○ Currently Busy'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Doctor Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm dark:bg-black/80">
                    <div className="
                         w-full max-w-md p-6 relative overflow-hidden rounded-2xl shadow-2xl border
                         bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-800
                    ">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500"></div>
                        
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add Medical Staff</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">Doctor Name</label>
                                <input 
                                    required 
                                    type="text" 
                                    placeholder="e.g. Dr. John Doe"
                                    className="
                                        w-full px-4 py-2 rounded-xl transition-all outline-none border focus:ring-1
                                        bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-fuchsia-500 focus:ring-fuchsia-500
                                        dark:bg-gray-950 dark:border-gray-800 dark:text-white dark:placeholder-gray-600 dark:focus:border-fuchsia-500 dark:focus:ring-fuchsia-500
                                    "
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">Specialization</label>
                                <input 
                                    required 
                                    type="text" 
                                    placeholder="e.g. Cardiology"
                                    className="
                                        w-full px-4 py-2 rounded-xl transition-all outline-none border focus:ring-1
                                        bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-fuchsia-500 focus:ring-fuchsia-500
                                        dark:bg-gray-950 dark:border-gray-800 dark:text-white dark:placeholder-gray-600 dark:focus:border-fuchsia-500 dark:focus:ring-fuchsia-500
                                    "
                                    value={formData.specialization}
                                    onChange={e => setFormData({...formData, specialization: e.target.value})}
                                />
                            </div>
                            <div className="
                                flex items-center gap-3 p-3 rounded-xl border
                                bg-gray-50 border-gray-200
                                dark:bg-gray-950 dark:border-gray-800
                            ">
                                <input 
                                    type="checkbox" 
                                    id="available"
                                    checked={formData.available}
                                    onChange={e => setFormData({...formData, available: e.target.checked})}
                                    className="w-5 h-5 text-fuchsia-600 rounded border-gray-300 focus:ring-fuchsia-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-offset-gray-900"
                                />
                                <label htmlFor="available" className="text-sm font-medium text-gray-700 dark:text-gray-300">Currently Available</label>
                            </div>
                            <button 
                                type="submit" 
                                className="
                                    w-full font-bold py-3 rounded-xl transition-all mt-4 shadow-lg
                                    bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-fuchsia-500/20
                                    dark:bg-fuchsia-600 dark:hover:bg-fuchsia-500 dark:shadow-[0_0_15px_rgba(192,38,211,0.4)]
                                "
                            >
                                Confirm Addition
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Doctors;
