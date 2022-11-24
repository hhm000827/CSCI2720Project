import { createRequire } from "module";

const require = createRequire(import.meta.url);
const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true, minLength: 4, maxLength: 20 },
  role: { type: String, required: true },
  favoritelist: { type: Array },
});
const Account = mongoose.model("Account", AccountSchema);

const buildAccountObject = (req, hashPassword) => {
  return { username: req.body["username"], password: hashPassword, favoritelist: [], role: req.body["role"] };
};

const buildUpdateAccountObject = (req) => {
  return { password: req.body["password"], oldUsername: req.body["oldUsername"], newUsername: req.body["newUsername"] };
};

export { Account, buildAccountObject, buildUpdateAccountObject };
