import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } }
);

// checking password after saving it to the database
userSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

// hashing a password before saving it to the database
userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

/**
 * Authenticate input against database
 */
// UserSchema.static.authenticate = function (email, password, callback) {
//     User.findOne({ email: email }).exec(function(err, user) {
//         if (err) {
//             return callback(err);
//         } else if (!user) {
//             var error = new Error('User not found');
//             error.status = 401;
//             return callback(err);
//         }

//         bcrypt.compare(password, user.password, function (err, result) {
//             if (result === true) {
//                 return callback(null, user);
//             } else {
//                 return callback();
//             }
//         });
//     });
// };

var User = mongoose.model('Users', userSchema);
export default User;