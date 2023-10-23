const wrapper = document.querySelector(".wrapper");
const form = document.querySelector("form");
const fileInp = document.querySelector("input");
const infoText = document.querySelector("p");
const closeBtn = document.querySelector(".close");
const copyBtn = document.querySelector(".copy");

//fetch from api

function fetchReq(file, formData) {
  infoText.innerHTML = "Scanning QR Code";
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      infoText.innerText = result
        ? "upload qr to scan"
        : "couldn't Scan QR Code";
      if (!result) return;
      document.querySelector("textarea").innerText = result;
      form.querySelector("img").src = URL.createObjectURL(file);
      wrapper.classList.add("active");
    })
    .catch(() => {
      infoText.innerText = "Couldn't Scan QR Code";
    });
}

//        send QR Code file with request to api
fileInp.addEventListener("change", async (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("file", file);
  fetchReq(file, formData);
});

//        copy to clipboard
copyBtn.addEventListener("click", () => {
  let text = document.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
});
//        when user click on form do FileInp EventListener func
form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));
