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
      this.addTask(form.elements[0].value, form.elements[1].value);
      form.reset();
      form.item.focus();
    });
  }
  async addTask(name, price) {
    const task = { name, price, done: false };
    const taskId = await this.supermarketService.save(task);
    task.id = taskId;
    this.addToHtmlList(task);
  }
  
  async listTasks() {
    const tasks = await this.supermarketService.getAll();
    console.log(tasks);
    tasks.forEach((task) => this.addToHtmlList(task));
  }

  addToHtmlList(task) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    li.setAttribute("data-item-id", task.id);
    span.textContent = task.name + " - R$" + task.price;
    button.textContent = "x";

    if (task.done) {
      li.classList.add("done");
    }

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
  }
}
