const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultSchema = new Schema(
    {
        date: {type: String, required: true},
        game: {type: String, required: true}, // then neu can thi find game in Game wth the same name
        jackpot: {
            reward: {type: Number, default: 30000}, // hardcoded here
            winningValues: [String]
        },
        firstPrizes: {
            reward: {type: Number, default: 3000},
            winningValues: [String]
        },
        secondPrizes: {
            reward: {type: Number, default: 1000},
            winningValues: [String]
        },
        thirdPrizes: {
            reward: {type: Number, default: 500},
            winningValues: [String]
        },
        fourthPrizes: {
            reward: {type: Number, default: 100},
            winningValues: [String]
        },
        fifthPrizes: {
            reward: {type: Number, default: 50},
            winningValues: [String]
        },
        sixthPrizes: {
            reward: {type: Number, default: 0},
            winningValues: [String]
        },
        seventhPrizes: {
            reward: {type: Number, default: 0},
            winningValues: [String]
        },
        eighthPrizes: {
            reward: {type: Number, default: 0},
            winningValues: [String]
        },
        countdown: {
            day: {type: Number, default: 0},
            hour: {type: Number, default: 0},
            minute: {type: Number, default: 0},
            second: {type: Number, default: 0}
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Result', resultSchema)