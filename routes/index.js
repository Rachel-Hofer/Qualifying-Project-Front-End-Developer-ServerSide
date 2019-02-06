const express = require('express');
const router = express.Router();
const Staff = require('../models/StaffModel')
const mongoose = require('mongoose');
const upload = require('../config/cloud');

// SHOW ALL STAFF (cRud)
// /api/all-staff	
// GET	
// Request body: (empty)	
// Returns all staff members

router.get('/all-staff', (req, res, next) => {
  Staff.find()
    .then(allStaff => {
      res.json(allStaff);
    })
    .catch(err => {
      res.json(err);
    })
});


// CREATE (Crud)
// /api/create-staff	
// POST	
// Request body: JSON	
// Adds a new staff member

router.post('/create-staff', upload.single('file'), (req, res, next) => {

  Staff.create({

    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    phoneNumber: req.body.phoneNumber,
    color: req.body.color,
    birthday: req.body.birthday,
    email: req.body.email,
    file: req.file.url

  })

    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});


// GET SPECIFIC STAFF MEMBER (cRud)
// /api/staff/:id	
// GET	
// Request body: (empty)	
// Returns the specified staff member

router.get('/staff/:id', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Project.findById(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})


// UPDATE SPECIFIC STAFF MEMBER (crUd)
// /api/projects/:id	
// PUT	
// Request body: JSON	
// Edits the specified staff member

router.put('/staff/:id', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Staff.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Staff Member with ${req.params.id} has been updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})


// DELETE STAFF MEMBER (cruD)
// /api/projects/:id	
// DELETE	
// Request body: (empty)	
// Deletes the specified staff member

router.delete('/staff/:id', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Staff.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Staff Member with ${req.params.id} has been successfully removed .` });
    })
    .catch(err => {
      res.json(err);
    })
})


module.exports = router;
