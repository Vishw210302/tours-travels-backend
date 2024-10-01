const adminController = {};
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { format, parseISO } = require('date-fns');
const packages = require('../../src/schema/adminPanelSchema/packagesSchema');
const sliderSchema = require('../schema/sliderSchema/sliderSchema');
const brandsLogo = require('../schema/brandsSchema/brandsSchema');
const siteSeen = require('../schema/siteSeensSchema/siteSeenSchema');
const packagesDetailsItenary = require('../schema/itenaryShema/packagesDetailsItenary');
const itenary = require('../schema/itenaryShema/packagesDetailsItenary');
const itenaryDetails = require('../schema/itenaryShema/dayWiseItenaryDetails');
const itenaryPriceDetails = require('../schema/itenaryShema/itenaryPriceDetails');
const testimonial = require('../schema/testimonialSchema/testimonialSchema');
const registerPage = require('../schema/registerPageSchema/registerPageSchema');
const InclusionAndExclusion = require('../schema/inclusionAndExclusionSchema/inclusionAndExclusionSchema');
const branch = require('../schema/branchSchema/allBranchSchema');
const locationBranch = require('../schema/branchSchema/branchLocationSchema');
const sanitizeHtml = require('sanitize-html');
const blogs = require('../schema/blogsSchema/blogsSchema');
const airport_cities = require('../schema/airportCitiesSchema/airportCitiesSchema');
const specialFlights = require('../schema/specialFlightsSchema/specialFlightsSchema');
const youtubeURL = require('../schema/youtubeVideosSchema/youtubeVideosSchema');
const teamMemberDetails = require('../schema/teamMemberSchema/teamMemberSchema');
const aboutUsContentImage = require('../schema/aboutUsSchema/aboutUsSchema');
const { upload } = require('../utils/multer');
require('dotenv').config()

adminController.index = async (req, res) => {
    try {
        res.render("admin-panel/adminPanel")
    } catch (error) {
        console.log("error", error)
    }
}

adminController.loginPage = async (req, res) => {
    try {
        res.render("admin-panel/authPage/loginPage")
    } catch (error) {
        console.log("error", error)
    }
}

adminController.registerPage = async (req, res) => {
    try {
        res.render("admin-panel/authPage/registerPage")
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addFlightDetails = async (req, res) => {
    try {
        const addFlightsDetails = new specialFlights({
            flightsImage: req.file.filename,
            flightsFrom: req.body.flightsFrom,
            flightsTo: req.body.flightsTo,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime,
            totalTime: req.body.totalTime,
            hold: req.body.hold,
            fromAirportCode: req.body.fromAirportCode,
            toAirportCode: req.body.toAirportCode,
            fromAirportName: req.body.fromAirportName,
            toAirportName: req.body.toAirportName,
            pnrNumber: req.body.pnrNumber,
            flightsType: req.body.flightsType,
        });
        await addFlightsDetails.save();
        res.status(200).json({ message: "Special Flights added successfully" });
    } catch (error) {
        console.log("error", error)
    }
}

adminController.allSliderListing = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-slider`);
        if (response.data.status == true) {
            res.render("admin-panel/slider/sliderListing", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.getEditSlider = async (req, res) => {
    try {
        const sliderId = req.params.id;
        const slider = await sliderSchema.findById(sliderId);
        if (!slider) {
            console.log("Error get in listing in packages")
        }
        res.render("admin-panel/slider/editHomePageSlider", { data: slider })
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

adminController.addHomePageSlider = async (req, res) => {
    try {
        res.render("admin-panel/slider/addHomePageSlider")
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addBannerSlider = async (req, res) => {
    try {
        const addSlider = new sliderSchema({
            key: req.body.key,
            slider: req.file.filename
        });
        await addSlider.save();
        res.redirect('/admin/allSliderListing')
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.sliderDelete = async (req, res) => {
    try {
        const response = await axios.delete(`${process.env.baseUrl}/api/slider-delete/${req.params.id}`);
        if (response.data.status && response.data.status == true) {
            res.redirect("/admin/allSliderListing")
        } else {
            console.log("Error add in Slider")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

adminController.allPackagesListing = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-packages`);
        if (response.data.status == true) {
            res.render("admin-panel/packagesListing/allPackagesListing", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }

    } catch (error) {
        console.log("error", error)
    }
}

