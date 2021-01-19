import bcrypt from "bcryptjs";

const users = [
  {
    name: "Polo Bustillo",
    userName: "PoloBustillo",
    email: "polo@test.com",
    phone: "3317700339",
    password: bcrypt.hashSync("taquinito", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    userName: "JD",
    email: "john@example.com",
    phone: "3327700339",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    userName: "JaD",
    email: "jane@example.com",
    phone: "3337700339",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
