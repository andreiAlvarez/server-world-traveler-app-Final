const express = require("express");
const router = express.Router();
const Spot = require('../models/Spot.model');
const uploadCloud = require("../configs/cloudinary-setup");

// Product product Image Upload
router.post(
    "/spots/image/:spotsId",
    uploadCloud.single("pictureUrl"),
    (req, res, next) => {
        console.log('single upload');
        console.log({singleFile: req.file})
        Spot.findByIdAndUpdate(
            req.params.spotsId,
            { pictureUrl: req.file.path },
            { new: true }
        )
            .then((updatedSpot) => {
                res.status(200).json(updatedSpot);
            })
            .catch((err) => res.status(400).json(err));
    }
);

router.patch(
    "/spots/imageArray/:spotsId",
    uploadCloud.array("imageArray"),
    (req, res, next) => {
        console.log({ arrayFile: req.files });
        Spot.findById(req.params.spotsId)
            .then((spotsFromDB) => {
                console.log({ spotsFromDB });
                req.files.forEach((file) => {
                    spotsFromDB.imageArray.push(file.path);
                });
                spotsFromDB
                    .save()
                    .then((updatedSpot) => {
                        console.log({ updatedSpot });
                        res.status(200).json(updatedSpot);
                    })
                    .catch((err) =>
                        res
                            .status(400)
                            .json({ message: "error pushing urls: ", err })
                    );
            })
            .catch((err) =>
                res
                    .status(400)
                    .json({ message: "error finding spot: ", err })
            );
    }
);
 
module.exports = router;
