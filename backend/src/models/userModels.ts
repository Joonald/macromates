import mongoose from "mongoose";
const { Schema } = mongoose;
import validator from "validator";
import bcrypt from "bcryptjs";

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  password: string;
  passwordConfirm: string | undefined;
  correctPassword(verfyPassword: string, userPassword: string): boolean;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please enter a name."],
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, "Please enter your first name."],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email."],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please enter a password."],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password."],
    select: false,
    validate: {
      // This only works CREATE and SAVE.
      validator: function (this: IUser, el: string) {
        return el === this.password;
      },
      message: "Passwords are not the same.",
    },
  },
});

// MONGOOSE MIDDLEWARE
// encrypt password before saving to database
userSchema.pre("save", async function (next) {
  // Only runs if password has been modified
  if (!this.isModified("password")) return next();
  // Hash password, delete passwordConfirm field
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Instance Methods
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
