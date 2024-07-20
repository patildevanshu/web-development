const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

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
        default : "https://images.unsplash.com/photo-1618245318763-a15156d6b23c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
        set : (v) => v === "" ? "https://images.unsplash.com/photo-1618245318763-a15156d6b23c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v 
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
    },
    review : [{
        type : Schema.Types.ObjectId,
        ref : "Review"
    }]

})

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({_id : { $in :  listing.review  }});
    }
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;