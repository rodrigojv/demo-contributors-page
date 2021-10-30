const core = require("@actions/core");
const github = require("@actions/github");
// const nodeFetch = require("node-fetch");
const fetch = (url, options) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, options));
console.log(fetch);
async function run() {
  try {
    // contributor  structure
    let githubName = {
      //   name: github.context.payload.sender.login,
      name: "alefq",
      createdAt: new Date().toISOString(),
    };

    // send the contributor
    const response = await fetch(
      "https://demo-contributors-page.vercel.app/api/contributors",
      {
        method: "POST",
        body: JSON.stringify(githubName),
      }
    );
    const data = await response.json();
    core.setOutput("response was", data);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
