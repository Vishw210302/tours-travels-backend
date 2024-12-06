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
const flightMeal = require("../../schema/flightMealSchema/flightMealSchema");
const mealItemsImage = require("../../schema/flightMealSchema/allMealSchema");
const flightSeat = require("../../schema/fligjhtSeatsSchema/flightSeatsSchema");
const passengerDetails = require("../../schema/passengerDetailsSchema/passengerDetailsSchema");
const flightContactUs = require("../../schema/passengerDetailsSchema/contactUsTicketsSchema");
const { pdfGenerator } = require("../../utils/pdfGenerator");
const path = require("path");
const fs = require("fs");
const packageThemeImage = require("../../schema/packageThemeSchema/packageThemeSchema");
const socialMediaLink = require("../../schema/socialMediaLinkSchema/socialMediaLinkSchema");
const hotelContactUs = require("../../schema/hotelContactUsSchema/hotelContactUsSchema");
const hotelTestimonial = require("../../schema/hotelTestimonialReviewSchema/hotelTestimonialReviewSchema");
const hotelCouponCode = require("../../schema/hotelCouponCodeSchema/hotelCouponCodeSchema");
const hotelListing = require("../../schema/hotelListingSchema/hotelListingSchema");
const Setting = require("../../schema/SettingSchema/SettingSchema");
const roles = require("../../schema/rolesSchema/roleSchema");
const permission = require("../../schema/permissionNameSchema/permissionNameSchema");
const employees = require("../../schema/allEmployeeSchema/allEmployeeSchema");
const apicontroller = {};

apicontroller.addPackages = async (req, res) => {

  try {
    const newPackage = new packages({
      packageName: req.body.packageName,
      categories: req.body.categories,
      packageImage: req.body.packageImage,
    });

    await newPackage.save();

    return res.status(200).json({
      status: true,
      message: 'Package added successfully!',
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'An error occurred while adding the package. Please try again later.',
      error: error.message,
    });

  }

};

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

