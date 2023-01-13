import axios from "axios";
import { BASE_URL, TOKEN_HEADER } from "./setting";

const getUserInfo = async () => {
  const uri = `${BASE_URL}/user`;
  const tokenHeader = TOKEN_HEADER();

  const response = await axios.get(
    uri,
    {
      headers: {...tokenHeader}
    },
  );
  return response
};

const requestLogin = async ({data}) => {
  const uri = `${BASE_URL}/user/login`;

  const response = await axios.post(
    uri,
    data
  );
  return response
};

const user = {
  getUserInfo: async () =>  await getUserInfo(),
  requestLogin: async (data) =>  await requestLogin({data}),

}

export default user;