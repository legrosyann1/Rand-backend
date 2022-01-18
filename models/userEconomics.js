import mongoose from 'mongoose';

const vaultSchema = mongoose.Schema({
  name: String,
  amount: Number,
  type: String,
});

const userSchema = mongoose.Schema({
  name: String,
  balance: { type: Number, default: 1000 },
  vaults: [ vaultSchema ],
  prizes: [ { amount: Number, vault: vaultSchema} ]
});

export const userModel = mongoose.model('userModel', userSchema);
export const vaultModel = mongoose.model('vaultModel', vaultSchema)
