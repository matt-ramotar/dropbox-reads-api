import axios, { Method } from "axios";
import { DBX_PAPER_ACCESS_TOKEN } from "../../../util/secrets";
import Book from "../models/Book";

export default async function createDropboxPaper(book: Book): Promise<string> {
  const config = {
    method: "POST" as Method,
    url: "https://api.dropboxapi.com/2/files/paper/create",
    headers: {
      "Dropbox-API-Arg": `{"path": "/Dropbox Reads/${book.title}.paper", "import_format": "html"}`,
      "Content-Type": "application/octet-stream",
      Authorization: `Bearer ${DBX_PAPER_ACCESS_TOKEN}`
    }
  };

  const response = await axios(config);
  return response.data.url;
}
