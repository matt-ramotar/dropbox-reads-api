export interface DbxReadsResponse {
  email: string;
  googleId: string;
  reason?: string;
  tags: string;
  timestamp: string;
  firstName: string;
  role: string;
  "Article URL": string;
  "Title of Book": string;
  "Author of Book": string;
  "Link to Book": string;
  "Your Team at Dropbox": string;
  "Your Last Name": string;
  expert: string;
  migrated: string;
}

export interface Dropboxer {
  last_name: string;
  photo: string;
  first_name: string;
  location: string;
  manager_email: string;
  team: string;
  organization: string;
  job_title: string;
}

export interface GoogleBook {
  id: string;

  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    description: string;
    categories: string[];
    imageLinks: {
      thumbnail?: string;
      large?: string;
    };
  };
}
