const packages = require("../../schema/adminPanelSchema/packagesSchema");
const slider = require("../../schema/sliderSchema/sliderSchema");
const brands = require("../../schema/brandsSchema/brandsSchema");
const siteSeen = require("../../schema/siteSeensSchema/siteSeenSchema");
const itenatyDetails = require("../../schema/itenaryShema/packagesDetailsItenary");
const testimonial = require("../../schema/testimonialSchema/testimonialSchema");
const { default: mongoose } = require("mongoose");
const itenary = require("../../schema/itenaryShema/packagesDetailsItenary");
const messageReview = require("../../schema/contactUsReview/contactUsReview");
const cities = require("../../schema/citiesSchema/citiesSchema");
const apicontroller = {};

apicontroller.addPackages = async (req, res) => {
  try {
    const package = new packages({
      packageName: req.body.packageName,
      categories: req.body.categories,
      packageImage: req.body.packageImage,
    });

    await package.save();
    return res.status(200).json({ status: true, message: 'Packages added successfully!' });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.getPackages = async (req, res) => {
  try {
    const data = await packages.find();
    return res.status(200).json({ status: true, data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.deletePackages = async (req, res) => {
  try {
    const allPackages = await packages.findById(req.params.id);

    await allPackages.remove();
    res.status(200).json({ status: true, message: 'Packages deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.particularPackageId = async (req, res) => {
  try {
    const particularPackageId = await packages.findById(req.params.id);
    res.status(200).json({ status: true, data: particularPackageId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getSlider = async (req, res) => {
  try {
    const homePageSliderImage = await slider.find();
    res.status(200).json({ status: true, data: homePageSliderImage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteHomePageSlider = async (req, res) => {
  try {
    const allPackages = await slider.findById(req.params.id);
    console.log(allPackages, "sdfsgsdfgsdfgs")
    await allPackages.remove();
    res.status(200).json({ status: true, message: 'Slider deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getBrands = async (req, res) => {
  try {
    const homePageBrandsLogo = await brands.find();
    res.status(200).json({ status: true, data: homePageBrandsLogo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getSiteSeen = async (req, res) => {
  try {
    const getSiteSeenListing = await siteSeen.find();
    res.status(200).json({ status: true, data: getSiteSeenListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getItenaryDetails = async (req, res) => {
  try {
    const getAllItenatyDetails = await itenatyDetails.find();
    res.status(200).json({ status: true, data: getAllItenatyDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getTestimonialListing = async (req, res) => {
  try {
    const getTestimimonial = await testimonial.find();
    res.status(200).json({ status: true, data: getTestimimonial });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getParticularItenary = async (req, res) => {
  try {
    const packageId = new mongoose.Types.ObjectId(req.params.id);
    const packageData = await packages.aggregate([
      {
        $match: { _id: packageId }
      },
      {
        $lookup: {
          from: 'itenaries',
          localField: '_id',
          foreignField: 'mainPackageId',
          as: 'itenaries'
        }
      },
      {
        $unwind: '$itenaries'
      },
      {
        $lookup: {
          from: 'itenarydetails',
          localField: 'itenaries._id',
          foreignField: 'itenaryId',
          as: 'itenaries.days'
        }
      },
      {
        $group: {
          _id: '$_id',
          packageName: { $first: '$packageName' },
          itenaries: { $push: '$itenaries' }
        }
      },
      {
        $limit: 1
      }
    ]).exec();
    if (packageData) {
      return res.status(200).json(packageData);
    } else {
      return res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    console.log("error", error)
  }
}

apicontroller.allDetailsOfItenaty = async (req, res) => {

  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const itenaryData = await itenary.aggregate([
      {
        $match: { _id: id }
      },
      {
        $lookup: {
          from: 'itenarydetails',
          localField: '_id',
          foreignField: 'itenaryId',
          as: 'days'
        }
      },
      {
        $unwind: {
          path: '$days',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'siteseens',
          let: { siteSeenIds: '$days.siteSeenId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$siteSeenIds']
                }
              }
            }
          ],
          as: 'days.siteseens'
        }
      },
      {
        $group: {
          _id: '$_id',
          bannerImage: { $first: '$bannerImage' },
          mainPackageId: { $first: '$mainPackageId' },
          packageTitle: { $first: '$packageTitle' },
          smallDescription: { $first: '$smallDescription' },
          departureDates: { $first: '$departureDates' },
          perPersonCost: { $first: '$perPersonCost' },
          departureFrom: { $first: '$departureFrom' },
          departureTo: { $first: '$departureTo' },
          categories: { $first: '$categories' },
          createdAt: { $first: '$createdAt' },
          days: { $push: '$days' }
        }
      },
      {
        $lookup: {
          from: 'itenarypricedetails',
          localField: '_id',
          foreignField: 'itenaryId',
          as: 'priceArray'
        }
      },
      {
        $addFields: {
          price: { $arrayElemAt: ['$priceArray', 0] }
        }
      },
      {
        $project: {
          priceArray: 0,
          'price._id': 0,
          'price.itenaryId': 0,
          'price.__v': 0,
          'days.__v': 0
        }
      }
    ]);

    res.status(200).json({ 'itenaryData': itenaryData[0] })
  } catch (error) {
    console.log("error", error)
  }
}

apicontroller.getContactUsReview = async (req, res) => {
  try {
    const data = await messageReview.find();
    return res.status(200).json({ status: true, data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.postContactUsAPI = async (req, res) => {
  try {
    const contactUsReview = new messageReview({
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      message: req.body.message,
    });

    await contactUsReview.save();
    return res.status(200).json({ status: true, message: 'Review message send successfully!' });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.deleteContactUsReview = async (req, res) => {
  try {
    const deleteReview = await messageReview.findById(req.params.id);
    await deleteReview.remove();
    res.status(200).json({ status: true, message: 'Packages deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllCitiesListing = async (req, res) => {
  try {
    const getAllCities = await cities.find();
    res.status(200).json({ status: true, data: getAllCities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.searchAllCitiesListing = async (req, res) => {
  try {
    console.log("this is for testing search api")
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = apicontroller;