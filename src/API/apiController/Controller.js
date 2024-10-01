const packages = require("../../schema/adminPanelSchema/packagesSchema");
const slider = require("../../schema/sliderSchema/sliderSchema");
const brands = require("../../schema/brandsSchema/brandsSchema");
const siteSeen = require("../../schema/siteSeensSchema/siteSeenSchema");
const itenatyDetails = require("../../schema/itenaryShema/packagesDetailsItenary");
const testimonial = require("../../schema/testimonialSchema/testimonialSchema");
const { default: mongoose } = require("mongoose");
const itenary = require("../../schema/itenaryShema/packagesDetailsItenary");
const messageReview = require("../../schema/contactUsReview/contactUsReview");
const country = require("../../schema/countrySchema/countrySchema");
const branch = require("../../schema/branchSchema/allBranchSchema");
const locationBranch = require("../../schema/branchSchema/branchLocationSchema");
const blogs = require("../../schema/blogsSchema/blogsSchema");
const airport_cities = require("../../schema/airportCitiesSchema/airportCitiesSchema");
const FlightsDetails = require("../../schema/flightsDetailsSchema/flightsDetailsSchema");
const specialFlights = require("../../schema/specialFlightsSchema/specialFlightsSchema");
const youtubeURL = require("../../schema/youtubeVideosSchema/youtubeVideosSchema");
const teamMemberDetails = require("../../schema/teamMemberSchema/teamMemberSchema");
const aboutUsContentImage = require("../../schema/aboutUsSchema/aboutUsSchema");
const querySend = require("../../schema/querySendSchema/querySendSchema");
const allPromoCodes = require("../../schema/promocodesSchema/promoCodesSchema");
const discountCoupon = require("../../schema/discountCouponSchema/discountCouponSchema");
const ticketsBooking = require("../../schema/ticketsBookingSchema/addTicketsBookingSchema");
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

