import axios from "axios";
import { TOKEN_HEADER, BASE_URL} from './setting'


const getChannel = async ({data}) => {
  const uri = `${BASE_URL}/channel/${data.id}`;
  const tokenHeader = TOKEN_HEADER();
  return axios.get(
      uri,
      {
        headers: {...tokenHeader}
      },
  );
}

const createChannel = async ({data}) => {
  const uri = `${BASE_URL}/channel`;
  const tokenHeader = TOKEN_HEADER();
  return axios.post(
      uri,
      {
        name : data.name
      },
      {
        headers: {...tokenHeader}
      },
  );
}

const updateChannel = async ({data}) => {
  const uri = `${BASE_URL}/channel/${data.id}`;
  const tokenHeader = TOKEN_HEADER();
  return axios.put(
      uri,
      {
        name : data.name
      },
      {
        headers: {...tokenHeader}
      },
  );
}

const deleteChannel = async ({data}) => {
  const uri = `${BASE_URL}/channel/${data.id}`;
  const tokenHeader = TOKEN_HEADER();
  return axios.delete(
      uri,
      {
        headers: {...tokenHeader}
      },
  );
}

const subscribeChannel = async ({data}) => {
  const uri = `${BASE_URL}/channel/sub/${data.id}`;
  const tokenHeader = TOKEN_HEADER();
  return axios.put(
      uri,
      {},
      {
        headers: {...tokenHeader}
      },
  );
}

const unsubscribeChannel = async ({data}) => {
  const uri = `${BASE_URL}/channel/unsub/${data.id}`;
  const tokenHeader = TOKEN_HEADER();
  return axios.put(
      uri,
      {},
      {
        headers: {...tokenHeader}
      },
  );
}

const setCurrentChannel = async ({data}) => {
  const uri = `${BASE_URL}/user/channel/${data.id}`;
  const tokenHeader = TOKEN_HEADER();
  return axios.put(
      uri,
      {},
      {
        headers: {...tokenHeader}
      },
  );
}

const channel = {
  getChannel: async (data) =>  await getChannel({data}),
  createChannel: async (data) =>  await createChannel({data}),
  updateChannel: async (data) =>  await updateChannel({data}),
  deleteChannel: async (data) =>  await deleteChannel({data}),
  subscribeChannel: async (data) =>  await subscribeChannel({data}),
  unsubscribeChannel: async (data) =>  await unsubscribeChannel({data}),
  setCurrentChannel: async (data) =>  await setCurrentChannel({data}),
}

export default channel;
