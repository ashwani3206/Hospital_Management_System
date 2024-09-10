const express = require('express');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const router = express.Router();

// Book Appointment
router.post('/book', async (req, res) => {
    const { userId, doctorId, date } = req.body;
    const appointment = new Appointment({ user: userId, doctor: doctorId, date });
    await appointment.save();
    res.send('Appointment Booked');
});

module.exports = router;
