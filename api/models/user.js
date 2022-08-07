const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: String,
    isAdmin: { type: Boolean, default: false },
    historyCheck: [
        {
            date: String,
            value: String,
            win: []
        }
    ],
    age: Number,
    country: String,
    city: String,
    address: String,
    mobile: String,
    postalCode: String,
    fullName: String,
    avatar: { type: String, default: 'https://as2.ftcdn.net/jpg/01/19/32/93/220_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg' }
})

module.exports = mongoose.model('User', userSchema)