const express = require('express');
const apiRoute = express.Router();
const apiController = require('../apiController/Controller');


// razorpay API
const { createPaymentIntent, veryFyPayment } = require("../apiController/payments.controller");
const apicontroller = require('../apiController/Controller');
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

apiRoute.get('/get-itenary-by-categories/:key', apiController.getItenaryByCategories);


// Itenary Id vise Details API
apiRoute.get('/get-particular-itenary/:id', apiController.getParticularItenary)
apiRoute.get('/get-all-details-itenary/:id', apiController.allDetailsOfItenaty)

// Testimonial API
apiRoute.get('/get-testimonial', apiController.getTestimonialListing);
apiRoute.get('/get-testimonial-active', apiController.getTestimonialListingActive);
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
apiRoute.get('/get-passengers-by-contact-id', apiController.getPassengerDetailsByContactId)

// Flight Meal Details API 
apiRoute.get('/get-flight-meals', apiController.getFlightMealListing);
apiRoute.get('/get-particular-meal-listing/:id', apiController.getParticularMealListing);
apiRoute.delete('/delete-flight-meal/:id', apiController.deleteFlightMeal);
apiRoute.delete('/delete-particular-flight-meal/:id', apiController.deletParticularFlightMeal);
apiRoute.post('/update-meal-order', apiController.updateMealOrder)
apiRoute.get('/updated-meal-order', apiController.getUpdatedMealOrder)

// Flight Seat API
apiRoute.get('/get-flights-seats/:id', apiController.getFlightSeatsListing)
apiRoute.post('/update-seat', apiController.updateSeat)
apiRoute.get('/get-flights-updated-seat', apiController.getFlightUpdatedSeat)

//get flight booking details
apiRoute.get('/get-all-flight-booking-details', apiController.getFlightAllBookingDetails)

// Social Media Link API
apiRoute.get('/get-social-media-link', apiController.getSocialMediaLink);
apiRoute.delete('/delete-social-media-link/:id', apiController.deleteSocialMediaLink);

// Inquery API
apiRoute.post('/inquery-post', apiController.postInqueryAPI)
apiRoute.get('/get-inqueries-details', apiController.getInqueriesDetails);
apiRoute.delete('/delete-inqueries/:id', apiController.deleteInqueries);

// Contact us Hotel API
apiRoute.post('/contact-us-post-hotel', apiController.postContactUsHotelAPI);
apiRoute.get('/get-contact-us-review-hotel', apiController.getContactUsReviewHotel);
apiRoute.delete('/delete-contact-us-review-hotels/:id', apiController.deleteContactUsReviewHotels);

// Hotel's Testimonial Review API
apiRoute.post('/post-hotel-testimonial-review', apiController.postHotelTestimonialReview);
apiRoute.get('/get-testimonial-hotel', apiController.getTestimonialHotelListing);
apiRoute.get('/get-testimonial-active-hotel', apiController.getTestimonialListingActiveHotel);
apiRoute.delete('/delete-hotel-testimonial-review/:id', apiController.deletehotelTestimonialReview);

// Packages Theme API
apiRoute.get('/get-package-theme', apiController.getPackageTheme);
apiRoute.get('/get-package-theme-active', apiController.getPackageThemeActive);
apiRoute.delete('/delete-package-theme/:id', apiController.deletePackageTheme);

// Hotel Coupon Code API
apiRoute.get('/get-all-coupon-code', apiController.getAllCouponCodeListing);
apiRoute.get('/get-all-coupon-code-active', apiController.getAllCouponCodeActiveListing);
apiRoute.delete('/delete-coupon-code-hotel/:id', apiController.deleteCouponCodeHotel);

// Hotel Listing API 
apiRoute.get('/get-all-hotel-listing', apicontroller.getAllHotelListing)
apiRoute.get('/get-particular-hotel-listing/:city', apicontroller.getParticularHotelListing)

// Setting API for frontend
apiRoute.get('/get-setting-listing', apicontroller.getAllSetingListing)
apiRoute.delete('/delete-setting-listing/:id', apiController.deleteSettingListing);

// Flight Tickets Get API
apiRoute.post("/addFlightTicketsData", apiController.addFlightTicketsData)

module.exports = apiRoute;