adminController.addPackages = async (req, res) => {
    try {
        res.render("admin-panel/packagesListing/addPackages")
    } catch (error) {
        console.log("error", error)
    }
}

adminController.allDomesticPackagesListing = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-packages`);
        if (response.data.status == true) {
            res.render("admin-panel/domesticPackages/domesticPackagesListing", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.allInternatioanlPackagesListing = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-packages`);
        if (response.data.status == true) {
            res.render("admin-panel/internationalPackages/internationalPackagesListing", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.particularFilePackages = async (req, res) => {
    try {

        const response = await axios.get(`${process.env.baseUrl}/api/get-particular-itenary/${req.params.id}`);


        const packageData = response.data
        res.render("admin-panel/domesticPackages/particularFilePackages", { packageData: packageData[0] })

    } catch (error) {
        console.log("error", error)
    }
}

adminController.particularDomesticItenary = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/particularPackage/${req.params.id}`);

        if (response.data.status && response.data.status == true) {
            res.render("admin-panel/domesticPackages/particularDomesticItenary", { data: response.data.data })
        } else {
            console.log("Error add in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.allPackageListing = async (req, res) => {
    try {
        const allPackages = await packages.find();
        res.status(200).json(allPackages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

adminController.addPackagesListing = async (req, res) => {
    try {
        const { categories, packageName } = req.body
        const payload = {
            categories, packageName, packageImage: req.file.filename
        }
        const response = await axios.post(`${process.env.baseUrl}/api/add-packagessss`, payload);
        if (response.data.status && response.data.status == true) {
            res.redirect("/admin/packages")
        } else {
            console.log("Error add in packages")
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.adminDeletePackages = async (req, res) => {
    try {
        const response = await axios.delete(`${process.env.baseUrl}/api/delete-package/${req.params.id}`);
        if (response.data.status && response.data.status == true) {
            res.redirect("/admin/packages")
        } else {
            console.log("Error add in packages")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

adminController.allBrandsListing = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-brands`);
        if (response.data.status == true) {
            res.render("admin-panel/brands/allBrandsListing", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addHomePageBrandLogo = async (req, res) => {
    try {
        res.render("admin-panel/brands/addHomePageBrandsLogo")
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addBrandLogoImage = async (req, res) => {
    try {
        const addBrandLogo = new brandsLogo({
            key: req.body.key,
            brandsLogo: req.file.filename
        });
        await addBrandLogo.save();
        res.redirect('/admin/allBrandListing')
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.allSiteSeenListing = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-siteSeen`)
        if (response.data.status == true) {
            res.render("admin-panel/all-siteseen/allSiteSeenListing", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addSiteSeen = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-packages`);
        if (response.data.status == true) {
            res.render("admin-panel/all-siteseen/addSiteSeen", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addSiteSeenImage = async (req, res) => {
    try {
        const addSiteSeen = new siteSeen({
            SiteseenName: req.body.SiteseenName,
            SiteseenDescription: req.body.SiteseenDescription,
            siteseen: req.file.filename,
            PackagesInclude: req.body.PackagesInclude
        });
        await addSiteSeen.save();
        res.redirect('/admin/allSiteSeenListing')
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.updateSiteSeenPage = async (req, res) => {
    try {
        const siteSeenData = await siteSeen.findOne({ _id: req.params.id })
        const packages = await axios.get(`${process.env.baseUrl}/api/get-packages`);
        const data = { siteSeenData, packages: packages.data.data }

        res.render('admin-panel/all-siteseen/updateSiteSeenPage', { data })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.updateSiteSeen = async (req, res) => {
    try {

        const { SiteseenName, SiteseenDescription, PackagesInclude } = req.body
        let updatedFields = {
            SiteseenName,
            SiteseenDescription,
            PackagesInclude
        };

        if (req.file) {
            updatedFields.siteseen = req.file.filename;
        }

        const updatedData = await siteSeen.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedFields },
            { new: true }
        );

        res.redirect('/admin/allSiteSeenListing')
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.allDetailsItenaryDetails = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-siteSeen`)
        if (response.data.status == true) {
            res.render("admin-panel/all-siteseen/allSiteSeenListing", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addItenaryPackageImage = async (req, res) => {
    try {

        const { mainPackageId, packageTitle, smallDescription, departureDates, perPersonCost, departureFrom, departureTo, categories } = req.body;
        const formattedDepartureDates = departureDates.map(date => format(parseISO(date), 'yyyy-MM-dd'));
        const { filename } = req.file

        const allItenaryDetails = await packagesDetailsItenary.create({
            mainPackageId, packageTitle, smallDescription, departureDates: formattedDepartureDates, perPersonCost, departureFrom, departureTo, categories, bannerImage: filename
        })

        res.redirect(`/admin/add-day-itenary-page/${allItenaryDetails.mainPackageId}/${allItenaryDetails._id}`)

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.adddDayWiseItenaryPage = async (req, res) => {
    try {
        const { firstId, secondId } = req.params;

        const response = await axios.get(`${process.env.baseUrl}/api/particularPackage/${firstId}`);
        const siteSeenData = await getSiteSeenByName(response.data.data.packageName)

        res.render("admin-panel/domesticPackages/particularDayWiseItenary", { siteSeenData: siteSeenData, itenaryId: secondId })

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getSiteSeenByName = async (name) => {
    try {
        const siteSeenData = await siteSeen.find({ PackagesInclude: name })
        return siteSeenData
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.adddDayWiseItenary = async (req, res) => {
    try {

        let deFaultImage = null;
        let { title, siteSeenId, itenaryId, description, meal } = req.body;

        let errors = {};
        if (!title || title.trim() === '') {
            errors.title = 'Title is required.';
        }

        if (!description || description.trim() === '') {
            errors.description = 'Description is required.';
        }

        if (!meal || meal.length === 0) {
            errors.meal = 'At least one meal selection is required.';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }
        const itenaries = await itenary.findOne({ _id: itenaryId });
        if (!itenaries) {
            return res.status(404).json({ message: 'Itenary not found.' });
        }

        const mainPackage = await packages.findOne({ _id: itenaries.mainPackageId });

        if (!siteSeenId || siteSeenId.length === 0) {
            deFaultImage = mainPackage?.packageImage;
            siteSeenId = [];
        }

        const addDayWiseItenary = await itenaryDetails.create({
            title,
            siteSeenId,
            deFaultImage,
            itenaryId,
            description,
            meal
        });

        res.status(200).json({ message: 'Successfully added day', data: addDayWiseItenary });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

adminController.updateDayItenary = async (req, res) => {
    try {
        
        let deFaultImage = null;
        let { title, siteSeenId, itenaryId, description, meal } = req.body;

        const itenaries = await itenary.findOne({ _id: itenaryId });

        if (!itenaries) {
            return res.status(404).json({ message: 'Itenary not found.' });
        }

        const mainPackage = await packages.findOne({ _id: itenaries.mainPackageId });

        if (!siteSeenId || siteSeenId.length === 0) {
            deFaultImage = mainPackage?.packageImage;
            siteSeenId = [];
        }

        const updateItenary = await itenaryDetails.findOneAndUpdate(
            { _id: req.params.id }, 
            {
              $set: {
                itenaryId:itenaryId,
                title: title,
                siteSeenId: siteSeenId,
                deFaultImage: deFaultImage,
                description: description,
                meal: meal,
              },
            },
            { new: true } 
          );
      
          if (!updateItenary) {
            console.log('Document not found');
            return null;
          }

        res.status(200).json({ message: 'Successfully added day', data: updateItenary });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

adminController.addPackagePricePage = async (req, res) => {
    try {

        res.render("admin-panel/domesticPackages/addPrice", { itenaryId: req.params.id })

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.getAllDetailsOfItenaty = async (req, res) => {
    const packageId = req.params.id
    try {
        await axios.get(`${process.env.baseUrl}/api/get-all-details-itenary/${packageId}`);
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addPriceDetails = async (req, res) => {
    try {

        const { itenaryId, perPersonPrice, childWithoutBed, childWithBed, costPerAdultExtraBed, costPerInfont } = req.body

        const priceDetails = await itenaryPriceDetails.create({
            itenaryId, perPersonPrice, childWithoutBed, childWithBed, costPerAdultExtraBed, costPerInfont
        })

        const itenaryDetail = await itenary.findOne({ _id: itenaryId })
        res.redirect(`/admin/particularFilePackages/${itenaryDetail.mainPackageId}`)

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.allTestimonialListing = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-testimonial`)
        if (response.data.status == true) {
            res.render("admin-panel/allTestimonial/allTestimonialListing", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addTestimonialReview = async (req, res) => {
    try {
        const addTestimonialReviews = new testimonial({
            reviewPersonName: req.body.reviewPersonName,
            reviewDescription: req.body.reviewDescription,
            status: req.body.status,
            numberOfReview: req.body.numberOfReview
        });
        await addTestimonialReviews.save();
        res.status(200).json({ message: "Review added successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.updateTestimonialStatus = async (req, res) => {
    try {
        const testimonialId = req.params.id;
        const { status } = req.body;

        const testimonials = await testimonial.findById(testimonialId);

        if (!testimonials) {
            return res.status(404).json({ message: "Testimonial not found" });
        }

        testimonials.status = status;
        await testimonials.save();

        res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

adminController.deleteTestimonial = async (req, res) => {
    try {
        const response = await axios.delete(`${process.env.baseUrl}/api/delete-testimonial/${req.params.id}`);
        if (response.data.status && response.data.status == true) {
            res.redirect("/admin/allTestimonialListing")
        } else {
            console.log("Error add in testimonial")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

adminController.registerApi = async (req, res) => {
    try {
        const registerUser = new registerPage({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })
        await registerUser.save();
        res.redirect("/")

    } catch (error) {
        console.log("error", error)
    }
}

adminController.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await registerPage.findOne({ email, password });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.secretKey, { expiresIn: '10h' });

        res.redirect("/admin")
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ message: 'Server error' });
    }
}

adminController.allContactUsListing = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-contact-us-review`)
        if (response.data.status == true) {
            res.render("admin-panel/contactUsReviewMessage/allContactUsReviewListing", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.reviewDeleteMessage = async (req, res) => {
    try {
        const response = await axios.delete(`${process.env.baseUrl}/api/delete-contact-us-review/${req.params.id}`);
        if (response.data.status && response.data.status == true) {
            res.redirect("/admin/allContactUsListing")
        } else {
            console.log("Error add in packages")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

adminController.allInclusionAndExclusion = async (req, res) => {
    try {
        res.render("admin-panel/domesticPackages/addInclusionExclusion")
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addInclusionAndExclusion = async (req, res) => {
    try {
        const inclusionPoints = req.body.inclusionPoints;
        const exclusionPoints = req.body.exclusionPoints;

        const addInclusionExclusion = new InclusionAndExclusion({
            inclusionPoints: inclusionPoints,
            exclusionPoints: exclusionPoints
        });
        await addInclusionExclusion.save();
        res.redirect('/admin/allInclusionAndExclusion')
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "An error occurred while adding inclusion and exclusion" });
    }
};

adminController.allCitiesListing = async (req, res) => {
    try {
        const citiesList = await airport_cities.find();
        res.status(200).json({
            success: true,
            data: citiesList
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching cities",
            error: error.message
        });
    }
}

adminController.allBranchNameListing = async (req, res) => {
    const branchId = req.params.id
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-branch-listing/${branchId}`)
        if (response.data.status == true) {
            res.render("admin-panel/branchName/AllBranchName", { data: response.data.data })
        } else {
            console.log("Error get in listing of Branch")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addBranchName = async (req, res) => {
    try {
        const branchId = req.params.id
        res.render("admin-panel/branchName/AddBranchName", { branchId })
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addBranchDetails = async (req, res) => {
    try {
        const addAllBranchDetails = new branch({
            branchId: req.body.branchId,
            branchName: req.body.branchName,
            branchNumber: req.body.branchNumber,
            branchLocation: req.body.branchLocation,
            mapUrl: req.body.mapUrl,
        });
        await addAllBranchDetails.save();
        res.redirect(`/admin/allBranchNameListing/${req.body.branchId}`)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.adminDeleteBranchDetails = async (req, res) => {
    try {
        const response = await axios.delete(`${process.env.baseUrl}/api/delete-branch-details/${req.params.id}`);
        if (response.data.status && response.data.status == true) {
            res.redirect("/admin/allBranchNameListing")
        } else {
            console.log("Error add in packages")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

adminController.allBranchLocation = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-branch-location`);
        if (response.data.status == true) {
            res.render("admin-panel/branchName/branchLocationListing", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addBranchLocation = async (req, res) => {
    try {
        res.render("admin-panel/branchName/addBranchLocation")
    } catch (error) {
        console.log("error", error)
    }
}

adminController.postBranchLocation = async (req, res) => {
    try {
        const addAllBranchDetails = new locationBranch({
            branchLocation: req.body.branchLocation,
        });
        await addAllBranchDetails.save();
        res.redirect("/admin/allBranchLocation")
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.adminDeleteBranchLocation = async (req, res) => {
    try {
        const response = await axios.delete(`${process.env.baseUrl}/api/delete-branch-location/${req.params.id}`);
        if (response.data.status && response.data.status == true) {
            res.redirect("/admin/allBranchLocation")
        } else {
            console.log("Error add in packages")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

adminController.editBranchNameListing = async (req, res) => {
    const branchId = req.params.id;
    try {
        const branch = await locationBranch.findOne({ _id: branchId });
        if (!branch) {
            return res.status(404).send("Branch not found");
        }
        res.render("admin-panel/branchName/editBranchName", { branch });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Server Error");
    }
}

adminController.updateBranchName = async (req, res) => {
    const branchId = req.params.id;
    const { branchLocation } = req.body;
    try {
        await locationBranch.updateOne(
            { _id: branchId },
            { $set: { branchLocation } }
        );
        res.redirect("/admin/allBranchLocation");
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Server Error");
    }
};

adminController.allBlogsListing = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-blog-listing`)
        if (response.data.status == true) {
            res.render("admin-panel/blogsAndGallary/blogsAndGallary", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addBlogs = async (req, res) => {
    try {
        res.render("admin-panel/blogsAndGallary/addBlogs")
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addBlogListing = async (req, res) => {
    try {
        const sanitizedDescription = sanitizeHtml(req.body.blogsDescription, {
            allowedTags: [],
            allowedAttributes: {}
        });
        const blogGallery = req.files?.blogGallery.map(item => item.filename)
        const addBlogListingWithImage = new blogs({
            blogsName: req.body.blogsName,
            blogsDescription: sanitizedDescription,
            blogImage: req.files ? req.files.blogImage[0].filename : null,
            blogType: req.body.blogType,
            blogAuthor: req.body.blogAuthor,
            blogGallery
        });

        await addBlogListingWithImage.save();
        res.redirect("/admin/allBlogsListing")
    } catch (error) {
        console.log(error, "Erororo")
        res.status(400).json({ message: error.message });
    }
};

adminController.adminDeleteBlogs = async (req, res) => {
    try {
        const response = await axios.delete(`${process.env.baseUrl}/api/delete-blogs/${req.params.id}`);
        if (response.data.status && response.data.status == true) {
            res.redirect("/admin/allBlogsListing")
        } else {
            console.log("Error add in packages")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

adminController.allYoutubeVideos = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-youtube-videos`)
        if (response.data.status == true) {
            res.render("admin-panel/youtube-videos/allYoutubeVideosListing", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addYoutubeVideos = async (req, res) => {
    try {
        res.render("admin-panel/youtube-videos/addYoutubeVideos")
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addYoutubeURL = async (req, res) => {
    try {
        const addYoutubeURL = new youtubeURL({
            youtubeURL: req.body.youtubeURL,
        });
        await addYoutubeURL.save();
        res.redirect("/admin/allYoutubeVideos")
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.deleteYoutubeURL = async (req, res) => {
    try {
        const response = await axios.delete(`${process.env.baseUrl}/api/delete-youtube-URL/${req.params.id}`);
        if (response.data.status && response.data.status == true) {
            res.redirect("/admin/allYoutubeVideos")
        } else {
            console.log("Error add in packages")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

adminController.allTeamMembersImage = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-all-members-details`)
        if (response.data.status == true) {
            res.render("admin-panel/teamMembersDetails/teamMembersDetails", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addTeamMembers = async (req, res) => {
    try {
        res.render("admin-panel/teamMembersDetails/addTeamMembersDetails")
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addTeamMemberDetails = async (req, res) => {
    try {
        const addTeamMember = new teamMemberDetails({
            teamMemberName: req.body.teamMemberName,
            teamMemberRole: req.body.teamMemberRole,
            teamMemberImage: req.file.filename
        });
        await addTeamMember.save();
        res.redirect("/admin/allTeamMembersImage")
    } catch (error) {
        console.log("error", error)
    }
}

adminController.deleteTeamMembers = async (req, res) => {
    try {
        const response = await axios.delete(`${process.env.baseUrl}/api/delete-team-members/${req.params.id}`);
        if (response.data.status && response.data.status == true) {
            res.redirect("/admin/allTeamMembersImage")
        } else {
            console.log("Error add in Team members")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

adminController.aboutUsPageContent = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-about-us-content`)
        if (response.data.status == true) {
            res.render("admin-panel/aboutUsContent/aboutUsContent", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addAboutUsContent = async (req, res) => {
    try {
        res.render("admin-panel/aboutUsContent/addAboutUsContent")
    } catch (error) {
        console.log("error", error)
    }
}

adminController.addAboutUsImage = async (req, res) => {
    try {
        const uploadImages = upload('/about-us-image').array('aboutUsContentImages', 10);
        uploadImages(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ message: err.message });
            }
            let { aboutUsTitle, aboutUsContent } = req.body;
            aboutUsContent = sanitizeHtml(aboutUsContent, {
                allowedTags: [],
                allowedAttributes: {},
            });
            const aboutUsContentImages = req.files.map(file => `/uploads/about-us-image/${file.filename}`);
            const newAboutUsContent = new aboutUsContentImage({
                aboutUsTitle,
                aboutUsContent,
                aboutUsContentImages
            });
            await newAboutUsContent.save();
            res.redirect('/admin/aboutUsPageContent');
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

adminController.deleteAboutUsContent = async (req, res) => {
    try {
        const response = await axios.delete(`${process.env.baseUrl}/api/delete-about-us-content/${req.params.id}`);
        if (response.data.status && response.data.status == true) {
            res.redirect("/admin/aboutUsPageContent")
        } else {
            console.log("Error add in Team members")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

adminController.inqueriesListing = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.baseUrl}/api/get-inqueries-details`);
        if (response.data.status == true) {
            res.render("admin-panel/allInqueries/allInqueriesListing", { data: response.data.data })
        } else {
            console.log("Error get in listing in packages")
        }
    } catch (error) {
        console.log("error", error)
    }
}

adminController.deleteInqueries = async (req, res) => {
    try {
        const response = await axios.delete(`${process.env.baseUrl}/api/delete-inqueries/${req.params.id}`);
        if (response.data.status && response.data.status == true) {
            res.redirect("/admin/inqueriesListing")
        } else {
            console.log("Error add in Team members")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = adminController;