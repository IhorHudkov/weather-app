const searchForm = document.querySelector("form");
const input = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message1.textContent = 'Loading...';
  message2.textContent = '';

  const address = input.value;

  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast;
      }
    });
  });
});
