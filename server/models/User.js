const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;   //相同

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
    //name: String
});

//tell mongo build a user collection. Load a schema into mongoose
mongoose.model('users', userSchema);
