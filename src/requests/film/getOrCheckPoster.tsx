import getCSRFToken from "../getToken";

const csrfToken = getCSRFToken();

export async function getRandomPoster(apiOrigin: string) {
  const response = await fetch(`${apiOrigin}film/getRandom/`);
  return response.json();
}

export async function checkGuess(
  apiOrigin: string,
  posterId: number,
  guess: string
) {
  const response = await fetch(`${apiOrigin}film/checkGuess/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CSRFToken": csrfToken },
    body: JSON.stringify({ poster_id: posterId, guess: guess }),
  });

  return response.json();
}

export async function getMovieTitleSuggestion(
  apiOrigin: string,
  userText: string
) {
  // This function gets movie titles suggestions, based on the user provided movie title.
  const response = await fetch(`${apiOrigin}film/getMovieSuggestions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CSRFToken": csrfToken },
    body: JSON.stringify({ userText: userText }),
  });

  return response.json();
}
