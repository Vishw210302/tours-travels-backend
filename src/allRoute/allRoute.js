const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const adminController = require('../adminController/adminController');
const { upload } = require('../utils/multer');

// Register and Login and Dashboard Routes
router.post('/register-data', adminController.registerApi);
router.get('/', adminController.index);

// Flights Routes
router.post('/add-flights-details', upload('/special-flight-image').single('flightsImage'), adminController.addFlightDetails);

// Sliders  Routes
router.get('/allSliderListing', adminController.allSliderListing);
router.get('/add-slider', adminController.addHomePageSlider);
router.get('/get-edit-slider/:id', adminController.getEditSlider);
router.post('/add-slider-listing', upload('/Slider-Image').single('slider'), adminController.addBannerSlider);
router.get('/slider-delete/:id', adminController.sliderDelete);

// Brands Name 
router.get('/allBrandListing', adminController.allBrandsListing);
router.get('/add-brand-logo', adminController.addHomePageBrandLogo);
router.post('/add-brands-logo-listing', upload('/brands-logo').single('brand'), adminController.addBrandLogoImage);

// Pacakages Routes
router.get('/packages', adminController.allPackagesListing);
router.get('/add-packages', adminController.addPackages);

// All Siteseen Route
router.get('/allSiteSeenListing', adminController.allSiteSeenListing);
router.get('/add-SiteSeen', adminController.addSiteSeen);
router.post('/add-siteSeen-images', upload('/siteseen-image').single('siteseen'), adminController.addSiteSeenImage);
router.get('/siteseen-update-page/:id', adminController.updateSiteSeenPage)
router.post('/update-site-seen/:id', upload('/siteseen-image').single('siteseen'), adminController.updateSiteSeen)

// Domestic Packages Routes
router.get('/domesticPackagesListing', adminController.allDomesticPackagesListing);
router.get('/internationalPackagesListing', adminController.allInternatioanlPackagesListing);
router.get('/particularFilePackages/:id', adminController.particularFilePackages);
router.get('/particularDomesticItenary/:id', adminController.particularDomesticItenary);

// Itenary Package Create Api 
router.get('/allDetailsItenaryDetails', adminController.allDetailsItenaryDetails);
router.post('/add-itenary-create-package', upload('/itenary-package').single('bannerImage'), adminController.addItenaryPackageImage);
router.get('/add-day-itenary-page/:firstId/:secondId', adminController.adddDayWiseItenaryPage);
router.post('/add-day-itenary', uploads.none(), adminController.adddDayWiseItenary);
router.post('/edit-day-itenary/:id', uploads.none(), adminController.updateDayItenary);
router.get('/package-price-page/:id', adminController.addPackagePricePage);
router.post('/add-price-details', adminController.addPriceDetails);
router.get("/all-itenaries-packagesvise/:id", adminController.getAllDetailsOfItenaty)
router.get('/allInclusionAndExclusion', adminController.allInclusionAndExclusion);
router.post('/add-inclusion-exclusion', adminController.addInclusionAndExclusion);

// All Testimonial API
router.get('/allTestimonialListing', adminController.allTestimonialListing);
router.post('/add-testimonial-review', adminController.addTestimonialReview);
router.put('/testimonial/status/:id', adminController.updateTestimonialStatus);
router.get('/delete-testimonial/:id', adminController.deleteTestimonial);

// Contact us API
router.get('/allContactUsListing', adminController.allContactUsListing);
router.get('/admin-delete-review/:id', adminController.reviewDeleteMessage);

// Cities API
router.get('/allCitiesListing', adminController.allCitiesListing);

// Branch Name API
router.get('/allBranchNameListing/:id', adminController.allBranchNameListing);
router.get('/add-branch/:id', adminController.addBranchName);
router.post('/add-branch-details', adminController.addBranchDetails);
router.get('/delete-branch-details/:id', adminController.adminDeleteBranchDetails);
router.get('/allBranchLocation', adminController.allBranchLocation);
router.get('/add-branch-location', adminController.addBranchLocation);
router.post('/post-branch-location', adminController.postBranchLocation);
router.get('/delete-branch-location/:id', adminController.adminDeleteBranchLocation);
router.get('/editBranchNameListing/:id', adminController.editBranchNameListing);
router.post('/update-branch-name/:id', adminController.updateBranchName);

// Blogs API
router.get('/allBlogsListing', adminController.allBlogsListing);
router.get('/addBlogs', adminController.addBlogs);
router.post('/add-blog-listing', upload('/blogs-image').fields([{ name: 'blogImage', maxCount: 1 }, { name: 'blogGallery', maxCount: 10 }]), adminController.addBlogListing);
router.get('/delete-blogs-listing/:id', adminController.adminDeleteBlogs);

// Youtube API
router.get('/allYoutubeVideos', adminController.allYoutubeVideos);
router.get('/add-youtube-videos', adminController.addYoutubeVideos);
router.post('/add-youtube-URL', adminController.addYoutubeURL);
router.get('/delete-youtube-URL/:id', adminController.deleteYoutubeURL);

// Team Members API
router.get('/allTeamMembersImage', adminController.allTeamMembersImage);
router.get('/add-team-members', adminController.addTeamMembers);
router.post('/add-team-members-details', upload('/team-member').single('teamMemberImage'), adminController.addTeamMemberDetails);
router.get('/delete-team-members/:id', adminController.deleteTeamMembers);

// About Us Content API
router.get('/aboutUsPageContent', adminController.aboutUsPageContent);
router.get('/addAboutUsContent', adminController.addAboutUsContent);
router.post('/addAboutUsImage', adminController.addAboutUsImage);
router.get('/delete-about-us-content/:id', adminController.deleteAboutUsContent);

// All Inquery API
router.get('/inqueriesListing', adminController.inqueriesListing);
router.get('/delete-inqueries/:id', adminController.deleteInqueries);

// Promo codes API
router.get('/promoListing', adminController.promoListing);
router.get('/add-promoCodes', adminController.addPromoCodesListing);
router.put('/promoCodes/status/:id', adminController.updatePromoCodesStatus);
router.post('/post-promoCodes', adminController.postPromoCodes);
router.get('/delete-promoCode/:id', adminController.deletePromoCode);

// Discount Coupon API
router.get('/discountCouponListing', adminController.discountCouponListing);
router.get('/add-discount-Coupon', adminController.addDiscountCoupon);
router.put('/discountCodes/status/:id', adminController.updateDiscountCouponCode);
router.get('/delete-discount-coupon/:id', adminController.deleteDiscountCoupon);

// Flight Meal Details API
router.get('/mealListing', adminController.mealListing);
router.get('/add-meal-listing', adminController.addMealListing);
router.post('/post-meal-categories', adminController.postMealCategories);
router.get('/mealCategoriesItemListing/:id', adminController.mealCategoriesItemListing);
router.post('/post-meal-items-categories', upload('/meal-items-image').single('mealItemsImage'), adminController.postMealItemsDetails);
router.get('/get-particular-meal-listing/:id', adminController.getParticulrMealListing);

// Api Routes
router.post('/add-packages-listing', upload('/packages-Image').single('packageImage'), adminController.addPackagesListing);
router.get('/admin-delete-package/:id', adminController.adminDeletePackages);


// router.get('/testRoute', adminController.testRoute);

module.exports = router;