export default class HtmlService {
  constructor() {
    this.bindFormEvent();
  }

  bindFormEvent() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("submitted! [" + form.elements[0].value + "] [" + form.elements[1].value + "]");
      form.reset();
      form.item.focus();
    });
  }
}
