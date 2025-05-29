const mongoose = require('mongoose');
const countries = require('i18n-iso-countries');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Enter your email'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Enter your password'],
    minlength: 8,
    maxlength: 200,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confrim your email'],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  nationality: {
    type: String,
    required: [true, 'Where are you from'],
    validate: {
      validator: function (value) {
        const allCountries = Object.values(countries.getNames('en')).map(
          (name) => name.toLocaleLowerCase()
        );
        return allCountries.includes(value.toLocaleLowerCase());
      },
      method: (props) => `${props.value} is not a recognized nation`,
    },
  },
  bio: {
    type: String,
  },
  country_of_residence: {
    type: String,
    validate: {
      validator: function (value) {
        const allCountries = Object.values(countries.getNames('en')).map(
          (name) => name.toLocaleLowerCase()
        );
        return allCountries.includes(value.toLocaleLowerCase());
      },
      method: (props) => `${props.value} is not a recognized nation`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('user', userSchema);
module.exports = User;
