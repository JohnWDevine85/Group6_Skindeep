const { User, Tattoo } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('likedTattoos')
                    .populate('personalWork');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('likedTattoos')
                .populate('personalWork');
        },

        tattoo: async (parent, { _id }) => {
            return await Tattoo.findOne({ _id })
                .select('-__v')
                .populate('comments');
        },

        tattoos: async (parent, { title }) => {
            const params = title ? { title } : {};

            return await Tattoo.find(params)
                .select('-__v -comments')
                .sort({ createdAt: -1 });
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user }
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const isCorrectPw = await user.isCorrectPassword(password);

            if (!isCorrectPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user);
            return { token, user };
        },

        addTattoo: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            const newTattoo = await Tattoo.create({ ...args, username: context.user.username });

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { personalWork: newTattoo } },
                { new: true }
            )

            return newTattoo;
        },

        removeTattoo: async (parent, { tattooId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { personalWork: { _id: tattooId } } },
                { new: true }
            )

            await Tattoo.findOneAndDelete({ _id: tattooId });

            return updatedUser;
        },

        likeTattoo: async (parent, { tattooId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { likedTattoos: _id } },
                { new: true }
            )
                .populate('likedTattoos');

            const updatedTattoo = await Tattoo.findOneAndUpdate(
                { _id },
                { $inc: { 'likes': 1 } },
                { new: true }
            )
                .populate('comments')

            return updatedTattoo;
        },

        unlikeTattoo: async (parent, { tattooId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { likedTattoos: _id } },
                { new: true }
            )
                .populate('likedTattoos');

            const updatedTattoo = await Tattoo.findOneAndUpdate(
                { _id },
                { $inc: { 'likes': -1 } },
                { new: true }
            )
                .populate('comments')

            return updatedTattoo;
        },

        addComment: async (parent, { tattooId, commentBody }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            return await Tattoo.findOneAndUpdate(
                { _id: tattooId },
                { $push: { comments: { commentBody, username: context.user.username } } },
                { new: true }
            )
                .populate('comments');
        }
    }
};

module.exports = resolvers;
