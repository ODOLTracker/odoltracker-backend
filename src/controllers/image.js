import db from '@/database';
import createError from 'http-errors';
import { v2 as cloudinary } from 'cloudinary';
import { Op } from 'sequelize';
import streamifier from 'streamifier';

/*
* GET /images
* Get all images
*/
export const getImages = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const images = await db.models.Images.findAndCountAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            limit: parseInt(limit),
            offset: parseInt(offset),

        });

        if (!images) {
            return next(createError(404, 'No images found'));
        }

        const totalPages = Math.ceil(images.count / limit);
        const totalImages = images.count;

        res.status(200).json(
            {
                message: 'Vehicle detections fetched successfully',
                images: images.rows,
                totalImages,
                totalPages,
                currentPage: page
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /images/:id
* Get image by id
*/
export const getImage = async (req, res) => {
    try {
        const { id } = req.params;

        const image = await db.models.Images.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        if (!image) {
            return next(createError(404, 'Image not found'));
        }

        res.status(200).json(
            {
                message: 'Image fetched successfully',
                image
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* POST /images
* Create a new image manually
*/
export const createImage = async (req, res) => {
    try {
        const { detectionID, imageURL, cloudinaryPublicID, verificationStatus } = req.body;

        const vehicledetection = await db.models.VehicleDetections.findByPk(detectionID);

        if (!vehicledetection) {
            return next(createError(404, 'Vehicle detection not found'));
        }

        const image = await db.models.Images.create({
            detectionID,
            imageURL,
            cloudinaryPublicID,
            verificationStatus
        });

        res.status(201).json(
            {
                message: 'Image created successfully',
                image
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* PUT /images/:id
* Update image by id
*/
export const updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { detectionID, imageURL, cloudinaryPublicID, verificationStatus } = req.body;

        const vehicledetections = await db.models.VehicleDetections.findByPk(detectionID);

        if (!vehicledetections) {
            return next(createError(404, 'Vehicle detection not found'));
        }

        const image = await db.models.Images.findByPk(id);

        if (!image) {
            return next(createError(404, 'Image not found'));
        }

        image.detectionID = detectionID;
        image.imageURL = imageURL;
        image.cloudinaryPublicID = cloudinaryPublicID;
        image.verificationStatus = verificationStatus;

        await image.save();

        res.status(200).json(
            {
                message: 'Image updated successfully',
                image
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* DELETE /images/:id
* Delete image by id and cloudinaryPublicID
*/
export const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;

        const image = await db.models.Images.findByPk(id);

        if (!image) {
            return next(createError(404, 'Image not found'));
        }

        await cloudinary.uploader.destroy(image.cloudinaryPublicID);
        await image.destroy();

        res.status(200).json(
            {
                message: 'Image deleted successfully'
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* POST /images/upload
* Upload a new image to cloudinary
*/
export const uploadImage = async (req, res) => {
    try {
        const file = req.file;
        const { detectionID } = req.body;

        const vehicledetection = await db.models.VehicleDetections.findByPk(detectionID);

        if (!vehicledetection) {
            return next(createError(404, 'Vehicle detection not found'));
        }

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'vehicles',
                public_id: `vehicle_${detectionID}_${Date.now()}`,
                resource_type: 'image',
            },
            async (error, result) => {
                if (error) {
                    console.error(error);
                    return next(createError(500, 'Image upload failed'));
                }

                const image = await db.models.Images.create({
                    detectionID,
                    imageURL: result.secure_url,
                    cloudinaryPublicID: result.public_id,
                    verificationStatus: 'Unverified'
                });

                res.status(201).json(
                    {
                        message: 'Image uploaded successfully',
                        image
                    }
                );
            }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /images/:id/verify
* Verify image by id
*/
export const verifyImage = async (req, res) => {
    try {
        const { id } = req.params;

        const image = await db.models.Images.findByPk(id);

        if (!image) {
            return next(createError(404, 'Image not found'));
        }

        image.verificationStatus = 'Verified';

        await image.save();

        res.status(200).json(
            {
                message: 'Image verified successfully',
                image
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /images/:id/reject
* Reject image by id
*/
export const rejectImage = async (req, res) => {
    try {
        const { id } = req.params;

        const image = await db.models.Images.findByPk(id);

        if (!image) {
            return next(createError(404, 'Image not found'));
        }

        image.verificationStatus = 'Rejected';

        await image.save();

        res.status(200).json(
            {
                message: 'Image rejected successfully',
                image
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /images/:detectionID/verified
* Get all verified images
*/
export const getVerifiedImages = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { detectionID } = req.params;

        const offset = (page - 1) * limit;

        const images = await db.models.Images.findAndCountAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: {
                detectionID,
                verificationStatus: 'Verified'
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        if (!images) {
            return next(createError(404, 'No images found'));
        }

        const totalPages = Math.ceil(images.count / limit);
        const totalImages = images.count;

        res.status(200).json(
            {
                message: 'Verified images fetched successfully',
                images: images.rows,
                totalImages,
                totalPages,
                currentPage: page
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /images/:detectionID/unverified
* Get all unverified images
*/
export const getUnverifiedImages = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { detectionID } = req.params;

        const offset = (page - 1) * limit;

        const images = await db.models.Images.findAndCountAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: {
                detectionID,
                verificationStatus: 'Unverified'
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        if (!images) {
            return next(createError(404, 'No images found'));
        }

        const totalPages = Math.ceil(images.count / limit);
        const totalImages = images.count;

        res.status(200).json(
            {
                message: 'Unverified images fetched successfully',
                images: images.rows,
                totalImages,
                totalPages,
                currentPage: page
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /images/:detectionID/rejected
* Get all rejected images
*/
export const getRejectedImages = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { detectionID } = req.params;

        const offset = (page - 1) * limit;

        const images = await db.models.Images.findAndCountAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: {
                detectionID,
                verificationStatus: 'Rejected'
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        if (!images) {
            return next(createError(404, 'No images found'));
        }

        const totalPages = Math.ceil(images.count / limit);
        const totalImages = images.count;

        res.status(200).json(
            {
                message: 'Rejected images fetched successfully',
                images: images.rows,
                totalImages,
                totalPages,
                currentPage: page
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /images/:detectionID/current-image-to-verify
* Get first unverified image
*/
export const getCurrentImageToVerify = async (req, res, next) => {
    try {
        const { detectionID } = req.params;

        const image = await db.models.Images.findOne({
            where: {
                detectionID,
                verificationStatus: 'Unverified'
            },
            order: [['createdAt', 'ASC']],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!image) {
            return next(createError(404, 'No unverified image found'));
        }

        res.status(200).json({
            message: 'First unverified image fetched successfully',
            image
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /images/:detectionID/next-image-to-verify
* Get next unverified image (based on createdAt)
*/
export const getNextImageToVerify = async (req, res, next) => {
    try {
        const { detectionID } = req.params;

        // Ambil image terakhir yang sudah diverifikasi atau ditolak
        const lastCheckedImage = await db.models.Images.findOne({
            where: {
                detectionID,
                verificationStatus: ['Verified', 'Rejected']
            },
            order: [['createdAt', 'DESC']],
        });

        const nextImage = await db.models.Images.findOne({
            where: {
                detectionID,
                verificationStatus: 'Unverified',
                createdAt: {
                    [Op.gt]: lastCheckedImage ? lastCheckedImage.createdAt : new Date(0)
                }
            },
            order: [['createdAt', 'ASC']],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!nextImage) {
            return next(createError(404, 'No next unverified image found'));
        }

        res.status(200).json({
            message: 'Next unverified image fetched successfully',
            image: nextImage
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
