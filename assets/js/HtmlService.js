export default class HtmlService {
  constructor(todoService) {
    this.todoService = todoService;
    this.bindFormEvent();
    this.listTasks();
  }

  bindFormEvent() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("submitted! Value: " + form.item.value);
      form.reset();
      form.item.focus();
    });
  }

  async listTasks() {
    const tasks = await this.todoService.getAll();
    console.log(tasks);
  }
}
