import express from "express";
import axios from "axios";

const authRouter = express.Router();

const clientId = process.env.GITLAB_CLIENT_ID!;
const clientSecret = process.env.GITLAB_CLIENT_SECRET!;
const redirectUri = process.env.GITLAB_REDIRECT_URI!;

authRouter.get("/gitlab", (req, res) => {
  console.log(clientId);
  const gitlabAuthUrl = `https://gitlab.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=read_api`;
  res.redirect(gitlabAuthUrl);
});

authRouter.get("/gitlab/callback", async (req, res) => {
  const code = req.query.code as string;

  try {
    const response = await axios.post("https://gitlab.com/oauth/token", null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const accessToken = response.data.access_token;
    // Save access token database as needed
    console.log("accessToken: ", accessToken);

    res.redirect("/auth/gitlab/profile");
  } catch (error) {
    console.error("Error getting access token:", error);
    res.status(500).send("Error getting access token");
  }
});

export { authRouter };
