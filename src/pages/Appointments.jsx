import { useState } from 'react';
import { useHospitalData } from '../context/HospitalContext';
import { Plus, Calendar as CalendarIcon, Clock, User, ChevronRight } from 'lucide-react';

const Appointments = () => {
    const { appointments, patients, doctors, bookAppointment, user } = useHospitalData();
    
    const canAddAppointment = ['Doctor', 'Admin'].includes(user?.role);
    
    // Simple mock logic for booking form
    const [patientId, setPatientId] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const patient = patients.find(p => p.id === patientId);
        const doctor = doctors.find(d => d.id === doctorId);
        
        if (patient && doctor) {
            bookAppointment({
                patientName: patient.name,
                doctorName: doctor.name,
                date,
                time
            });
            // Reset
            setPatientId('');
            setDoctorId('');
            setDate('');
            setTime('');
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form - Restricted Access */}
            {canAddAppointment && (
            <div className="lg:col-span-1">
                <div className="
                    rounded-2xl shadow-xl border overflow-hidden sticky top-6
                    bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-800
                ">
                    <div className="p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                            <Plus size={20} className="text-violet-600 dark:text-violet-400" /> 
                            New Appointment
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* ... form content ... */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">Select Patient</label>
                            <select 
                                required 
                                className="
                                    w-full px-4 py-3 rounded-xl transition-all outline-none border focus:ring-1 appearance-none
                                    bg-gray-50 border-gray-200 text-gray-900 focus:border-violet-500 focus:ring-violet-500
                                    dark:bg-gray-950 dark:border-gray-800 dark:text-white dark:focus:border-violet-500 dark:focus:ring-violet-500
                                "
                                value={patientId}
                                onChange={e => setPatientId(e.target.value)}
                            >
                                <option value="">Select a Patient</option>
                                {patients.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">Select Doctor</label>
                            <select 
                                required
                                className="
                                    w-full px-4 py-3 rounded-xl transition-all outline-none border focus:ring-1 appearance-none
                                    bg-gray-50 border-gray-200 text-gray-900 focus:border-violet-500 focus:ring-violet-500
                                    dark:bg-gray-950 dark:border-gray-800 dark:text-white dark:focus:border-violet-500 dark:focus:ring-violet-500
                                "
                                value={doctorId}
                                onChange={e => setDoctorId(e.target.value)}
                            >
                                <option value="">Select a Doctor</option>
                                {doctors.map(d => (
                                    <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">Date</label>
                                <input 
                                    required 
                                    type="date"
                                    className="
                                        w-full px-4 py-3 rounded-xl transition-all outline-none border focus:ring-1
                                        bg-gray-50 border-gray-200 text-gray-900 focus:border-violet-500 focus:ring-violet-500
                                        dark:bg-gray-950 dark:border-gray-800 dark:text-white dark:focus:border-violet-500 dark:focus:ring-violet-500 dark:[color-scheme:dark]
                                    "
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">Time</label>
                                <input 
                                    required 
                                    type="time" 
                                    className="
                                        w-full px-4 py-3 rounded-xl transition-all outline-none border focus:ring-1
                                        bg-gray-50 border-gray-200 text-gray-900 focus:border-violet-500 focus:ring-violet-500
                                        dark:bg-gray-950 dark:border-gray-800 dark:text-white dark:focus:border-violet-500 dark:focus:ring-violet-500 dark:[color-scheme:dark]
                                    "
                                    value={time}
                                    onChange={e => setTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="
                                w-full font-bold py-3.5 rounded-xl transition-all mt-4 shadow-lg flex items-center justify-center gap-2 group
                                bg-violet-600 hover:bg-violet-700 text-white shadow-violet-500/20
                                dark:bg-violet-600 dark:hover:bg-violet-500 dark:shadow-[0_0_15px_rgba(124,58,237,0.4)]
                            "
                        >
                            Confirm Booking
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
            )}

            {/* Appointments List - Expands if form hidden */}
            <div className={canAddAppointment ? "lg:col-span-2" : "lg:col-span-3"}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Scheduled Appointments</h3>
                    <div className="
                        text-sm text-center px-3 py-1 rounded-lg border
                        bg-gray-50 border-gray-200 text-gray-600
                        dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400
                    ">
                        Today: <span className="font-bold text-violet-600 dark:text-violet-400">{appointments.length}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {appointments.length === 0 ? (
                        <div className="
                            rounded-2xl p-12 text-center border
                            bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-800
                        ">
                            <CalendarIcon size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-700" />
                            <p className="text-lg text-gray-500 dark:text-gray-500">No appointments active.</p>
                        </div>
                    ) : (
                        appointments.slice().reverse().map(apt => (
                            <div key={apt.id} className="
                                group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border transition-all shadow-sm
                                bg-white border-gray-100 hover:border-violet-200 hover:shadow-md
                                dark:bg-gray-900/80 dark:backdrop-blur-sm dark:border-gray-800 dark:hover:border-violet-500/50 dark:hover:bg-gray-900 dark:hover:shadow-[0_0_20px_rgba(124,58,237,0.1)]
                            ">
                                <div className="flex items-center gap-5 mb-4 sm:mb-0">
                                    <div className="
                                        w-14 h-14 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105
                                        bg-violet-50 text-violet-600 border-violet-100
                                        dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-500/20
                                    ">
                                        <CalendarIcon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg transition-colors text-gray-900 group-hover:text-violet-600 dark:text-gray-100 dark:group-hover:text-violet-400">{apt.patientName}</h4>
                                        <p className="text-sm flex items-center gap-2 text-gray-500 dark:text-gray-500">
                                            <span className="flex items-center gap-1"><User size={14} /> {apt.doctorName}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 sm:text-right">
                                    <div>
                                        <p className="font-semibold text-gray-700 dark:text-gray-200">{apt.date}</p>
                                        <p className="text-sm font-medium flex items-center sm:justify-end gap-1 text-violet-600 dark:text-violet-400">
                                            <Clock size={14} /> {apt.time}
                                        </p>
                                    </div>
                                    <div className="
                                        px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wide border shadow-sm
                                        bg-violet-50 text-violet-700 border-violet-200
                                        dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-500/20 dark:shadow-[0_0_10px_rgba(124,58,237,0.15)]
                                    ">
                                        {apt.status}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Appointments;
