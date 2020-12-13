const doneCssClass = 'done';
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

  getTaskId(li) {
    return +li.getAttribute("data-item-id");
  }

  async deleteTask(li) {
    const taskId = this.getTaskId(li);
    await this.supermarketService.delete(taskId);
    li.remove();
  }

  async saveTask(taskId, isDone) {
    const task = await this.supermarketService.get(taskId);
    task.done = isDone;
    await this.supermarketService.save(task);
  }

  toggleTask(li) {
    const taskId = this.getTaskId(li);
    li.classList.toggle(doneCssClass);
    const isDone = li.classList.contains(doneCssClass);
    this.saveTask(taskId, isDone);
  }

  addToHtmlList(task) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    li.setAttribute("data-item-id", task.id);
    
    li.addEventListener("click", () => this.toggleTask(li));

    if (task.done) {
      li.classList.add(doneCssClass);
    }
    
    span.textContent = task.name + " - R$" + task.price;
    button.textContent = "x";

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      this.deleteTask(li);
    });

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
  }
}
