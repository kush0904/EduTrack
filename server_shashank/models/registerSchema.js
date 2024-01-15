const jwt=require('jsonwebtoken');
const mongoose = require("mongoose")
const bcrypt=require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    id: {
        type:Number,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    tokens: [
        {
            token: {
                type:String,
                required:true
            }
        }
    ]
});


//12 is the number of rounds for the bcrrypt hashing algo
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, 12);
        } catch (error) {
            console.error(error);
        }
    }
    next();
});

//generate token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = await jwt.sign({ _id: this._id }, "ashdjfkcnhdskgbcnshdncueisopfjpkssds");
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.error("err");
    }
}

module.exports = mongoose.model("user", userSchema);