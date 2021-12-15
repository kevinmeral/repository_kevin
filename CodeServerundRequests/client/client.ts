const dateInput: HTMLInputElement = <HTMLInputElement> document.getElementById("dateInput");
const button: HTMLButtonElement = <HTMLButtonElement> document.getElementById("send");
const answerArea: HTMLElement = document.getElementById("answer");

const url: string = "http://127.0.0.1:3000";
const path: string = "/convertDate"; 

button.addEventListener("click", (evt: Event) => {
  evt.preventDefault();
  sendFormAndShow();
});


async function communicate(url: RequestInfo): Promise<string> { 
  let response: Response = await fetch(url); 
  let date: string = await response.text();
  console.log(date);
  return date;
}

async function sendFormAndShow(): Promise<void> {
  let inputValue: string = JSON.stringify(dateInput.value);
  let serverResponse: string = await communicate(url + path + `?date=${inputValue}`); 
  let newDate: HTMLElement = document.createElement("p");
  newDate.className = "serverResponse";
  newDate.textContent = serverResponse;

  answerArea.appendChild(newDate);
}
