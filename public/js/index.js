// asyn fech function resusable
async function request(path, method, data) {
  try {
    const res = await fetch(`${APP_URI}${PORT}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    console.error("API error:", err.response?.data || err.message);
    throw err;
  }
}

// gets user input submit button
const userInputSubmitBtn = document.querySelector("#userInputSubmitBtn");

// get user input URI
const userInputURI = document.querySelector("#uri");

// get user promt text area
const userInputPromt = document.querySelector("#userInput");

// event listener for submit button to make request to ai
userInputSubmitBtn.addEventListener("click", () => {
  const data = {
    userInputURI: userInputURI.value,
    userInputPrompt: userInputPromt.value,
  };
  const response = request(AI_REQUEST_POST_ROUTE, "POST", data);
  response.then((d) => {
    document.querySelector("#resp").innerHTML = d.response.response;
  });
});
