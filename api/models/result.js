const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultSchema = new Schema(
    {
        date: {type: String, required: true},
        game: {type: String, required: true}, // then neu can thi find game in Game wth the same name
        jackpot: {
            inIncluded: {type: Boolean, default: false, required: true},
            reward: {type: Number, default: 0},
            winningValues: [String]
        },
        firstPrizes: {
            inIncluded: {type: Boolean, default: false, required: true},
            reward: {type: Number, default: 0},
            winningValues: [String]
        },
        secondPrizes: {
            inIncluded: {type: Boolean, default: false, required: true},
            reward: {type: Number, default: 0},
            winningValues: [String]
        },
        thirdPrizes: {
            inIncluded: {type: Boolean, default: false, required: true},
            reward: {type: Number, default: 0},
            winningValues: [String]
        },
        fourthPrizes: {
            inIncluded: {type: Boolean, default: false, required: true},
            reward: {type: Number, default: 0},
            winningValues: [String]
        },
        fifthPrizes: {
            inIncluded: {type: Boolean, default: false, required: true},
            reward: {type: Number, default: 0},
            winningValues: [String]
        },
        sixthPrizes: {
            inIncluded: {type: Boolean, default: false, required: true},
            reward: {type: Number, default: 0},
            winningValues: [String]
        },
        seventhPrizes: {
            inIncluded: {type: Boolean, default: false, required: true},
            reward: {type: Number, default: 0},
            winningValues: [String]
        },
        eighthPrizes: {
            inIncluded: {type: Boolean, default: false, required: true},
            reward: {type: Number, default: 0},
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