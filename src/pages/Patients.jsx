import { useState } from 'react';
import { useHospitalData } from '../context/HospitalContext';
import { Plus, X, Trash2, Search } from 'lucide-react';

const Patients = () => {
    const { patients, addPatient, deletePatient, user } = useHospitalData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', age: '', gender: 'Male', condition: '', admitted: '' });

    const canAddPatient = ['Patient', 'Nurse', 'Admin'].includes(user?.role);

    const handleSubmit = (e) => {
        e.preventDefault();
        addPatient(formData);
        setIsModalOpen(false);
        setFormData({ name: '', age: '', gender: 'Male', condition: '', admitted: '' });
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Patient Database</h2>
                    <p className="text-gray-500 dark:text-gray-400">Manage patient records and admission details.</p>
                </div>
                {canAddPatient && (
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="
                            flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all transform hover:-translate-y-0.5
                            bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/30
                            dark:bg-gradient-to-r dark:from-cyan-600 dark:to-cyan-500 dark:hover:from-cyan-500 dark:hover:to-cyan-400 dark:text-black dark:shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]
                        "
                    >
                        <Plus size={20} /> New Admission
                    </button>
                )}
            </div>

            <div className="
                rounded-2xl shadow-xl overflow-hidden border
                bg-white border-gray-100 dark:bg-gray-900/50 dark:backdrop-blur-sm dark:border-gray-800
            ">
                {/* Toolbar */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search patients..." 
                            className="
                                w-full rounded-lg pl-10 pr-4 py-2 transition-all focus:outline-none focus:ring-1 
                                bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500
                                dark:bg-gray-950 dark:border-gray-800 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-cyan-500/50 dark:focus:ring-cyan-500/50
                            "
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="
                            uppercase text-xs font-semibold tracking-wider
                            bg-gray-50 text-gray-500 dark:bg-gray-950/50 dark:text-gray-400
                        ">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Age</th>
                                <th className="px-6 py-4">Gender</th>
                                <th className="px-6 py-4">Condition</th>
                                <th className="px-6 py-4">Admitted</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {patients.map(patient => (
                                <tr key={patient.id} className="group transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40">
                                    <td className="px-6 py-4 font-medium transition-colors text-gray-900 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">{patient.name}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{patient.age}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{patient.gender}</td>
                                    <td className="px-6 py-4">
                                        <span className="
                                            px-3 py-1 text-xs font-semibold rounded-full border shadow-sm
                                            bg-yellow-100 text-yellow-700 border-yellow-200
                                            dark:bg-yellow-900/20 dark:text-yellow-500 dark:border-yellow-500/20 dark:shadow-[0_0_10px_rgba(234,179,8,0.1)]
                                        ">
                                            {patient.condition}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{patient.admitted}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => deletePatient(patient.id)}
                                            className="
                                                p-2 rounded-lg transition-colors
                                                text-gray-400 hover:text-rose-600 hover:bg-rose-50
                                                dark:text-gray-500 dark:hover:text-rose-400 dark:hover:bg-rose-400/10
                                            "
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {patients.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        No patients found in the database.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Patient Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm dark:bg-black/80">
                    <div className="
                        w-full max-w-md p-6 relative overflow-hidden rounded-2xl shadow-2xl border
                        bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-800
                    ">
                        {/* Glow effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-500 dark:to-fuchsia-500"></div>
                        
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">New Admission</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">Full Name</label>
                                <input 
                                    required 
                                    type="text" 
                                    className="
                                        w-full px-4 py-2 rounded-xl transition-all outline-none border focus:ring-1
                                        bg-gray-50 border-gray-200 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500
                                        dark:bg-gray-950 dark:border-gray-800 dark:text-white dark:focus:border-cyan-500 dark:focus:ring-cyan-500
                                    "
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">Age</label>
                                    <input 
                                        required 
                                        type="number" 
                                        className="
                                            w-full px-4 py-2 rounded-xl transition-all outline-none border focus:ring-1
                                            bg-gray-50 border-gray-200 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500
                                            dark:bg-gray-950 dark:border-gray-800 dark:text-white dark:focus:border-cyan-500 dark:focus:ring-cyan-500
                                        "
                                        value={formData.age}
                                        onChange={e => setFormData({...formData, age: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">Gender</label>
                                    <select 
                                        className="
                                            w-full px-4 py-2 rounded-xl transition-all outline-none border focus:ring-1 appearance-none
                                            bg-gray-50 border-gray-200 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500
                                            dark:bg-gray-950 dark:border-gray-800 dark:text-white dark:focus:border-cyan-500 dark:focus:ring-cyan-500
                                        "
                                        value={formData.gender}
                                        onChange={e => setFormData({...formData, gender: e.target.value})}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">Condition</label>
                                <input 
                                    required 
                                    type="text" 
                                    className="
                                        w-full px-4 py-2 rounded-xl transition-all outline-none border focus:ring-1
                                        bg-gray-50 border-gray-200 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500
                                        dark:bg-gray-950 dark:border-gray-800 dark:text-white dark:focus:border-cyan-500 dark:focus:ring-cyan-500
                                    "
                                    value={formData.condition}
                                    onChange={e => setFormData({...formData, condition: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">Admission Date</label>
                                <input 
                                    required 
                                    type="date" 
                                    className="
                                        w-full px-4 py-2 rounded-xl transition-all outline-none border focus:ring-1
                                        bg-gray-50 border-gray-200 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500
                                        dark:bg-gray-950 dark:border-gray-800 dark:text-white dark:focus:border-cyan-500 dark:focus:ring-cyan-500 dark:[color-scheme:dark]
                                    "
                                    value={formData.admitted}
                                    onChange={e => setFormData({...formData, admitted: e.target.value})}
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="
                                    w-full font-bold py-3 rounded-xl transition-all mt-6 shadow-lg
                                    bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-500/20
                                    dark:bg-cyan-600 dark:hover:bg-cyan-500 dark:text-white dark:shadow-[0_0_15px_rgba(8,145,178,0.4)]
                                "
                            >
                                Confirm Admission
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Patients;
