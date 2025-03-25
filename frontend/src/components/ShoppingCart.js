import React, { useContext } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, List, ListItem, ListItemText, Divider
} from '@mui/material';
import { CartContext } from './CartContext';

const ShoppingCart = ({ open, onClose }) => {
    const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);

    const entranceItems = cartItems.filter(item => item.type === 'entrance');
    const totalAdults = entranceItems.reduce((sum, i) => sum + (i.details?.adultTickets || 0), 0);
    const totalChildren = entranceItems.reduce((sum, i) => sum + (i.details?.childTickets || 0), 0);
    const entranceTotal = entranceItems.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0);

    const tourItems = cartItems.filter(item => item.type === 'tour');

    const handleCheckout = () => {
        clearCart();
        onClose();
        alert("Vielen Dank für Ihren Einkauf! Ihre Bestellung wurde aufgegeben.");
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Ihr Einkaufswagen</DialogTitle>
            <DialogContent>
                {cartItems.length === 0 ? (
                    <Typography>Ihr Einkaufswagen ist leer.</Typography>
                ) : (
                    <List>
                        {entranceItems.length > 0 && (
                            <>
                                <ListItem>
                                    <ListItemText
                                        primary="Eintrittstickets"
                                        secondary={`Erwachsene: ${totalAdults} | Kinder: ${totalChildren} — Gesamt: ${entranceTotal.toFixed(2)} €`}
                                    />
                                </ListItem>
                                <Divider />
                            </>
                        )}
                        {tourItems.map((item, idx) => (
                            <ListItem key={idx}>
                                <ListItemText
                                    primary={`Tour: ${item.details?.tourName ?? 'Unbekannte Tour'}`}
                                    secondary={`Menge: ${item.quantity || 1} — Gesamt: ${(item.price * (item.quantity || 1)).toFixed(2)} €`}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
                <Typography variant="h6" sx={{ mt: 3 }}>
                    Gesamtpreis: {getTotalPrice().toFixed(2)} €
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Schließen</Button>
                {cartItems.length > 0 && (
                    <Button variant="contained" onClick={handleCheckout}>Jetzt bezahlen</Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ShoppingCart;
