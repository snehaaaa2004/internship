import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminPage from './components/Admin';
import UserPage from './components/User';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Logsign from './components/Logsign';
import Signup from './components/Signup';

import EditUsers from './components/EditUser';
import EditScreen from './components/EditScreen';
import Header from './components/Header';
import About from './components/About'
import ContactUs from './components/ContactUs';
import AdminMessages from './components/AdminMessages';
import Footer from './components/Footer';
import Logout from './components/Logout';
import ProgressDashboard from './components/ProgressDashboard';

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
        <Route path="/logout" element={< Logout/>} />
        <Route path="/progressdash" element={< ProgressDashboard/>} />
        
        {/* Protected Admin Route */}
        <Route path="/admin" element={<PrivateRoute role="admin" />}>
          <Route index element={<AdminPage />} />
        </Route>

        {/* Protected User Route */}
        <Route path="/user" element={<PrivateRoute role="user" />}>
          <Route index element={<UserPage />} />
        </Route>

        

        {/* 👇 New Combined Styled Progress Page */}
        <Route
             path="/progressdash"
             element={
            <ProgressDashboard
             userId={userId}
             refresh={refresh}
             onAdd={handleAdd}
           />
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
