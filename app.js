require("dotenv").config();

const express = require("express")

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.KEY);

async function run(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

app.get("/", (req, res) => {
  res.render("index.html")
})


app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const response = await run(prompt);
  res.send(`${response}`);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000")
})