apicontroller.postTestimonialReview = async (req, res) => {
  try {
    const testimonialReview = new testimonial({
      reviewPersonName: req.body.reviewPersonName,
      reviewDescription: req.body.reviewDescription,
      numberOfReview: req.body.numberOfReview,
    });

    await testimonialReview.save();
    return res.status(200).json({ status: true, message: 'Testimonial Review added successfully!' });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.deleteTestimonial = async (req, res) => {
  try {
    const allTestimonial = await testimonial.findById(req.params.id);
    await allTestimonial.remove();
    res.status(200).json({ status: true, message: 'Testimonial Review deleted successfully!' });
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
          packageImage: { $first: '$packageImage' },
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
      name: req.body.name,
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
    const city = req.query.city
    let getAllCities;
    if (!!city) {
      getAllCities = await airport_cities.find({ city: { $regex: city, $options: 'i' } });
    } else {
      getAllCities = await airport_cities.find();
    }
    res.status(200).json({ status: true, data: getAllCities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllCountryListing = async (req, res) => {
  try {
    let getAllCountry = await country.find();
    res.status(200).json({ status: true, data: getAllCountry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllBranchListing = async (req, res) => {
  const branchId = req.params.id
  try {
    const data = await branch.find({ branchId: branchId });

    return res.status(200).json({ status: true, data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.deleteBranchDetails = async (req, res) => {
  try {
    const deleteBranchDetails = await branch.findById(req.params.id);
    await deleteBranchDetails.remove();
    res.status(200).json({ status: true, message: 'Branch Details deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllBranchLocation = async (req, res) => {
  try {
    const data = await locationBranch.find();
    return res.status(200).json({ status: true, data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.deleteBranchLocation = async (req, res) => {
  try {
    const deleteBranchLocation = await locationBranch.findById(req.params.id);
    await deleteBranchLocation.remove();
    res.status(200).json({ status: true, message: 'Branch Location deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getBlogListing = async (req, res) => {
  try {
    const getBlogListing = await blogs.find();
    res.status(200).json({ status: true, data: getBlogListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteBlogs = async (req, res) => {
  try {
    const allBlogsListing = await blogs.findById(req.params.id);
    await allBlogsListing.remove();
    res.status(200).json({ status: true, message: 'Blogs deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.searchFligthsDetails = async (req, res) => {
  try {
    const { from, to, flightClass, departure_Date, oneWay, adult, children, infant } = req.body
    const query = {
      'departure.city': { $regex: new RegExp(from, 'i') },
      'arrival.city': { $regex: new RegExp(to, 'i') },
      [`class_details.${flightClass}.seats_available`]: { $gt: 0 },
    };

    if (oneWay === true) {
      query.hold = 'direct';
    }

    const results = await FlightsDetails.find(query);

    const flights = results.filter((flight) => {
      const dateTime = flight.departure.time
      const dateObject = new Date(dateTime);
      const formattedDate = formatDate(dateObject);
      return departure_Date == formattedDate
    })

    function formatDate(date) {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
    if (flights.length === 0) {
      return res.status(404).json({ message: 'No flights found.' });
    }

    return res.status(200).json({ flights });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

apicontroller.getSpecialFlightsData = async (req, res) => {
  try {
    const specialFlightsDetails = await specialFlights.find();
    res.status(200).json({ status: true, data: specialFlightsDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getDefaultFlightsLogo = async (req, res) => {
  try {
    await FlightsDetails.updateMany({ airline: 'Air India' }, { airlineLogo: 'Air-India.png' });
    await FlightsDetails.updateMany({ airline: 'Go First' }, { airlineLogo: 'go-first.png' });
    await FlightsDetails.updateMany({ airline: 'Indigo' }, { airlineLogo: 'indigo_main.png' });
    await FlightsDetails.updateMany({ airline: 'Vistara' }, { airlineLogo: 'vistara.png' });
    await FlightsDetails.updateMany({ airline: 'spicejet' }, { airlineLogo: 'spicejet.png' });

    const uniqueAirlines = await FlightsDetails.find();

    res.status(200).json({ uniqueAirlines });

  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: 'Error retrieving unique airlines', error: error.message });
  }
};

apicontroller.getYoutubeVideos = async (req, res) => {
  try {
    const getYoutubeURL = await youtubeURL.find();
    res.status(200).json({ status: true, data: getYoutubeURL });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteYoutubeURL = async (req, res) => {
  try {
    const allYoutubeVideos = await youtubeURL.findById(req.params.id);
    await allYoutubeVideos.remove();
    res.status(200).json({ status: true, message: 'Youtube Videos deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllMembersDetails = async (req, res) => {
  try {
    const getAllMembersData = await teamMemberDetails.find();
    res.status(200).json({ status: true, data: getAllMembersData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteTeamMembers = async (req, res) => {
  try {
    const teamMembersDetails = await teamMemberDetails.findById(req.params.id);
    await teamMembersDetails.remove();
    res.status(200).json({ status: true, message: 'Team Member deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllAboutUsContent = async (req, res) => {
  try {
    const getAllAboutUsContentImage = await aboutUsContentImage.find();
    res.status(200).json({ status: true, data: getAllAboutUsContentImage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteAboutUsContent = async (req, res) => {
  try {
    const aboutUsContent = await aboutUsContentImage.findById(req.params.id);
    await aboutUsContent.remove();
    res.status(200).json({ status: true, message: 'Team Member deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.postInqueryAPI = async (req, res) => {
  try {
    const inqueryPostAPI = new querySend({
      customerName: req.body.customerName,
      mobileNumber: req.body.mobileNumber,
      customerEmail: req.body.customerEmail,
      travelDate: req.body.travelDate,
      numberOfAdult: req.body.numberOfAdult,
      numberOfChildWithBed: req.body.numberOfChildWithBed,
      numberOfChildWithoutBed: req.body.numberOfChildWithoutBed,
    });

    await inqueryPostAPI.save();
    return res.status(200).json({ status: true, message: 'Review message send successfully!' });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.getInqueriesDetails = async (req, res) => {
  try {
    const data = await querySend.find();
    return res.status(200).json({ status: true, data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.deleteInqueries = async (req, res) => {
  try {
    const deleteInqueriesData = await querySend.findById(req.params.id);
    await deleteInqueriesData.remove();
    res.status(200).json({ status: true, message: 'Inqueries deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllPromoCodeListing = async (req, res) => {
  try {
    const getAllPromoCode = await allPromoCodes.find();
    res.status(200).json({ status: true, data: getAllPromoCode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deletePromoCode = async (req, res) => {
  try {
    const promoCode = await allPromoCodes.findById(req.params.id);
    await promoCode.remove();
    res.status(200).json({ status: true, message: 'Promo Code deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllDiscountCoupon = async (req, res) => {
  try {
    const discountCouponListing = await discountCoupon.find();
    res.status(200).json({ status: true, data: discountCouponListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteDiscountCoupon = async (req, res) => {
  try {
    const disocuntCoupons = await discountCoupon.findById(req.params.id);
    await disocuntCoupons.remove();
    res.status(200).json({ status: true, message: 'Discount Coupon deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.postTicketsBooking = async (req, res) => {
  try {
    console.log(req.body, 'req.body of booking')
    const ticketsBookingDetails = new ticketsBooking({
      title: req.body.title,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      contactId: req.body.contactId,
    });

    await ticketsBookingDetails.save();
    return res.status(200).json({ status: true, message: 'Tickets Booking add successfully!' });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = apicontroller;