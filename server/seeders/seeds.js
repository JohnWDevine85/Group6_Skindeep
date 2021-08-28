const faker = require('faker');
const fs = require('fs');
const path = require('path')

const { db, mongo } = require('../config/connection');

const { User, Tattoo } = require('../models');

db.once('open', async () => {
    const bucket = new mongo.GridFSBucket(db.db, {
        bucketName: 'images'
    });

    await Tattoo.deleteMany({});
    await User.deleteMany({});

    // clean the bucket
    await new Promise((resolve, reject) => {
        bucket.drop(resolve)
    })

    // create user data
    const userData = [];

    for (let i = 0; i < 10; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();
        const bio = faker.lorem.words(Math.round(Math.random() * 20) + 1);


        userData.push({ username, email, password, bio });
    }

    const createdUsers = await User.collection.insertMany(userData);

    // create Tattoos
    let createdTattoos = [];
    for (let i = 0; i < 10; i += 1) {

        const title = faker.lorem.words(Math.round(Math.random() * 4) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username } = createdUsers.ops[randomUserIndex];

        // seed images
        const imageIndex = 1//Math.floor(Math.random() * 10) + 1;
        const imageId = await writeImage(bucket, `image${imageIndex}.png`);

        const description = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const createdTattoo = await Tattoo.create(
            {
                title,
                username,
                imageId,
                description
            });

        const updatedUser = await User.updateOne(
            { username },
            { $push: { personalWork: createdTattoo._id } }
        );

        createdTattoos.push(createdTattoo);
    }

    // create comments
    for (let i = 0; i < 100; i += 1) {
        const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username } = createdUsers.ops[randomUserIndex];

        const randomTattooIndex = Math.floor(Math.random() * createdTattoos.length);
        const { _id: tattooId } = createdTattoos[randomTattooIndex];

        const updatedTattoo = await Tattoo.updateOne(
            { _id: tattooId },
            { $push: { comments: { commentBody, username } } },
            { runValidators: true }
        );
    }

    console.log('all done!');
    process.exit(0);
});

const writeImage = (bucket, imageName) => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(`./seeders/images/${imageName}`).
            pipe(bucket.openUploadStream(imageName)).
            on('error', function (error) {
                reject(error)
            }).
            on('finish', function (image) {
                resolve(image._id);
            });
    })
}
