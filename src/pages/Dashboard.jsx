import { useHospitalData } from '../context/HospitalContext';
import { Users, UserPlus, Calendar, Activity, Zap, ClipboardList, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ label, value, icon: Icon, colorClass, borderClass, lightColorClass, lightBorderClass }) => (
    <div className={`
        relative overflow-hidden group p-6 rounded-2xl shadow-lg transition-all duration-300
        bg-white border border-gray-100 dark:bg-gray-900/50 dark:backdrop-blur-sm dark:border-gray-800
        ${borderClass}
    `}>
        <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-500 ${colorClass}`}></div>
        <div className="flex items-center justify-between relative z-10">
            <div>
                <p className="text-sm font-medium uppercase tracking-wider mb-2 text-gray-500 dark:text-gray-400">{label}</p>
                <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</h3>
            </div>
            <div className={`
                p-3 rounded-xl shadow-sm
                bg-gray-50 text-gray-600 dark:bg-gray-800/80 dark:text-white dark:bg-opacity-10
                ${colorClass} dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]
            `}>
                <Icon size={24} className="dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const { user, patients, doctors, appointments } = useHospitalData();

    // -- Role: Patient View --
    if (user?.role === 'Patient') {
        const myAppointments = appointments.filter(a => a.patientName === user.name); 
        
        return (
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">Welcome, {user.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400">Managing your health journey.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatCard 
                        label="My Appointments" 
                        value={myAppointments.length} 
                        icon={Calendar} 
                        colorClass="text-violet-600 dark:text-violet-400 dark:bg-violet-400"
                        borderClass="hover:border-violet-200 dark:border-violet-500/30 dark:hover:border-violet-400/60"
                    />
                     <Link to="/appointments" className="block">
                        <div className="
                            h-full p-6 rounded-2xl border border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer group
                            bg-white border-gray-300 hover:border-cyan-500 hover:bg-cyan-50
                            dark:bg-gray-900/50 dark:backdrop-blur-sm dark:border-gray-700 dark:hover:border-cyan-500 dark:hover:bg-gray-900/80
                        ">
                            <div className="
                                w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform
                                bg-cyan-100 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400
                            ">
                                <Activity size={32} />
                            </div>
                            <h3 className="text-xl font-bold transition-colors text-gray-900 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">Book New Appointment</h3>
                            <p className="text-sm mt-2 text-gray-500 dark:text-gray-500">Schedule a visit with our specialists</p>
                        </div>
                    </Link>
                </div>

                <div className="
                    p-6 rounded-2xl shadow-xl border
                    bg-white border-gray-100 dark:bg-gray-900/50 dark:backdrop-blur-sm dark:border-gray-800
                ">
                    <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Upcoming Schedule</h3>
                    {myAppointments.length === 0 ? (
                        <p className="text-gray-500">No scheduled appointments.</p>
                    ) : (
                        <div className="space-y-4">
                            {myAppointments.map(apt => (
                                <div key={apt.id} className="
                                    flex justify-between items-center p-4 rounded-xl border
                                    bg-gray-50 border-gray-100 dark:bg-gray-900 dark:border-gray-800
                                ">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Dr. {apt.doctorName}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{apt.date} at {apt.time}</p>
                                    </div>
                                    <span className="
                                        px-3 py-1 rounded-full text-xs font-bold border
                                        bg-violet-100 text-violet-700 border-violet-200
                                        dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-500/30
                                    ">
                                        {apt.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // -- Role: Doctor View --
    if (user?.role === 'Doctor') {
        const myAppointments = appointments.filter(a => a.doctorName.includes(user.name.split(' ')[1])); 
        
        return (
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">Dr. {user.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400">Daily Rounds & Schedule</p>
                    </div>
                    <div className="
                        flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border
                        bg-green-100 text-green-700 border-green-200
                        dark:bg-green-900/30 dark:text-green-400 dark:border-green-500/30
                    ">
                        <div className="w-2 h-2 rounded-full animate-pulse bg-green-600 dark:bg-green-500"></div>
                        On Duty
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard 
                        label="Appointments Today" 
                        value={myAppointments.length} 
                        icon={ClipboardList} 
                        colorClass="text-fuchsia-600 dark:text-fuchsia-400 dark:bg-fuchsia-400"
                        borderClass="hover:border-fuchsia-200 dark:border-fuchsia-500/30 dark:hover:border-fuchsia-400/60"
                    />
                    <StatCard 
                        label="Total Patients" 
                        value={patients.length} 
                        icon={Users} 
                        colorClass="text-cyan-600 dark:text-cyan-400 dark:bg-cyan-400"
                        borderClass="hover:border-cyan-200 dark:border-cyan-500/30 dark:hover:border-cyan-400/60"
                    />
                </div>
                
                 <div className="
                    p-6 rounded-2xl shadow-xl border
                    bg-white border-gray-100 dark:bg-gray-900/50 dark:backdrop-blur-sm dark:border-gray-800
                 ">
                    <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Today's Appointments</h3>
                    <div className="space-y-2">
                         {myAppointments.length === 0 ? <p className="text-gray-500">No appointments found.</p> : 
                            myAppointments.map(apt => (
                                <div key={apt.id} className="
                                    p-4 rounded-lg flex justify-between border
                                    bg-gray-50 border-gray-100 dark:bg-gray-900 dark:border-gray-800
                                ">
                                    <span className="text-gray-900 dark:text-white">{apt.patientName}</span>
                                    <span className="text-gray-500 dark:text-gray-400">{apt.time}</span>
                                </div>
                            ))
                         }
                    </div>
                 </div>
            </div>
        );
    }


    // -- Role: Admin / Nurse (Default View) --
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">
                        {user?.role === 'Admin' ? 'Admin Control' : 'Ward Dashboard'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">System functionality normal. Realtime data active.</p>
                </div>
                {user?.role === 'Admin' && (
                     <div className="
                        px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 border
                        bg-red-100 text-red-700 border-red-200
                        dark:bg-red-900/30 dark:text-red-400 dark:border-red-500/30
                     ">
                        <Shield size={14} /> Admin Access
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    label="Total Patients" 
                    value={patients.length} 
                    icon={Users} 
                    colorClass="text-cyan-600 dark:text-cyan-400 dark:bg-cyan-400"
                    borderClass="hover:border-cyan-200 dark:border-cyan-500/30 dark:hover:border-cyan-400/60"
                />
                <StatCard 
                    label="Active Staff" 
                    value={doctors.length} 
                    icon={UserPlus} 
                    colorClass="text-fuchsia-600 dark:text-fuchsia-400 dark:bg-fuchsia-400"
                    borderClass="hover:border-fuchsia-200 dark:border-fuchsia-500/30 dark:hover:border-fuchsia-400/60"
                />
                <StatCard 
                    label="Appointments" 
                    value={appointments.length} 
                    icon={Calendar} 
                    colorClass="text-violet-600 dark:text-violet-400 dark:bg-violet-400"
                    borderClass="hover:border-violet-200 dark:border-violet-500/30 dark:hover:border-violet-400/60"
                />
                <StatCard 
                    label="Critical Load" 
                    value={patients.filter(p => p.condition === 'Critical').length} 
                    icon={Zap} 
                    colorClass="text-rose-600 dark:text-rose-400 dark:bg-rose-400"
                    borderClass="hover:border-rose-200 dark:border-rose-500/30 dark:hover:border-rose-400/60"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Patients */}
                <div className="
                    p-6 rounded-2xl shadow-xl border
                    bg-white border-gray-100 dark:bg-gray-900/50 dark:backdrop-blur-sm dark:border-gray-800
                ">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                        <span className="w-1 h-6 rounded-full shadow-sm bg-cyan-500 dark:shadow-[0_0_10px_#06b6d4]"></span>
                        Recent Admissions
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-gray-50 border-b border-gray-100 text-gray-500 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-500">
                                <tr>
                                    <th className="px-4 py-3">Patient</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {patients.slice(-5).reverse().map(patient => (
                                    <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-200">{patient.name}</td>
                                        <td className="px-4 py-3">
                                            <span className="font-medium text-cyan-600 dark:text-cyan-400">{patient.condition}</span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">{patient.admitted}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Staff Availability */}
                <div className="
                    p-6 rounded-2xl shadow-xl border
                    bg-white border-gray-100 dark:bg-gray-900/50 dark:backdrop-blur-sm dark:border-gray-800
                ">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                        <span className="w-1 h-6 rounded-full shadow-sm bg-fuchsia-500 dark:shadow-[0_0_10px_#d946ef]"></span>
                        Staff Status
                    </h3>
                    <div className="space-y-4">
                        {doctors.map(doctor => (
                            <div key={doctor.id} className="
                                flex items-center justify-between p-3 rounded-xl transition-all border
                                bg-gray-50 border-gray-100 hover:border-gray-200
                                dark:bg-gray-900 dark:border-gray-800 dark:hover:border-gray-700
                            ">
                                <div className="flex items-center gap-3">
                                    <div className="
                                        w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-inner
                                        bg-gray-200 text-cyan-700 
                                        dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 dark:border dark:border-gray-700 dark:text-cyan-400
                                    ">
                                        {doctor.name.charAt(4)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-gray-200">{doctor.name}</p>
                                        <p className="text-xs text-gray-500">{doctor.specialization}</p>
                                    </div>
                                </div>
                                <div className={`
                                    flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border
                                    ${doctor.available 
                                        ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-500/30 dark:text-green-400' 
                                        : 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:border-rose-500/30 dark:text-rose-400'
                                    }
                                `}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${doctor.available ? 'bg-green-500 dark:bg-green-400 animate-pulse' : 'bg-rose-500 dark:bg-rose-400'}`}></div>
                                    {doctor.available ? 'Ready' : 'Busy'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
