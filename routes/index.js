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

  Staff.findById(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})


// UPDATE SPECIFIC STAFF MEMBER (crUd)
// /api/edit-staff/:id	
// PUT	
// Request body: JSON	
// Edits the specified staff member


router.post('/edit-staff/:id', upload.single('file'), (req, res, next) => {

  // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   res.status(400).json({ message: 'Specified id is not valid' });
  //   return;
  // }

  Staff.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    phoneNumber: req.body.phoneNumber,
    color: req.body.color,
    birthday: req.body.birthday,
    email: req.body.email,
    file: req.file.url
  })

    .then((updatedUser) => {
      if (updatedUser === null) {
        res.json({ message: 'sorry we could not find this user' })
        return;
      }
      res.json({ message: `Staff Member with ${req.params.id} has been updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})


// DELETE STAFF MEMBER (cruD)
// /api/delete-staff/:id	
// DELETE	
// Request body: (empty)	
// Deletes the specified staff member

// router.delete('/delete-staff/:id', (req, res, next) => {

//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   Staff.findByIdAndRemove(req.params.id)
//     .then(() => {
//       res.json({ message: `Staff Member with ${req.params.id} has been successfully removed .` });
//     })
//     .catch(err => {
//       res.json({ message: `Staff Member with ${req.params.id} has NOT been removed.`, err });
//     })
// })

router.post('/delete-staff/:id', (req, res, next) => {

  Staff.findByIdAndRemove(req.params.id)
    .then((deletedStaff) => {
      res.json([
        { message: 'Staff successfully deleted' },
        deletedStaff
      ])
    })
    .catch((err) => {
      res.json([{ message: 'sorry this staff member could not be found' }, err])
    })
});

module.exports = router;
