function getSentences(text) {
  return text.match(/[^\.!\?]+[\.!\?]+/g) || [];
}

function extractKeywords(text) {
  const stopWords = ["the", "and", "of", "to", "is", "in", "that", "this", "with", "a", "an", "on", "for"];
  const words = text.toLowerCase().match(/\b(\w+)\b/g);
  const freqMap = {};

  if (!words) return [];

  words.forEach(word => {
    if (!stopWords.includes(word)) {
      freqMap[word] = (freqMap[word] || 0) + 1;
    }
  });

  return Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(entry => entry[0]);
}

function generateSummary() {
  const text = document.getElementById("inputText").value.trim();
  const output = document.getElementById("outputContent");
  const isPublisher = document.getElementById("modeToggle").checked;

  if (!text) {
    output.innerText = "❗ Please enter some text.";
    return;
  }

  const sentences = getSentences(text);
  const summary = sentences.slice(0, 2).join(" ") + "\n\n" + sentences[sentences.length - 1];

  if (isPublisher) {
    output.innerText = `📌 Abstract-Like Summary:\n${summary}\n\n📋 Publishing Checklist:\n✔ Title clarity\n✔ Author info\n✔ Abstract present\n✔ Keywords\n✔ References formatted`;
  } else {
    output.innerText = `📝 Summary:\n${summary}`;
  }
}

function generateBulletPoints() {
  const text = document.getElementById("inputText").value.trim();
  const output = document.getElementById("outputContent");

  if (!text) {
    output.innerText = "❗ Please enter some text.";
    return;
  }

  const sentences = getSentences(text).slice(0, 5);
  const points = sentences.map(s => `• ${s.trim()}`).join("\n");
  output.innerText = `📍 Key Points:\n${points}`;
}

function askAssistant() {
  const text = document.getElementById("inputText").value.trim();
  const output = document.getElementById("outputContent");

  if (!text) {
    output.innerText = "❗ Please enter some text.";
    return;
  }

  const keywords = extractKeywords(text);
  output.innerText = `🤖 Assistant Suggestions:\n• What is the role of "${keywords[0]}"?\n• How does "${keywords[1]}" impact the topic?\n• Can this be applied in "${keywords[2]}"?\n\n🧠 Keywords: ${keywords.join(", ")}`;
}
