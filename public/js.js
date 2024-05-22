const btn = document.getElementById("btn");
const response = document.querySelector("#response");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => e.preventDefault());

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const prompt = document.querySelector("input").value;
  if (!prompt) {
    alert("Please enter a prompt");
    return;
  };
  document.querySelector("input").value = "";
  const res = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }), 
  }).catch(console.error);

  const data = await res.text();

  while (!data) {
    response.innerHTML = "Loading...";
  }

    const text = data.split("\n");
    text.forEach((t) => {
      const p = document.createElement("p");
      p.textContent = t;
      response.appendChild(p);
    });
  
});