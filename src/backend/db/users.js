import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

export const users = [
  {
    _id: uuid(),
    firstName: "Afriart",
    lastName: "User",
    email: "afriartwebsite123@gmail.com",
    password: "afriart123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
