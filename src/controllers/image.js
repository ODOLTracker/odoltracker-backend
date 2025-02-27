import db from '@/database';

/*
* GET /images
* Get all images
*/
export const getImages = async (req, res) => {};

/*
* GET /images/:id
* Get image by id
*/
export const getImage = async (req, res) => {};

/*
* POST /images
* Create a new image
*/
export const createImage = async (req, res) => {};

/*
* PUT /images/:id
* Update image by id
*/
export const updateImage = async (req, res) => {};

/*
* DELETE /images/:id
* Delete image by id
*/

export const deleteImage = async (req, res) => {};

/*
* POST /images/upload
* Upload a new image
*/
export const uploadImage = async (req, res) => {};

/*
* GET /images/:id/verify
* Verify image by id
*/
export const verifyImage = async (req, res) => {};

/*
* GET /images/:id/reject
* Reject image by id
*/
export const rejectImage = async (req, res) => {};

/*
* GET /images/:detectionID/verified
* Get all verified images
*/
export const getVerifiedImages = async (req, res) => {};

/*
* GET /images/:detectionID/unverified
* Get all unverified images
*/
export const getUnverifiedImages = async (req, res) => {};

/*
* GET /images/:detectionID/rejected
* Get all rejected images
*/
export const getRejectedImages = async (req, res) => {};

/* 
* GET /images/:detectionID/current-image-to-verify
* Get current image to verify
*/
export const getCurrentImageToVerify = async (req, res) => {};

/*
* GET /images/:detectionID/next-image-to-verify
* Get next image to verify
*/
export const getNextImageToVerify = async (req, res) => {};