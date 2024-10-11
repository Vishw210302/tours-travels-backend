const express = require('express');
const apiRoute = express.Router();
const apiController = require('../apiController/Controller');

// razorpay API

const { createPaymentIntent, veryFyPayment } = require("../apiController/payments.controller");
apiRoute.post("/create-payment-intent", createPaymentIntent);
apiRoute.post("/verifyPayment", veryFyPayment);

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
apiRoute.get('/get-itenary-detailsd', apiController.getItenaryDetails);


// Itenary Id vise Details API
apiRoute.get('/get-particular-itenary/:id', apiController.getParticularItenary)
apiRoute.get('/get-all-details-itenary/:id', apiController.allDetailsOfItenaty)

// Testimonial API
apiRoute.get('/get-testimonial', apiController.getTestimonialListing);
apiRoute.post('/add-testimonial-review', apiController.postTestimonialReview)
apiRoute.delete('/delete-testimonial/:id', apiController.deleteTestimonial);

// Cities Listing API
apiRoute.get('/get-all-cities', apiController.getAllCitiesListing);
apiRoute.get('/get-all-country', apiController.getAllCountryListing);

// Contact Us API
apiRoute.post('/contact-us-post', apiController.postContactUsAPI);
apiRoute.get('/get-contact-us-review', apiController.getContactUsReview);
apiRoute.delete('/delete-contact-us-review/:id', apiController.deleteContactUsReview);

// Branch Listing API
apiRoute.get('/get-branch-listing/:id', apiController.getAllBranchListing);
apiRoute.get('/get-branch-location', apiController.getAllBranchLocation);
apiRoute.delete('/delete-branch-details/:id', apiController.deleteBranchDetails);
apiRoute.delete('/delete-branch-location/:id', apiController.deleteBranchLocation);

// Blogs Listing API
apiRoute.get('/get-blog-listing', apiController.getBlogListing);
apiRoute.delete('/delete-blogs/:id', apiController.deleteBlogs);

// Search Flights API 
apiRoute.post('/search-flights-details', apiController.searchFligthsDetails);
// apiRoute.get('/get-flights-logo', apiController.getDefaultFlightsLogo);
apiRoute.get('/get-special-flight-data_V_P_D', apiController.getSpecialFlightsData);
apiRoute.get('/get-particular-flight/:key/:id', apiController.getParticularFlightById);

// Youtube Videos API
apiRoute.get('/get-youtube-videos', apiController.getYoutubeVideos);
apiRoute.delete('/delete-youtube-URL/:id', apiController.deleteYoutubeURL);

// Team Members Details API
apiRoute.get('/get-all-members-details', apiController.getAllMembersDetails);
apiRoute.delete('/delete-team-members/:id', apiController.deleteTeamMembers);

// About Us Contetnt API
apiRoute.get('/get-about-us-content', apiController.getAllAboutUsContent);
apiRoute.delete('/delete-about-us-content/:id', apiController.deleteAboutUsContent);

//  Promo Code API
apiRoute.get('/get-all-promocode-lisitng', apiController.getAllPromoCodeListing);
apiRoute.delete('/delete-promoCode/:id', apiController.deletePromoCode);

// Discount Coupon API
apiRoute.get('/get-all-discount-coupon', apiController.getAllDiscountCoupon);
apiRoute.delete('/delete-discount-coupon/:id', apiController.deleteDiscountCoupon);

// Inquery API
apiRoute.post('/inquery-post', apiController.postInqueryAPI)
apiRoute.get('/get-inqueries-details', apiController.getInqueriesDetails);
apiRoute.delete('/delete-inqueries/:id', apiController.deleteInqueries);

// Tickets Booking (Passanger Details) API
// apiRoute.post('/tickets-booking', apiController.postTicketsBooking)
apiRoute.post('/add-passenger-details', apiController.addPassengerDetails)

// Flight Meal Details API 
apiRoute.get('/get-flight-meals', apiController.getFlightMealListing);
apiRoute.get('/get-particular-meal-listing/:id', apiController.getParticularMealListing);
apiRoute.delete('/delete-flight-meal/:id', apiController.deleteFlightMeal);
apiRoute.delete('/delete-particular-flight-meal/:id', apiController.deletParticularFlightMeal);

// Flight Seat API
apiRoute.get('/get-flights-seats/:id', apiController.getFlightSeatsListing)

// Flight Tickets API
apiRoute.post("/addFlightTicketsData", apiController.addFlightTicketsData)

module.exports = apiRoute;