// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return get(req, res);
    }

    case "POST": {
      return add(req, res);
    }
  }
}

async function get(req, res) {
  try {
    let { db } = await connectToDatabase();
    let names = await db
      .collection("github_names")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return res.json({
      list: JSON.parse(JSON.stringify(names)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// Adding a new post
async function add(req, res) {
  try {
    let { db } = await connectToDatabase();
    const body = req.body;
    console.log({ body });
    const parsedBody = JSON.parse(body);
    console.log({ parsedBody });
    await db.collection("github_names").insertOne(parsedBody);
    return res.json({
      message: "added successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
