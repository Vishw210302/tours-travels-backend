const express = require('express');
const apiRoute = express.Router();
const apiController = require('../apiController/Controller');

// Package API
apiRoute.post('/add-packagessss', apiController.addPackages);
apiRoute.get('/get-packages', apiController.getPackages);
apiRoute.delete('/delete-package/:id', apiController.deletePackages);
apiRoute.get('/particularPackage/:id', apiController.particularPackageId);

// Slider API
apiRoute.get('/get-slider', apiController.getSlider);
apiRoute.delete('/slider-delete/:id', apiController.deleteHomePageSlider);

// Brands API
apiRoute.get('/get-brands', apiController.getBrands);

// siteseen API
apiRoute.get('/get-siteSeen', apiController.getSiteSeen);

// Packages Itenary Details
apiRoute.get('/get-itenary-details', apiController.getItenaryDetails);

// Itenary Id vise Details API
apiRoute.get('/get-particular-itenary/:id', apiController.getParticularItenary)
apiRoute.get('/get-all-details-itenary/:id', apiController.allDetailsOfItenaty)

// Testimonial API
apiRoute.get('/get-testimonial', apiController.getTestimonialListing);

// Contact Us API
apiRoute.post('/contact-us-post', apiController.postContactUsAPI)
apiRoute.get('/get-contact-us-review', apiController.getContactUsReview);
apiRoute.delete('/delete-contact-us-review/:id', apiController.deleteContactUsReview);

module.exports = apiRoute;