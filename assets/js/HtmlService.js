export default class HtmlService {
  constructor(supermarketService) {
    this.supermarketService = supermarketService;
    this.bindFormEvent();
    this.listTasks();
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
  
  async listTasks() {
    const tasks = await this.supermarketService.getAll();
    console.log(tasks);
  }
}
