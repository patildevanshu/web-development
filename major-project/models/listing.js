const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        // required : true
    },
        image : {
        type : String,
        default : "https://unsplash.com/photos/a-scooter-is-parked-in-front-of-a-building-VIc3kJP4yRE" , 
        set : (v) => v === "" ? "https://unsplash.com/photos/a-scooter-is-parked-in-front-of-a-building-VIc3kJP4yRE" : v 
    },
    price : {
        type : Number,
        // required : true
    },
    location : {
        type : String,
        // required : true
    },
    country : {
        type : String,
        // required : true
    }

})

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;