// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const countryRouter = express.Router();

// ********* require Country model in order to use it for CRUD *********
const Country = require('../models/Country.model');
const uploadCloud = require("../configs/cloudinary-setup");

// ****************************************************************************************
// POST route to create a new country in the DB
// ****************************************************************************************

// <form action="/countries" method="POST">
countryRouter.post('/api/countries', uploadCloud.single("pictureUrl"),(req, res, next) => {
  const countryInputInfo = req.body;
  countryInputInfo.pictureUrl = req.file.path
  
  Country.create(countryInputInfo)
    .then(countryDoc => res.status(200).json(countryDoc))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET all countries from the DB
// ****************************************************************************************

countryRouter.get('/api/countries', (req, res, next) => {
  Country.find() // <-- .find() method gives us always an ARRAY back
    .then(countriesFromDB => res.status(200).json({ countries: countriesFromDB }))
    .catch(err => next(err));
});

// ****************************************************************************************
// POST route to delete the country 
// ****************************************************************************************

// <form action="/books/{{this._id}}/delete" method="post">
countryRouter.post('/api/countries/:countryId/delete', (req, res) => {
  Country.findByIdAndRemove(req.params.countryId)
    .then(() => res.json({ message: 'Successfully removed!' }))
    .catch(err => next(err));
});

// ****************************************************************************************
// POST route to save the updates
// ****************************************************************************************

// <form action="/books/{{foundBook._id}}/update" method="POST">
countryRouter.post('/api/countries/:id/update', (req, res) => {
  Country.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedCountry => res.status(200).json({ country: updatedCountry }))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET route for getting the country details
// ****************************************************************************************

countryRouter.get('/api/countries/:someCountryId', (req, res) => {
  Country.findById(req.params.someCountryId)
    .populate('country')
    .then(foundCountry => res.status(200).json({ country: foundCountry }))
    .catch(err => next(err));
});

module.exports = countryRouter;
