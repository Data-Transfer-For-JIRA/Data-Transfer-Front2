import axios from 'axios';
import { UpdateProjectLinkType } from './ApiTypes';

export const AxiosPutProjectLink = async (mainJiraKey: string, subJiraKeyList: string[])
  : Promise<UpdateProjectLinkType[] | undefined> => {
  const URL = `${import.meta.env.VITE_API_ADDRESS}/api/platform/weblink`;
  try {
    const response = await axios.put(URL, null, {
      params: {
        mainJiraKey: mainJiraKey,
        subJiraKeyList: subJiraKeyList.join(','),
      }
    })
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}
