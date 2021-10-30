// var { client_id, client_secret } = require('../../app-config.json')
// var params = `?client_id=${client_id}&client_secret=${client_secret}`

function getErrorMessage(message, username) {
  if (message === "Not Found") {
    return `${username} doesn't exist.`;
  }
  return message;
}

export function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
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
