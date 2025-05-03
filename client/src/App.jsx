import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminPage from './components/Admin';
import UserPage from './components/User';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Logsign from './components/Logsign';
import Signup from './components/Signup';
import ProgressForm from './components/ProgressForm';
import ProgressList from './components/ProgressList';
import EditUsers from './components/EditUser';
import EditScreen from './components/EditScreen';
import Header from './components/Header';
import About from './components/About'
import ContactUs from './components/ContactUs';
import AdminMessages from './components/AdminMessages';
import Footer from './components/Footer';
const App = () => {
  const [refresh, setRefresh] = useState(false);
  const userId = '6622f0e6f9c3d88e2f5a3c9a';

  const handleAdd = () => setRefresh(!refresh);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<Logsign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/edit-user" element={<EditUsers />} />
        <Route path="/screen/:id" element={<EditScreen />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact us" element={<ContactUs />} />
        <Route path="/mess" element={< AdminMessages/>} />


        {/* Protected Admin Route */}
        <Route path="/admin" element={<PrivateRoute role="admin" />}>
          <Route index element={<AdminPage />} />
        </Route>

        {/* Protected User Route */}
        <Route path="/user" element={<PrivateRoute role="user" />}>
          <Route index element={<UserPage />} />
        </Route>

        {/* Original Progress Form and List Pages */}
        <Route
          path="/progress-form"
          element={<ProgressForm userId={userId} onAdd={handleAdd} />}
        />
        <Route
          path="/progress-list"
          element={<ProgressList userId={userId} refresh={refresh} />}
        />

        {/* 👇 New Combined Styled Progress Page */}
        <Route
          path="/progress"
          element={
            <div style={styles.container}>
              <div style={styles.card}>
                <h1 style={styles.heading}>Fitness Progress Tracker</h1>
                <ProgressForm userId={userId} onAdd={handleAdd} />
                <h2 style={styles.subheading}>Progress History</h2>
                <ProgressList userId={userId} refresh={refresh} />
              </div>
            </div>
          }
        />
      </Routes>
      <Footer/>
    </Router>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #83a4d4, #b6fbff)',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: '#ffffffcc',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    width: '100%',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '2rem',
    color: '#003366',
  },
  subheading: {
    marginTop: '2rem',
    fontSize: '1.3rem',
    color: '#003366',
  }
};

export default App;
