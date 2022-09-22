import mongoose from "mongoose";
import mongooseErr from "mongoose-errors"
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

userSchema.plugin(mongooseErr);
userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);