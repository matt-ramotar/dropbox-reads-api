import axios, { AxiosResponse } from "axios";
import { Dropboxer } from "../types";

export async function fetchDropboxer(email: string, accessToken: string): Promise<Dropboxer> {
  const response: AxiosResponse = await axios.get(buildUrl(email, accessToken));
  const data: { dropboxer: Dropboxer } = response.data;
  return data.dropboxer;
}

function buildUrl(email: string, accessToken: string): string {
  return `https://app.dropboxer.net/dropabout/api/dropboxer/${email}?google_access_token=${accessToken}`;
}
