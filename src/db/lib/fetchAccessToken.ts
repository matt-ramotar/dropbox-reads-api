import axios, { AxiosResponse } from "axios";
import { DBX_REFRESH_TOKEN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../util/secrets";

export async function fetchAccessToken(): Promise<string> {
  const url = `https://www.googleapis.com/oauth2/v4/token?client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&refresh_token=${DBX_REFRESH_TOKEN}&grant_type=refresh_token`;
  const response: AxiosResponse = await axios.post(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
  return response.data.access_token;
}
