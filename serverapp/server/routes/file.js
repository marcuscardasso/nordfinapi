import express from 'express';
import utils from "../utils";
const {  authenticator } = utils;
/*import fs from 'fs';
import path from 'path';
import formidable from 'formidable';*/
const router = express.Router();
const file = router;

file.post('/api/upload', authenticator, async (req, res) => {
    const file = req.files.kycfile;

    if (req.user) {
        const uploaddestination = req.user._id;
        file.mv(`./${uploaddestination}/` + file.name);

        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: file.name,
                mimetype: file.mimetype,
                size: file.size
            }
        });
    }
});

export default file;

/*let upload_path = `${__dirname}/`;

    console.log(upload_path)*/