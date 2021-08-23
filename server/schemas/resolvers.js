const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        user: async(parent, {username}) => {
            return User.findOne({username})
            .select('-__v -password')
            // .populate('likedTattoos')
            // .populate('personalWork')
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user}
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const isCorrectPw = await user.isCorrectPassword(password);

            if(!isCorrectPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user);
            return {token, user};
        }
    }
};

module.exports = resolvers;
