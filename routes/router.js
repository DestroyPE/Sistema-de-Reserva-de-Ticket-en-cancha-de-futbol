import express from 'express';

const router = express.Router();

router.get('/manco', (req, res) => {
    res.render('centerDetails');
});

router.get('/neil', (req, res) => {
    res.render('booking');
});

router.get('/canepa', (req, res) => {
    res.render('paymentMethods');
});

router.get('/cesar', (req, res) => {
    res.render('paymentQr');
});

router.get('/bonifaz', (req, res) => {
    res.render('paymentSuccess');
});
export default router;