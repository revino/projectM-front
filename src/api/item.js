import axios from "axios";
import { TOKEN_HEADER, BASE_URL} from './setting'


const getItemList = async ({data}) => {
  const uri = `${BASE_URL}/itemList/${data.id}`;
  const tokenHeader = TOKEN_HEADER();

  return axios.get(
      uri,
      {
        headers: {...tokenHeader}
      },
  );
}

const getItem = async ({data}) => {
  const uri = `${BASE_URL}/item/${data.id}`;
  const tokenHeader = TOKEN_HEADER();

  return axios.get(
      uri,
      {
        headers: {...tokenHeader}
      },
  );
}

const createItem = async ({data}) => {
  const uri = `${BASE_URL}/item`;
  const tokenHeader = TOKEN_HEADER();
  return axios.post(
      uri,
      data,
      {
        headers: {...tokenHeader}
      },
  );
}

const deleteItem = async ({data}) => {
  const uri = `${BASE_URL}/item/${data.id}`;
  const tokenHeader = TOKEN_HEADER();
  return axios.delete(
      uri,
      {
        headers: {...tokenHeader}
      },
  );
}

const updateItem = async ({data}) => {
  const uri = `${BASE_URL}/item/${data.id}`;
  const tokenHeader = TOKEN_HEADER();
  return axios.put(
      uri,
      data,
      {
        headers: {...tokenHeader}
      },
  );
}

const alarmSetItem = async ({data}) => {
  const uri = `${BASE_URL}/item/alarm/${data.id}`;
  const tokenHeader = TOKEN_HEADER();
  return axios.post(
      uri,
      {},
      {
        headers: {...tokenHeader}
      },
  );
}

const alarmUnsetItem = async ({data}) => {
  const uri = `${BASE_URL}/item/alarm/${data.id}`;
  const tokenHeader = TOKEN_HEADER();
  return axios.delete(
      uri,
      {
        headers: {...tokenHeader}
      },
  );
}




const item = {
  getItemList: async (data) =>  await getItemList({data}),
  getItem: async (data) =>  await getItem({data}),
  createItem: async (data) =>  await createItem({data}),
  deleteItem: async (data) =>  await deleteItem({data}),
  updateItem: async (data) =>  await updateItem({data}),
  alarmSetItem: async (data) =>  await alarmSetItem({data}),
  alarmUnsetItem: async (data) =>  await alarmUnsetItem({data}),
}

export default item;
