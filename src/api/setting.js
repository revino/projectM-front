
import user from './user'
import channel from './channel'
import item from './item'
import contents from './contents'

export const TOKEN_HEADER = () => {
  const headers = {
    "AUTH-TOKEN" : localStorage.getItem("ACCESS_TOKEN"),
  }

  return headers;
}

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = {
  user,
  channel,
  item,
  contents,
}

export default api;