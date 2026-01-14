import { createContext, useContext, useState, useEffect } from 'react';

const HospitalContext = createContext();

export const useHospitalData = () => {
    return useContext(HospitalContext);
};

export const HospitalProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark'); // Default to dark for CyberMed legacy
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Theme Effect
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Initial Load checks for logged in user and fetches data if exists
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Fetch Data when user is logged in
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
                        fetch('/api/patients'),
                        fetch('/api/doctors'),
                        fetch('/api/appointments')
                    ]);

                    const patientsData = await patientsRes.json();
                    const doctorsData = await doctorsRes.json();
                    const appointmentsData = await appointmentsRes.json();

                    setPatients(patientsData);
                    setDoctors(doctorsData);
                    setAppointments(appointmentsData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [user]);

    // Auth Actions
    const login = async (email, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            return { success: false, error: "Network error" };
        }
    };

    const register = async (userData) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await res.json();
            if (res.ok) {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            return { success: false, error: "Network error" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setPatients([]);
        setDoctors([]);
        setAppointments([]);
    };

    // Data Actions
    const addPatient = async (patient) => {
        try {
            const res = await fetch('/api/patients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(patient)
            });
            const newPatient = await res.json();
            setPatients(prev => [...prev, newPatient]);
        } catch (error) {
            console.error("Error adding patient:", error);
        }
    };

    const addDoctor = async (doctor) => {
        try {
            const res = await fetch('/api/doctors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doctor)
            });
            const newDoctor = await res.json();
            setDoctors(prev => [...prev, newDoctor]);
        } catch (error) {
            console.error("Error adding doctor:", error);
        }
    };

    const bookAppointment = async (appointment) => {
        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointment)
            });
            const newAppointment = await res.json();
            setAppointments(prev => [...prev, newAppointment]);
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    const deletePatient = async (id) => {
        try {
            await fetch(`/api/patients/${id}`, { method: 'DELETE' });
            setPatients(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error("Error deleting patient:", error);
        }
    };

    return (
        <HospitalContext.Provider value={{
            user, loading, login, register, logout,
            theme, toggleTheme,
            patients, doctors, appointments,
            addPatient, addDoctor, bookAppointment, deletePatient
        }}>
            {children}
        </HospitalContext.Provider>
    );
};
