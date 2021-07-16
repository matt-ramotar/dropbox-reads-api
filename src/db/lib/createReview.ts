import axios, { AxiosResponse } from "axios";
import Review from "../../api/reviews/models/Review";

export async function createReview(reviewerId: string, bookId: string, rating: string, body: string): Promise<Review> {
  const url = "https://api.dropboxreads.com/v1/reviews";
  const response: AxiosResponse = await axios.post(url, {
    reviewerId,
    bookId,
    rating,
    body
  });
  return response.data;
}
