const express = require('express');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const router = express.Router();

// View All Appointments
router.get('/appointments', async (req, res) => {
    const appointments = await Appointment.find().populate('user').populate('doctor');
    res.json(appointments);
});

// Set Appointment Status
router.put('/appointment/:id/status', async (req, res) => {
    const { status } = req.body;
    await Appointment.findByIdAndUpdate(req.params.id, { status });
    res.send('Status Updated');
});

// View All Doctors
router.get('/doctors', async (req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);
});

// Add Doctor
router.post('/doctor', async (req, res) => {
    const { name, specialization, contact } = req.body;
    const doctor = new Doctor({ name, specialization, contact });
    await doctor.save();
    res.send('Doctor Added');
});

// Add Admin
router.post('/admin', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({ name, email, password: hashedPassword, role: 'admin' });
    await admin.save();
    res.send('Admin Added');
});

module.exports = router;
