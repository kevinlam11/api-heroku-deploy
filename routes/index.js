const router = require("express").Router();
const { Location, Traveller, Trip } = require("../models");


router.get("/api/travellers", async (req, res) => {
  try {
    const travellerData = await Traveller.findAll({});
    if (!travellerData) {
      res.status(404).json({
        message: "No categories found!",
      });
      return;
    }
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/api/travellers", async (req, res) => {
  try {
    const travellerData = await Traveller.create(req.body);
    if (!travellerData) {
      res.status(404).json({
        message: "Traveller was not created.",
      });
      return;
    }
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get("/api/travellers/:id", async (req, res) => {
  try {
    // finds by the primary key
    const travellerData = await Traveller.findByPk(req.params.id, {
      // include: [{
      //   model: Product
      // }]
    });
    if (!travellerData) {
      res.status(404).json({
        message: "No Traveller found with this id.",
      });
      return;
    }
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/api/travellers/:id", async (req, res) => {
//   const travellerData = await Traveller.findByPk(req.params.id, {
//     include: [{ model: Location, through: Trip }],
//   });
//   res.json(travellerData);
// });

router.delete("/api/travellers/:id", async (req, res) => {
  try {
    const travellerData = await Traveller.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!travellerData) {
      res.status(404).json({
        message: "No Traveller found with this id.",
      });
      return;
    }
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/api/locations/:id', async (req, res) => {
  const locationData = await Location.findByPk(
    req.params.id,
    {
      include: [{ 
        model: Traveller, 
        through: {
          attributes: []
        }
      }]
    }
  );
 
  res.json(locationData);
});

router.get("/api/locations", async (req, res) => {
  try {
    const locationData = await Location.findAll({
      
    });
    if (!locationData) {
      res.status(404).json({
        message: "No categories found!",
      });
      return;
    }
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/api/trips", async (req, res) => {
  const tripData = await Trip.findAll({});
  res.json(tripData);
});

router.post("/api/trips", async (req, res) => {
  const tripData = await Trip.create(req.body);
  res.json(tripData);
});

router.delete("/api/trips/:id", async (req, res) => {
  const tripData = await Trip.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(tripData);
});
module.exports = router;
