// api.js
var clientId = process.env.GITHUB_CLIENT_ID;
var secret = process.env.GITHUB_CLIENT_SECRET;
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
