import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    duration: {
        type: Number,  // given by cloudinary
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
    
}, {timestamps: true})

videoSchema.plugin(mongoosePaginate); // for aggregation queries

export const Video = mongoose.model("Video", videoSchema);
