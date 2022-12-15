// Hau Ho Man (1155142373) 	Li Pok Man (1155144098)
// Chan Ho Him (1155142195)	Chan King Yu (1155142699)
// Ng Hon Ling (1155136169)	Thalang Ikshahang (1155136408)
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
