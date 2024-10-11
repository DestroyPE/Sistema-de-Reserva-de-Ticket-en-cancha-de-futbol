import express from 'express';

const router = express.Router();

router.get('/yenque', (req, res) => {
    res.render('home');
});

router.get('/manco', (req, res) => {
    const centroId = req.query.centro;
    const imageUrl = `/img/center_${centroId}.png`;
    res.render('centerDetails',{centroId, imageUrl});
});

// Ruta para la página de reserva
router.get('/neil', (req, res) => {
    const { fecha, horarios, total, centroId} = req.query; // Recibir los parámetros de la reserva
    res.render('booking', { fecha, horarios, total, centroId});
});

router.get('/canepa', (req, res) => {
    const { nombre, dni, centroId, fecha, horarios, total } = req.query; // Recibe los parámetros del frontend
    res.render('paymentMethods', { nombre, dni, centroId, fecha, horarios, total });
});

router.get('/cesar', (req, res) => {
    const { nombre, dni, centroId, fecha, horarios, total, metodo } = req.query;
    res.render('paymentQr', { nombre, dni, centroId, fecha, horarios, total, metodo });
});

router.get('/bonifaz', (req, res) => {
    const { nombre, dni, centroId, fecha, horarios, total, metodo } = req.query;
    res.render('paymentSuccess', { nombre, dni, centroId, fecha, horarios, total, metodo });
});
export default router;