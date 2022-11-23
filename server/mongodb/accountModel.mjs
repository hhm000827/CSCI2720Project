import { createRequire } from "module";

const require = createRequire(import.meta.url);
const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
  password: { type: String, required: true, minLength: 4, maxLength: 20 },
  username: { type: String, required: true, unique: true, minLength: 4, maxLength: 20 },
  role: { type: String, required: true },
  salt: { type: String, required: true, unique: true },
  favoritelist: { type: Array },
});
const Account = mongoose.model("Account", AccountSchema);

const buildAccountObject = async (req, salt) => {
  return { username: req.body["username"], password: req.body["password"], salt: salt, favoritelist: [], role: req.body["role"] };
};

export { Account, buildAccountObject };