apicontroller.getItenaryByCategories = async (req, res) => {

  const categories = req.params.key
  try {

    const package = await packages.find({
      categories: categories
    });

    const internaries = await Promise.all(
      package.map(async (pack) => {
        return await itenatyDetails.find({
          mainPackageId: pack._id
        });
      })
    );

    const flattenedInternaries = internaries.flat();
    res.status(200).json({ status: true, data: flattenedInternaries });
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

apicontroller.getTestimonialListingActive = async (req, res) => {
  try {
    const getTestimimonial = await testimonial.find({ status: 'Active' });
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
        $lookup: {
          from: 'inclusionandexclusions',
          localField: 'itenaries._id',
          foreignField: 'itenaryId',
          as: 'itenaries.inclusionandexclusions'
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
          fileUpload: { $first: '$fileUpload' },
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
        $lookup: {
          from: 'inclusionandexclusions',
          localField: '_id',
          foreignField: 'itenaryId',
          as: 'inclusionExclusion'
        }
      },
      {
        $addFields: {
          inclusionExclusion: { $arrayElemAt: ['$inclusionExclusion', 0] }
        }
      },
      {
        $project: {
          priceArray: 0,
          'price._id': 0,
          'price.itenaryId': 0,
          'price.__v': 0,
          'days.__v': 0,
          'inclusionExclusion.deletedAt': 0,
          'inclusionExclusion._id': 0,
          'inclusionExclusion.createdAt': 0,
          'inclusionExclusion.itenaryId': 0,
          'inclusionExclusion.__v': 0
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
    const { from, to, flightClass, departure_Date, oneWay } = req.body
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

apicontroller.getParticularFlightById = async (req, res) => {
  const particularFlightId = req.params.id
  try {
    let getParticularFlight;
    if (req.params.key == "1") {
      getParticularFlight = await FlightsDetails.findById(particularFlightId);
    } else {
      getParticularFlight = await specialFlights.findById(particularFlightId);
    }
    res.status(200).json({ status: true, data: getParticularFlight });
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
    const discountCouponListing = await discountCoupon.find()
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

apicontroller.getFlightMealListing = async (req, res) => {
  try {
    const flightMealListing = await flightMeal.find();
    res.status(200).json({ status: true, data: flightMealListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getParticularMealListing = async (req, res) => {
  const mealId = req.params.id
  try {
    const data = await mealItemsImage.find({ mealId: mealId });
    return res.status(200).json({ status: true, data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.deleteFlightMeal = async (req, res) => {
  try {
    const deleteFlightsMeals = await flightMeal.findById(req.params.id);
    if (!deleteFlightsMeals) {
      return res.status(404).json({ status: false, message: "Meal not found" });
    }
    await deleteFlightsMeals.remove();
    res.status(200).json({ status: true, message: 'flight meal deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

apicontroller.deletParticularFlightMeal = async (req, res) => {
  const particularMealId = req.params.id
  try {
    const deleteFlightsMeals = await mealItemsImage.findById(particularMealId);
    if (!deleteFlightsMeals) {
      return res.status(404).json({ status: false, message: "Meal not found" });
    }
    await deleteFlightsMeals.remove();
    res.status(200).json({ status: true, message: 'flight meal deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

apicontroller.getFlightSeatsListing = async (req, res) => {
  const flightId = req.params.id;
  try {
    const flightSeatsListing = await flightSeat.findOne({ flightId });
    if (!flightSeatsListing) {
      return res.status(404).json({ status: false, message: 'No seats found for this flight ID.' });
    }
    res.status(200).json({ status: true, data: flightSeatsListing });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

apicontroller.updateSeat = async (req, res) => {

  const { selectedSeatId, id } = req.body

  const contactId = mongoose.Types.ObjectId(id)

  try {

    const contactDetailsArray = await flightContactUs.aggregate([
      {
        $match: { _id: contactId }
      },
      {
        $lookup: {
          from: 'passengerdetails',
          localField: 'passengerId',
          foreignField: '_id',
          as: 'passengerDetails'
        }
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          mobileNumber: 1,
          passengerDetails: 1
        }
      }
    ]);

    const contactDetails = contactDetailsArray[0];

    if (contactDetails && contactDetails.passengerDetails) {
      const updatePromises = contactDetails.passengerDetails.map((passenger, index) => {
        if (selectedSeatId[index]) {
          return passengerDetails.updateOne(
            { _id: passenger._id },
            { $set: { seatNumberId: selectedSeatId[index].seatId } }
          );
        }
      });

      await Promise.all(updatePromises);

      res.status(200).json({ status: true, message: "Seat IDs updated successfully" });

    } else {
      res.status(404).json({ status: false, message: "No passengers found for this contact" });
    }

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

apicontroller.getFlightUpdatedSeat = async (req, res) => {
  const id = req.query.id;
  const contactId = mongoose.Types.ObjectId(id);

  try {

    const contactDetailsArray = await flightContactUs.aggregate([
      {
        $match: { _id: contactId }
      },
      {
        $lookup: {
          from: 'passengerdetails',
          localField: 'passengerId',
          foreignField: '_id',
          as: 'passengerDetails'
        }
      },
      {
        $unwind: "$passengerDetails"
      },
      {
        $lookup: {
          from: 'flightseats',
          let: { flightId: "$passengerDetails.flightId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$flightId", "$$flightId"] }
              }
            },
            {
              $project: {
                seats: {
                  $concatArrays: [
                    {
                      $map: {
                        input: "$economy",
                        as: "seat",
                        in: {
                          $mergeObjects: [
                            "$$seat",
                            {
                              seatClass: "economy",
                              seatId: "$$seat._id"
                            }
                          ]
                        }
                      }
                    },
                    {
                      $map: {
                        input: "$business",
                        as: "seat",
                        in: {
                          $mergeObjects: [
                            "$$seat",
                            {
                              seatClass: "business",
                              seatId: "$$seat._id"
                            }
                          ]
                        }
                      }
                    },
                    {
                      $map: {
                        input: "$first_class",
                        as: "seat",
                        in: {
                          $mergeObjects: [
                            "$$seat",
                            {
                              seatClass: "first_class",
                              seatId: "$$seat._id"
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            },
            {
              $unwind: "$seats"
            },
            {
              $replaceRoot: { newRoot: "$seats" }
            }
          ],
          as: 'allSeats'
        }
      },
      {
        $addFields: {
          "passengerDetails": {
            $cond: {
              if: { $and: [{ $ne: ["$passengerDetails.seatNumberId", null] }, { $ne: ["$passengerDetails.seatNumberId", ""] }] },
              then: {
                $mergeObjects: [
                  "$passengerDetails",
                  {
                    seatInfo: {
                      $let: {
                        vars: {
                          matchedSeat: {
                            $first: {
                              $filter: {
                                input: "$allSeats",
                                as: "seat",
                                cond: {
                                  $eq: ["$$seat.seatId", "$passengerDetails.seatNumberId"]
                                }
                              }
                            }
                          }
                        },
                        in: {
                          $cond: {
                            if: { $ne: ["$$matchedSeat", null] },
                            then: {
                              _id: "$$matchedSeat._id",
                              seat_number: "$$matchedSeat.seat_number",
                              price: "$$matchedSeat.price",
                              class: "$$matchedSeat.seatClass"
                            },
                            else: "$$REMOVE"
                          }
                        }
                      }
                    }
                  }
                ]
              },
              else: "$$REMOVE"
            }
          }
        }

      },
      {
        $group: {
          _id: "$_id",
          fullName: { $first: "$fullName" },
          email: { $first: "$email" },
          mobileNumber: { $first: "$mobileNumber" },
          passengerDetails: { $push: "$passengerDetails" }
        }
      }
    ]);

    const contactDetails = contactDetailsArray[0] || {};

    const selectedSeat = contactDetails.passengerDetails.map((passenger) => passenger?.seatInfo);
    res.status(200).json({ data: selectedSeat });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

apicontroller.addPassengerDetails = async (req, res) => {
  try {

    const { details, flightId } = req.body

    const passengerPersonalId = []

    for (let i = 0; i < details?.passengerDetailsData.length; i++) {

      const passengerDetail = details?.passengerDetailsData[i];
      const passengerId = mongoose.Types.ObjectId.isValid(passengerDetail.id) ? mongoose.Types.ObjectId(passengerDetail.id) : null;
      let passengerTicketsDetails;

      if (passengerId) {
        passengerTicketsDetails = await passengerDetails.findOneAndUpdate(
          { _id: passengerId },
          {
            $set: {
              fullName: passengerDetail.fullName,
              age: passengerDetail.age,
              gender: passengerDetail.gender,
            }
          },
          { new: true, upsert: true }
        );


      } else {

        passengerTicketsDetails = await passengerDetails.create({
          flightId,
          fullName: passengerDetail?.fullName,
          age: passengerDetail?.age,
          gender: passengerDetail?.gender
        });

      }
      passengerPersonalId.push(passengerTicketsDetails?._id)
    }

    const contactData = {
      passengerId: passengerPersonalId,
      fullName: details?.contactDetails?.fullName,
      email: details?.contactDetails?.email,
      mobileNumber: details?.contactDetails?.phoneNumber,
    };

    const contactId = mongoose.Types.ObjectId.isValid(details?.contactDetails?.id) ? mongoose.Types.ObjectId(details?.contactDetails?.id) : null;

    if (contactId) {

      const updatedContactUs = await flightContactUs.findOneAndUpdate(
        { _id: contactId },
        { $set: contactData },
        { new: true }
      );

      if (!updatedContactUs) {
        return res.status(404).json({ message: "Contact details not found" });
      }

      return res.status(200).json({
        id: updatedContactUs._id,
        message: "Updated contact details successfully"
      });

    } else {
      const newContactUs = await flightContactUs.create(contactData);

      return res.status(200).json({
        id: newContactUs._id,
        message: "Saved contact details successfully"
      });

    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.getPassengerDetailsByContactId = async (req, res) => {
  try {

    const id = req.query.id;

    const contactId = mongoose.Types.ObjectId.isValid(id) ? mongoose.Types.ObjectId(id) : null;
    const contactDetails = await flightContactUs.aggregate([
      {
        $match: { _id: contactId }
      },
      {
        $lookup: {
          from: 'passengerdetails',
          localField: 'passengerId',
          foreignField: '_id',
          as: 'passengerDetails'
        }
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          mobileNumber: 1,
          passengerDetails: 1
        }
      }
    ]);

    const lastEntry = contactDetails[contactDetails.length - 1];

    if (lastEntry) {
      res.status(200).json({ data: lastEntry });
    } else {
      res.send('No contact found for the given email.');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.updateMealOrder = async (req, res) => {

  const { selecteMealData, id } = req.body

  const contactId = mongoose.Types.ObjectId.isValid(id) ? mongoose.Types.ObjectId(id) : null;

  if (!contactId) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  try {

    const mealOrderData = selecteMealData.map(meal => ({
      particularMealId: mongoose.Types.ObjectId(meal.meal_id),
      mealCount: meal.count.toString(),
    }));

    const updatedContact = await flightContactUs.findByIdAndUpdate(
      contactId,
      { mealOrder: mealOrderData },
      { new: true, useFindAndModify: false }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    return res.status(200).json({ message: 'Meal order updated successfully', data: updatedContact });

  } catch (error) {

    return res.status(500).json({ message: 'Error updating meal order', error: error.message });
  }
}

apicontroller.getUpdatedMealOrder = async (req, res) => {

  const id = req.query.id

  const contactId = mongoose.Types.ObjectId.isValid(id) ? mongoose.Types.ObjectId(id) : null;

  if (!contactId) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  try {

    const mealData = await flightContactUs.aggregate([
      {
        $match: { _id: contactId }
      },
      {
        $unwind: '$mealOrder'
      },
      {
        $lookup: {
          from: 'mealitemsimages',
          localField: 'mealOrder.particularMealId',
          foreignField: '_id',
          as: 'mealDetails'
        }
      },
      {
        $unwind: '$mealDetails'
      },
      {
        $project: {
          _id: 0,
          mealCount: '$mealOrder.mealCount',
          mealDetails: {
            _id: '$mealDetails._id',
            mealItems: '$mealDetails.mealItems',
            mealPrice: '$mealDetails.mealPrice',
            mealItemsImage: '$mealDetails.mealItemsImage'
          }
        }
      }
    ]);

    return res.status(200).json({ message: 'Get meal data', data: mealData });

  } catch (error) {

    return res.status(500).json({ message: 'Error get meal order', error: error.message });
  }
}

const allFlightPassengerDetails = async (contactId) => {

  const contactDetailsArray = await flightContactUs.aggregate([
    {
      $match: { _id: contactId }
    },
    {
      $lookup: {
        from: 'passengerdetails',
        localField: 'passengerId',
        foreignField: '_id',
        as: 'passengerDetails'
      }
    },
    {
      $unwind: "$passengerDetails"
    },
    {
      $lookup: {
        from: 'flightseats',
        let: { flightId: "$passengerDetails.flightId" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$flightId", "$$flightId"] }
            }
          },
          {
            $project: {
              seats: {
                $concatArrays: [
                  {
                    $map: {
                      input: "$economy",
                      as: "seat",
                      in: {
                        $mergeObjects: [
                          "$$seat",
                          {
                            seatClass: "economy",
                            seatId: "$$seat._id"
                          }
                        ]
                      }
                    }
                  },
                  {
                    $map: {
                      input: "$business",
                      as: "seat",
                      in: {
                        $mergeObjects: [
                          "$$seat",
                          {
                            seatClass: "business",
                            seatId: "$$seat._id"
                          }
                        ]
                      }
                    }
                  },
                  {
                    $map: {
                      input: "$first_class",
                      as: "seat",
                      in: {
                        $mergeObjects: [
                          "$$seat",
                          {
                            seatClass: "first_class",
                            seatId: "$$seat._id"
                          }
                        ]
                      }
                    }
                  }
                ]
              }
            }
          },
          {
            $unwind: "$seats"
          },
          {
            $replaceRoot: { newRoot: "$seats" }
          }
        ],
        as: 'allSeats'
      }
    },
    {
      $addFields: {
        "passengerDetails.seatInfo": {
          $let: {
            vars: {
              matchedSeat: {
                $first: {
                  $filter: {
                    input: "$allSeats",
                    as: "seat",
                    cond: {
                      $eq: [
                        "$$seat.seatId",
                        "$passengerDetails.seatNumberId"
                      ]
                    }
                  }
                }
              }
            },
            in: {
              $cond: {
                if: { $ne: ["$$matchedSeat", null] },
                then: {
                  _id: "$$matchedSeat._id",
                  seat_number: "$$matchedSeat.seat_number",
                  price: "$$matchedSeat.price",
                  class: "$$matchedSeat.seatClass"
                },
                else: null
              }
            }
          }
        }
      }
    },
    {
      $lookup: {
        from: 'flightsdetails',
        localField: 'passengerDetails.flightId',
        foreignField: '_id',
        as: 'flightDetails'
      }
    },
    {
      $unwind: {
        path: "$flightDetails",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'mealitemsimages',
        let: {
          mealIds: {
            $cond: {
              if: { $isArray: "$mealOrder" },
              then: {
                $map: {
                  input: "$mealOrder",
                  as: "meal",
                  in: "$$meal.particularMealId"
                }
              },
              else: []
            }
          }
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$mealIds"]
              }
            }
          }
        ],
        as: 'mealItemsData'
      }
    },
    {
      $addFields: {
        mealDetails: {
          $map: {
            input: {
              $cond: {
                if: { $isArray: "$mealOrder" },
                then: "$mealOrder",
                else: []
              }
            },
            as: "meal",
            in: {
              $let: {
                vars: {
                  mealItem: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$mealItemsData",
                          as: "m",
                          cond: { $eq: ["$$m._id", "$$meal.particularMealId"] }
                        }
                      },
                      0
                    ]
                  }
                },
                in: {
                  _id: "$$mealItem._id",
                  mealItems: "$$mealItem.mealItems",
                  mealPrice: "$$mealItem.mealPrice",
                  mealCount: "$$meal.mealCount"
                }
              }
            }
          }
        }
      }
    },
    {
      $group: {
        _id: contactId,
        contactDetails: {
          $first: {
            fullName: "$fullName",
            email: "$email",
            mobileNumber: "$mobileNumber"
          }
        },
        mealDetails: {
          $first: "$mealDetails"
        },
        passengerDetails: { $addToSet: "$passengerDetails" },
        flightDetails: { $first: "$flightDetails" }
      }
    }
  ]);

  return contactDetailsArray
}

apicontroller.getFlightAllBookingDetails = async (req, res) => {

  const id = req.query.contactId

  const contactId = mongoose.Types.ObjectId(id)

  if (!contactId) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  try {

    const contactDetailsArray = await allFlightPassengerDetails(contactId)

    const flightBookDetails = contactDetailsArray[0] || {};

    const discountCouponData = await discountCoupon.find({ status: "Active" });

    const promocodeData = await allPromoCodes.find({ status: "Active" });

    const flightBookData = {
      flightBookDetails,
      discountCouponData,
      promocodeData
    }

    return res.status(200).json({ data: flightBookData });

  } catch (error) {

    return res.status(500).json({ message: 'Error get meal order', error: error.message });
  }
}

apicontroller.addFlightTicketsData = async (req, res) => {
  try {

    const { paymentId, contactId, className } = req.body
    const id = mongoose.Types.ObjectId(contactId)

    const updatedContact = await flightContactUs.findByIdAndUpdate(
      { _id: id },
      {
        paymentId: paymentId,
        paymentStatus: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const contactDetailsArray = await allFlightPassengerDetails(id);
    const allFilghtRelatedDetails = contactDetailsArray[0]
    // res.send(allFilghtRelatedDetails)
    
    await seatUpdate()

    const mealTotalPrice = allFilghtRelatedDetails.mealDetails.reduce((total, meal) => {
      return total + meal.mealPrice * meal.mealCount;
    }, 0);

    const seatPrice = allFilghtRelatedDetails.passengerDetails.reduce((total, seatInfo) => {
      return total + seatInfo.seatInfo.price
    }, 0)

    const baseFare = allFilghtRelatedDetails.flightDetails.class_details[className].prices.adult * allFilghtRelatedDetails.passengerDetails.length

    const paymentIntent = await axios.post(`${process.env.baseUrl}/api/get-payment-intent`, { id: paymentId });

    const finalPrice = paymentIntent.data.amount / 100;

    const discount = baseFare + seatPrice + mealTotalPrice - finalPrice

    const convertDateTime = (timeStamp) => {

      const date = new Date(timeStamp);

      if (isNaN(date)) {
        throw new Error('Invalid Date');
      }

      const optionsDate = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      };

      const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };

      const formattedDate = new Intl.DateTimeFormat('en-GB', optionsDate).format(date);
      let formattedTime = new Intl.DateTimeFormat('en-GB', optionsTime).format(date);

      formattedTime = formattedTime.toUpperCase();

      const finalFormattedDate = `${formattedDate}, ${formattedTime}`;

      return finalFormattedDate;
    };

    const calculateDuration = (departureTime, arrivalTime) => {

      const departureDate = new Date(departureTime);
      const arrivalDate = new Date(arrivalTime);

      if (isNaN(departureDate) || isNaN(arrivalDate)) {
        throw new Error('Invalid Date(s)');
      }

      const diffInMs = arrivalDate - departureDate;
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

      return `${diffInHours} h, ${diffInMinutes} m`;
    };

    function capitalizeFirstLetter(str) {
      if (!str) return str;
      return str
      .toLowerCase() 
      .split('_')    
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' '); 
    }

    const ticketData = {
      airline: allFilghtRelatedDetails.flightDetails.airline,
      bookingReference: allFilghtRelatedDetails._id,
      flight: {
        from: `${allFilghtRelatedDetails.flightDetails.departure.city} (${allFilghtRelatedDetails.flightDetails.departure.airport})`,
        to: `${allFilghtRelatedDetails.flightDetails.arrival.city} (${allFilghtRelatedDetails.flightDetails.arrival.airport})`,
        departure: convertDateTime(allFilghtRelatedDetails.flightDetails.departure.time),
        arrival: convertDateTime(allFilghtRelatedDetails.flightDetails.arrival.time),
        number: allFilghtRelatedDetails.flightDetails.flightCode,
        aircraft: "Boeing 737",
        class: capitalizeFirstLetter(className) || "N/A",
        duration: calculateDuration(allFilghtRelatedDetails.flightDetails.departure.time, allFilghtRelatedDetails.flightDetails.arrival.time),
      },
      passengers: allFilghtRelatedDetails.passengerDetails.map((passenger) => ({
        name: passenger.fullName,
        age: passenger.age,
        gender: passenger.gender,
        seat: passenger.seatInfo.seat_number,
      })),
      price: {
        baseFare: baseFare,
        meals: mealTotalPrice,
        seatPrice: seatPrice,
        ...(discount > 0 && { discount }),
        total: finalPrice,
      },
    };

    const htmlFilePath = "/admin-panel/flightTicketsDetailsMail/ticketsBookingMail.ejs"
    const ticketName = `ticket-${updatedContact.email}.pdf`
    await pdfGenerator(htmlFilePath, ticketName, ticketData);

    const pdfPath = path.join(__dirname, '../../public', `/ticketsPDF/${ticketName}`);
    const pdfBuffer = fs.readFileSync(pdfPath);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${ticketName}"`,
      'Content-Length': pdfBuffer.length
    });

    res.send(pdfBuffer);

  } catch (error) {
    console.log(error, "error")
    res.status(400).json({ message: error.message });
  }
}

const seatUpdate = () => {
  
}

apicontroller.getPackageTheme = async (req, res) => {
  try {
    const packageThemeListing = await packageThemeImage.find();
    res.status(200).json({ status: true, data: packageThemeListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getPackageThemeActive = async (req, res) => {
  try {
    const packageThemeListing = await packageThemeImage.find({ status: 'Active' });
    res.status(200).json({ status: true, data: packageThemeListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deletePackageTheme = async (req, res) => {
  try {
    const deletePackageTheme = await packageThemeImage.findById(req.params.id);
    await deletePackageTheme.remove();
    res.status(200).json({ status: true, message: 'Package Theme deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getSocialMediaLink = async (req, res) => {
  try {
    const socialMediaLinkListing = await socialMediaLink.find().sort({ order: 1 });
    res.status(200).json({ status: true, data: socialMediaLinkListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteSocialMediaLink = async (req, res) => {
  try {
    const deleteSocialMediaLink = await socialMediaLink.findById(req.params.id);
    await deleteSocialMediaLink.remove();
    res.status(200).json({ status: true, message: 'social media link deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.postContactUsHotelAPI = async (req, res) => {
  try {
    const hotelContactUsMessage = new hotelContactUs({
      name: req.body.name,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      message: req.body.message,
    });

    await hotelContactUsMessage.save();
    return res.status(200).json({ status: true, message: 'Review message send successfully!' });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.getContactUsReviewHotel = async (req, res) => {
  try {
    const data = await hotelContactUs.find();
    return res.status(200).json({ status: true, data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.deleteContactUsReviewHotels = async (req, res) => {
  try {
    const deleteContactUsHotel = await hotelContactUs.findById(req.params.id);
    await deleteContactUsHotel.remove();
    res.status(200).json({ status: true, message: 'Hotel Message deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.postHotelTestimonialReview = async (req, res) => {
  try {
    const testimonialHotelReview = new hotelTestimonial({
      reviewPersonName: req.body.reviewPersonName,
      reviewDescription: req.body.reviewDescription,
      numberOfReview: req.body.numberOfReview,
    });

    await testimonialHotelReview.save();
    return res.status(200).json({ status: true, message: `Hotel's Testimonial Review added successfully` });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

apicontroller.getTestimonialHotelListing = async (req, res) => {
  try {
    const getTestimimonialHotel = await hotelTestimonial.find();
    res.status(200).json({ status: true, data: getTestimimonialHotel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getTestimonialListingActiveHotel = async (req, res) => {
  try {
    const getTestimimonialHotel = await hotelTestimonial.find({ status: 'Active' });
    res.status(200).json({ status: true, data: getTestimimonialHotel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deletehotelTestimonialReview = async (req, res) => {
  try {
    const deleteHotelTestimonial = await hotelTestimonial.findById(req.params.id);
    await deleteHotelTestimonial.remove();
    res.status(200).json({ status: true, message: 'Hotel Testimonial deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllCouponCodeListing = async (req, res) => {
  try {
    const hotelCouponCodes = await hotelCouponCode.find();
    res.status(200).json({ status: true, data: hotelCouponCodes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteCouponCodeHotel = async (req, res) => {
  try {
    const deleteCouponCodeHotel = await hotelCouponCode.findById(req.params.id);
    await deleteCouponCodeHotel.remove();
    res.status(200).json({ status: true, message: 'Coupon Code Hotel deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllCouponCodeActiveListing = async (req, res) => {
  try {
    const getAllActiveCouponCodeListing = await hotelCouponCode.find({ status: 'Active' });
    res.status(200).json({ status: true, data: getAllActiveCouponCodeListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllHotelListing = async (req, res) => {
  try {
    const allHotelListing = await hotelListing.find();
    res.status(200).json({ status: true, data: allHotelListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getParticularHotelListing = async (req, res) => {
  const hotelCityName = req.params.city;
  try {
    const hotelsListing = await hotelListing.find({ city: hotelCityName });
    if (!hotelsListing) {
      return res.status(404).json({ status: false, message: 'No Hotel found into this city' });
    }
    res.status(200).json({ status: true, data: hotelsListing });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

apicontroller.getAllSetingListing = async (req, res) => {
  try {
    const allSettingListing = await Setting.find();
    res.status(200).json({ status: true, data: allSettingListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteSettingListing = async (req, res) => {
  try {
    const deleteAllSettingListing = await Setting.findById(req.params.id);
    await deleteAllSettingListing.remove();
    res.status(200).json({ status: true, message: 'Setting Items deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.regenerateFlight = async () => {
  const currentDate = new Date();
  console.log("Current Date:", currentDate);


  const allFlights = await FlightsDetails.find();

  const pastFlights = allFlights.filter(flight => {
    const departureTime = new Date(flight.departure.time);
    return departureTime < currentDate;
  });

  const newFlights = pastFlights.map(flight => {
    const newFlight = { ...flight._doc };
    delete newFlight._id;
    return newFlight;
  });
  if (newFlights.length > 0) {
    await FlightsDetails.insertMany(newFlights);
    console.log("Inserted new flights with new IDs.");
  } else {
    console.log("No past flights to insert.");
  }

  const flightIdsToDelete = pastFlights.map(flight => flight._id);
  if (flightIdsToDelete.length > 0) {
    await FlightsDetails.deleteMany({ _id: { $in: flightIdsToDelete } });
    console.log("Deleted past flights.");
  } else {
    console.log("No past flights to delete.");
  }
  console.log("Past Flights", pastFlights);
  return pastFlights;
}

apicontroller.getAllRolesListing = async (req, res) => {
  try {
    const allRolesListing = await roles.find();
    res.status(200).json({ status: true, data: allRolesListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getRoleDataById = async (req, res) => {
  try {
    let roleId = req.params.id
    const roleDataById = await roles.findById(roleId);
    res.status(200).json({ status: true, data: roleDataById });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteParticularRole = async (req, res) => {
  try {
    const deleteParticularRoles = await roles.findById(req.params.id);
    await deleteParticularRoles.remove();
    res.status(200).json({ status: true, message: 'role deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllPermissionListing = async (req, res) => {
  try {
    const allPermissionListing = await permission.find();
    res.status(200).json({ status: true, data: allPermissionListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteParticularPermission = async (req, res) => {
  try {
    const deleteParticularPermission = await permission.findById(req.params.id);
    await deleteParticularPermission.remove();
    res.status(200).json({ status: true, message: 'Permission deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.getAllEmployeeListing = async (req, res) => {
  try {
    const allEmployeeListing = await employees.find().populate('employeeRole');
    res.status(200).json({ status: true, data: allEmployeeListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

apicontroller.deleteParticularEmployee = async (req, res) => {
  try {
    const deleteParticularEmployee = await employees.findById(req.params.id);
    await deleteParticularEmployee.remove();
    res.status(200).json({ status: true, message: 'Employee deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = apicontroller;
