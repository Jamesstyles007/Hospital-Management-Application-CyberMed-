# CyberMed Hospital Management System

**CyberMed** is a futuristic, full-stack Hospital Management System designed to streamline hospital operations with a modern interface and robust role-based access control.

![CyberMed](https://images.unsplash.com/photo-1538108149393-fbbd8189718c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)
_(Note: Placeholder image for visualization)_

## 🚀 Features

### 🎨 Dual-Theme UI

- **CyberMed Dark Mode**: A high-contrast, neon-styled interface with glassmorphism effects for a modern, futuristic feel.
- **Clean Medical Light Mode**: A professional, bright, and accessible traditional medical interface.
- **Persistent Theming**: Remembers your preference between sessions.

### 🛡️ Role-Based Access Control (RBAC)

Secure authentication with 4 distinct roles, each with tailored dashboards and permissions:

| Role        | Permissions                                       | Dashboard View           |
| ----------- | ------------------------------------------------- | ------------------------ |
| **Patient** | View personal appointments, Book new appointments | Personal Health Overview |
| **Nurse**   | Add Patients, Add Doctors                         | Ward Management & Vitals |
| **Doctor**  | View functionality, Add Appointments              | Daily Schedule & Rounds  |
| **Admin**   | Full System Access (Add/Edit/Delete All)          | System Control Center    |

### 🏥 Core Modules

- **Dashboard**: Real-time analytics showing patient count, staff availability, and appointment load.
- **Patient Database**: Manage patient admissions, medical condition, and history.
- **Staff Directory**: Track doctors, their specialization, and real-time availability status.
- **Appointment Scheduling**: integrated booking system linking patients to doctors.

---

## 🛠️ Tech Stack

### Frontend

- **React 19**: Latest features including Hooks and Context API.
- **Tailwind CSS v4**: High-performance, utility-first styling with custom configurations.
- **React Router v7**: Client-side routing with protected route guards.
- **Lucide React**: Modern, consistent icon set.

### Backend

- **Node.js & Express**: Lightweight RESTful API handling data requests.
- **MongoDB & Mongoose**: Robust NoSQL database with schema modeling.
- **CORS**: Secure cross-origin resource sharing.

---

## 📦 Installation & Setup

### Prerequisites

- Node.js installed.
- **MongoDB** installed and running locally on port 27017.

### Steps

1.  **Clone the repository** (if applicable) or navigate to the project folder.

2.  **Install Frontend Dependencies**:

    ```bash
    npm install
    ```

3.  **Install Backend Dependencies**:
    Navigate to the server directory:

    ```bash
    cd server
    npm install
    ```

4.  **Start the Application**:
    You need to run both the backend server and the frontend client.

    **Terminal 1 (Backend):**

    ```bash
    cd server
    npm run dev
    ```

    _Server runs on http://localhost:5000 and connects to MongoDB_

    **Terminal 2 (Frontend):**

    ```bash
    # (From project root)
    npm run dev
    ```

    _Client runs on http://localhost:5173_

---

## 🔐 Default Users

Since this project uses a local database, you will need to **Register** your first user on the `/register` page.

Roles available for selection during registration:

- `Patient`
- `Nurse`
- `Doctor`
- `Admin`

---

## 📂 Project Structure

```
advance-1/
├── server/                 # Backend Node.js/Express Server
│   ├── models/             # Mongoose Schemas (User, Patient, Doctor, Appointment)
│   ├── server.js           # API Endpoints & DB Connection
│   └── .env                # Environment Variables
├── src/                    # Frontend React Application
│   ├── components/         # Reusable UI (Layout, etc.)
│   ├── context/            # HospitalContext (State management)
│   ├── pages/              # Route Components (Dashboard, Login, etc.)
│   ├── App.jsx             # Main App Component & Routing
│   └── index.css           # Tailwind Imports & Config
├── package.json            # Frontend Dependencies
└── vite.config.js          # Vite Configuration (Proxy setup)
```

## 📝 License

This project is for educational and development purposes.
