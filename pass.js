import bcrypt from "bcryptjs";

const pass = "p123";

const hashedPassword = await bcrypt.hash(pass, 10);

console.log(hashedPassword);

const isPasswordValid = await bcrypt.compare("p123", hashedPassword);

if (!isPasswordValid) {
  console.log("saimk");
}

console.log(isPasswordValid);
