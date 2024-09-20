const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const adminController = require('../adminController/adminController');
const { upload } = require('../utils/multer');

// Register and Login Routes
router.post('/register-data', adminController.registerApi);

// Flights Routes
router.get('/', adminController.index);
router.get('/all-flights', adminController.getAllFlights);
router.get('/add-flights', adminController.addFlights);

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
router.get('/package-price-page/:id', adminController.addPackagePricePage);
router.post('/add-price-details', adminController.addPriceDetails);
router.get("/all-itenaries-packagesvise/:id", adminController.getAllDetailsOfItenaty)
router.get('/allInclusionAndExclusion', adminController.allInclusionAndExclusion);
router.post('/add-inclusion-exclusion', adminController.addInclusionAndExclusion);

// All Testimonial API
router.get('/allTestimonialListing', adminController.allTestimonialListing);
router.post('/add-testimonial-review', adminController.addTestimonialReview);
router.put('/testimonial/status/:id', adminController.updateTestimonialStatus);

// Contact us API
router.get('/allContactUsListing', adminController.allContactUsListing);
router.get('/admin-delete-review/:id', adminController.reviewDeleteMessage);

// Cities API
router.get('/allCitiesListing', adminController.allCitiesListing);

// Api Routes
router.post('/add-packages-listing', upload('/packages-Image').single('packageImage'), adminController.addPackagesListing);
router.get('/admin-delete-package/:id', adminController.adminDeletePackages);

module.exports = router;