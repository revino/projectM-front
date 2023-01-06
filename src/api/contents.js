import axios from "axios";
import { TOKEN_HEADER, BASE_URL} from './setting'

const getContentsList = async ({data}) => {
  const uri = `${BASE_URL}/contentsList/${data.id}`;
  const tokenHeader = TOKEN_HEADER();
  return axios.get(
      uri,
      {
        headers: {...tokenHeader}
      },
  );
}

const createContents = async ({data}) => {
  const uri = `${BASE_URL}/contents`;
  const tokenHeader = TOKEN_HEADER();
  return axios.post(
      uri,
      data,
      {
        headers: {...tokenHeader}
      },
  );
}

const contents = {
  getContentsList: async (data) =>  await getContentsList({data}),
  createContents: async (data) =>  await createContents({data}),
}

export default contents;
