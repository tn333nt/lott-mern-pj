const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultSchema = new Schema(
    {
        date: {type: String, required: true},
        game: {type: String, required: true}, // then neu can thi find game in Game wth the same name
        jackpot: {
            reward: Number, // hardcoded here
            winningValues: [String]
        },
        firstPrizes: {
            reward: Number,
            winningValues: [String]
        },
        secondPrizes: {
            reward: Number,
            winningValues: [String]
        },
        thirdPrizes: {
            reward: Number,
            winningValues: [String]
        },
        fourthPrizes: {
            reward: Number,
            winningValues: [String]
        },
        fifthPrizes: {
            reward: Number,
            winningValues: [String]
        },
        sixthPrizes: {
            reward: Number,
            winningValues: [String]
        },
        seventhPrizes: {
            reward: Number,
            winningValues: [String]
        },
        eighthPrizes: {
            reward: Number,
            winningValues: [String]
        },
        countdown: {
            day: {type: Number, default: 0},
            hour: {type: Number, default: 0},
            minute: {type: Number, default: 0},
            second: {type: Number, default: 0}
        },
        // can 'required' is customized in here ?
    },
    { timestamps: true }
)

module.exports = mongoose.model('Result', resultSchema)