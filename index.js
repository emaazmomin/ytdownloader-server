import express from "express";
import ytdl from "ytdl-core";
import cors from "cors";
const app = express();
const port = 5000 || process.env.PORT;
app.use(cors());
app.get("/", (req, res) => {
  res.send({ Success: "Working" });
});
app.get("/download", async (req, res) => {
  try {
    const videoURL = req.query.url;

    if (!ytdl.validateURL(videoURL)) {
      return res.status(400).json({ error: "Invalid YouTube video URL" });
    }
    // const info = await ytdl.getInfo(videoURL);
    // console.log(info.videoDetails.title);
    // res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
    // res.header('Content-Type', 'video/mp4');
    const videoStream = ytdl(videoURL, { format: "mp4" });
    videoStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
