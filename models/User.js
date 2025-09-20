const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  phone: { type: String }
}, { timestamps: true });

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = function(candidate){
  const bcrypt = require('bcrypt');
  return bcrypt.compare(candidate, this.password);
}

module.exports = mongoose.model('User', UserSchema);
