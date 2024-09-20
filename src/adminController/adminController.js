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
const { param } = require('../allRoute/allRoute');
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

adminController.getAllFlights = async (req, res) => {
    try {
        res.render("admin-panel/flightsPage/allFlights")
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

adminController.addFlights = async (req, res) => {
    try {
        res.render("admin-panel/flightsPage/addFlights")
    } catch (error) {
        console.log("error", error)
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
        console.log(payload, 'payload')
        const response = await axios.post(`${process.env.baseUrl}/api/add-packagessss`, payload);
        console.log(response, 'res')
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
        const siteSeenData = await siteSeen.findOne({_id : req.params.id})
        const packages = await axios.get(`${process.env.baseUrl}/api/get-packages`);
        const data = {siteSeenData, packages: packages.data.data}

        res.render('admin-panel/all-siteseen/updateSiteSeenPage', {data})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

adminController.updateSiteSeen = async (req, res) => {
    try {

        const {SiteseenName,SiteseenDescription, PackagesInclude} = req.body
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

        let deFaultImage = null
        let { title, siteSeenId, itenaryId, description, meal } = req.body;

        const itenaries = await itenary.findOne({ _id: itenaryId })
        const mainPackage = await packages.findOne({ _id: itenaries.mainPackageId })

        if (siteSeenId == '') {
            deFaultImage = mainPackage?.packageImage
            siteSeenId = null
        }

        const addDayWiseItenary = await itenaryDetails.create({
            title, siteSeenId, deFaultImage, itenaryId, description, meal
        })


        res.status(200).json({ message: 'Successfully add day', data: addDayWiseItenary });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

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
        const response = await axios.get(`${process.env.baseUrl}/api/get-all-details-itenary/${packageId}`);
        console.log("response of itenary details", response)
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
    console.log("request is very cool", req.body)
    try {
        const addTestimonialReviews = new testimonial({
            reviewPersonName: req.body.reviewPersonName,
            reviewDescription: req.body.reviewDescription,
            status: req.body.status
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
        res.status(200).json({ message: "Inclusion and exclusion added successfully" });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "An error occurred while adding inclusion and exclusion" });
    }
};

module.exports = adminController;