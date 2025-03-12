import mongoose from "mongoose"



const BookmarkSchema = new mongoose.Schema({

    articleId: String,
    title: String,
    source: String,
    url: String,
    imageUrl: String,
    publishedAt: Date,
    addedAt: { type: Date, default: Date.now },

});







const ReadingHistorySchema = new mongoose.Schema({

    articleId: String,
    title: String,
    source: String,
    url: String,
    imageUrl: String,
    publishedAt: Date,
    readAt: { type: Date, default: Date.now },
})









const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, email: { type: String }, password: { type: String },
    preferences: [String],
    bookmarks: [String],
    readingHistory:[ReadingHistorySchema],
    bookmarks:[BookmarkSchema]
    



})




const User = mongoose.model("User", userSchema)

export default User