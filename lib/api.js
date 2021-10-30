// api.js
var clientId = process.env.GITHUB_CLIENT_ID;
var secret = process.env.GITHUB_CLIENT_SECRET;
var tenorKey = process.env.TENOR_KEY;
var params = `?client_id=${clientId}&client_secret=${secret}`;

function getErrorMessage(message, username) {
  if (message === "Not Found") {
    return `${username} doesn't exist.`;
  }
  return message;
}

export function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then((res) => {
      return res.json();
    })
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMessage(profile.message, username));
      }
      return profile;
    });
}

export async function getRandomGif(searchTerm = "thank you") {
  const url = `https://g.tenor.com/v1/random?q=${encodeURIComponent(
    searchTerm
  )}&limit=1&media_filter=minimal&contentfilter=low`;

  console.log(`Searching Tenor: ${url}`);

  const response = await fetch(`${url}&key=${tenorKey}`);
  const data = await response.json();
  const gifUrl = data.results[0].media[0].tinygif.url;

  console.log(`Found gif from Tenor: ${gifUrl}`);
  return gifUrl;
}
