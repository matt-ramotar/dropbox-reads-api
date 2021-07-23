import axios, { AxiosResponse } from "axios";
import { GoogleBook } from "../types";

export async function fetchGoogleBook(googleBookId: string): Promise<GoogleBook> {
  const response: AxiosResponse = await axios.get(buildUrl(googleBookId));
  const data: GoogleBook = response.data;
  return data;
}

function buildUrl(googleBookId: string): string {
  return `https://www.googleapis.com/books/v1/volumes/${googleBookId}`;
}
