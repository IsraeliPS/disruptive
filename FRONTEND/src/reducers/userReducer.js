import { createAccount } from "../services/users/userService";

export const registerAction = async (data) => {
  try {
    return await createAccount(data);
  } catch (e) {
    console.log(e);
  }
};
