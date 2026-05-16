import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    feedback : {
        type : String,
    }
})

export default mongoose.model("Feedback",feedbackSchema);