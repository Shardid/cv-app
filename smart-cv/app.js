const API_KEY = "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";
const sumbitButton = document.querySelector("#submit");
const outPutElement = document.querySelector("#output");
const inputElement = document.querySelector("input");
const historyElement = document.querySelector(".history");
const buttonElement = document.querySelector("button");

function changeInput(value) {
  const inputElementTwo = document.querySelector("input");
  inputElementTwo.value = value;
}

async function getmessage() {
  console.log("clicked");
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY} `,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: [inputElement.value],
      max_tokens: 100,
      temperature: 0,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/completions",
      options
    );
    const data = await response.json();
    console.log(data);
    outPutElement.textContent = data.choices[0].text;
    if (data.choices[0].text && inputElement.value) {
      const pElement = document.createElement("p");
      pElement.textContent = inputElement.value;
      pElement.addEventListener("click", () =>
        changeInput(pElement.textContent)
      );
      historyElement.append(pElement);
    }
  } catch (error) {
    console.error(error);
  }
  clearInput();
}

sumbitButton.addEventListener("click", getmessage);

function clearInput() {
  inputElement.value = "";
}

buttonElement.addEventListener("click", clearInput);

inputElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the default form submission
    getmessage();
  }
});
