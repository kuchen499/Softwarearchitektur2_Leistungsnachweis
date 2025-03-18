import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Freizeitpark from './components/Freizeitpark';
import Attraktionen from './components/Attraktionen';
import Touren from './components/Touren';
import Login from './components/Login';
import { AppBar, Toolbar, Button } from '@mui/material';
import { CartProvider } from './components/CartContext';
import ShoppingCart from './components/ShoppingCart';

function App() {
    const [isDirector, setIsDirector] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const handleLogout = () => {
        setIsDirector(false);
    };

    return (
        <CartProvider>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" component={Link} to="/">Freizeitpark</Button>
                        <Button color="inherit" component={Link} to="/attraktionen">Attraktionen</Button>
                        <Button color="inherit" component={Link} to="/touren">Touren</Button>
                        <Button color="inherit" onClick={() => setCartOpen(true)}>Warenkorb</Button>
                        {!isDirector ? (
                            <Button color="inherit" component={Link} to="/login">Adminlogin</Button>
                        ) : (
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        )}
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route path="/" element={<Freizeitpark isDirector={isDirector} />} />
                    <Route path="/attraktionen" element={<Attraktionen isDirector={isDirector} />} />
                    <Route path="/touren" element={<Touren isDirector={isDirector} />} />
                    <Route path="/login" element={<Login setIsDirector={setIsDirector} />} />
                </Routes>
                <ShoppingCart open={cartOpen} onClose={() => setCartOpen(false)} />
            </Router>
        </CartProvider>
    );
}

export default App;
