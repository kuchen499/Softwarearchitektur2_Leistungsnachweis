import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { CartContext } from './CartContext';

const ShoppingCart = ({ open, onClose }) => {
    const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);

    const handleCheckout = () => {
        // Hier könntest du auch die Bestellung an das Backend senden.
        // Für diese Aufgabe simulieren wir den Checkout:
        console.log("Checkout:", cartItems);
        clearCart();
        onClose();
        alert("Vielen Dank für Ihren Einkauf! Ihre Bestellung wurde aufgegeben.");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Ihr Einkaufswagen</DialogTitle>
            <DialogContent>
                {cartItems.length === 0 ? (
                    <Typography>Ihr Einkaufswagen ist leer.</Typography>
                ) : (
                    <List>
                        {cartItems.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`${item.type === 'entrance' ? 'Eintrittsticket' : 'Tour Ticket'} – Menge: ${item.quantity}`}
                                    secondary={`Preis: ${(item.price * item.quantity).toFixed(2)} €`}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                    Gesamtpreis: {getTotalPrice().toFixed(2)} €
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Schließen</Button>
                {cartItems.length > 0 && <Button onClick={handleCheckout} color="primary">Jetzt bezahlen und kaufen</Button>}
            </DialogActions>
        </Dialog>
    );
};

export default ShoppingCart;
