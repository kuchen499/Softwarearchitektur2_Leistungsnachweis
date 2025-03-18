import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

const TicketPurchaseDialog = ({ open, onClose, onConfirm }) => {
    const [entranceTickets, setEntranceTickets] = useState(0);
    const [tourTickets, setTourTickets] = useState(0);
    const priceEntrance = 20.0;
    const priceTour = 30.0;

    const totalPrice = entranceTickets * priceEntrance + tourTickets * priceTour;

    const handleConfirm = () => {
        onConfirm({ entranceTickets, tourTickets });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Tickets kaufen</DialogTitle>
            <DialogContent>
                <TextField
                    label="Eintrittskarten"
                    type="number"
                    value={entranceTickets}
                    onChange={(e) => setEntranceTickets(parseInt(e.target.value) || 0)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Touren Tickets"
                    type="number"
                    value={tourTickets}
                    onChange={(e) => setTourTickets(parseInt(e.target.value) || 0)}
                    fullWidth
                    margin="normal"
                />
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                    Gesamtpreis: {totalPrice.toFixed(2)} €
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Abbrechen</Button>
                <Button onClick={handleConfirm} color="primary">Kaufen</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TicketPurchaseDialog;
