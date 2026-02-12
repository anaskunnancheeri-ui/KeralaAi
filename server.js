const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

async function askOllama(prompt) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "phi3",
      prompt: prompt,
      stream: false
    })
  });

  const data = await res.json();
  return data.response;
}

app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message || "";
    const reply = await askOllama(userMsg);
    res.json({ reply });
  } catch (e) {
    res.json({ reply: "❌ Ollama running aano? CMD-il: ollama run phi3" });
  }
});

app.listen(3000, () => {
  console.log("✅ Website running: http://localhost:3000");
});