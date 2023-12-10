import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      //Check duplicate user
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      //Check password with bcrypt compare method
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }
      //Authenticate jwt sign(login OK)
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
