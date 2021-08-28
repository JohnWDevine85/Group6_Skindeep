// graphQL does not send files and I would like to avoid base64 encryption for now
const router = require('express').Router();
const { Types, mongo } = require('mongoose');
const { db } = require('../../config/connection');

// GET image by id
// api/image/:id
router.get('/:id', (req, res) => {
    const bucket = new mongo.GridFSBucket(db.db, {
        bucketName: 'images'
    });

    try {
        const downStream = bucket.openDownloadStream(Types.ObjectId(req.params.id));
        downStream.pipe(res);
    } catch (err) {
        return res.status(404).send('Error on the database looking for the file.');
    }
})

module.exports = router;