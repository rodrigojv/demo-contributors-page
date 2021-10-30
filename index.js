const core = require("@actions/core");
const github = require("@actions/github");
const fetch = (url, options) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, options));

async function run() {
  try {
    // contributor structure
    let githubName = {
      name: github.context.payload.sender.login,
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
    core.setOutput("response", data);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
