const form = document.getElementById('form');
const taskInput = document.getElementById('taskInput');
const tasksList = document.getElementById('tasksList');
const emptyList = document.getElementById('emptyList');

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

let tasks = []

if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach(task => renderTask(task));
}

checkEmptyList()

function addTask(event) {
	// Відміняємо відправку форми
	event.preventDefault();

	// Дістаємо текст задачі з поля вводу
	const taskText = taskInput.value;

	// Описуємо задачу в вигляді обєкту
	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false,
	};

	// Добавляємо задачу в масив з задачами
	tasks.push(newTask)

	// Зберігаємо список задач в массив з задачасми 
	saveToLocalStorage()

	// Рендеремо задачу на сторінці
	renderTask(newTask)

	// Очищуємо поле вводу та повертаємо на него фокус
	taskInput.value = '';
	taskInput.focus();

	checkEmptyList()
}

function deleteTask(event) {
	// Провіряємо що клік був по кнопці "Видалити задачу"
	if (event.target.dataset.action == 'delete') {

		const parentNode = event.target.closest('.list-group-item');

		// Визначаємо ID задачи
		const id = +parentNode.id;
		// Видаляэмо задачу ченез фільтрацію масива
		tasks = tasks.filter(task => task.id !== id);

		// Зберігаємо список задач в массив з задачасми 
		saveToLocalStorage()

		// Видаляэмо задачу із розмітки
		parentNode.remove();

		checkEmptyList()

	}

}

function doneTask(event) {
	// Провіряємо що клік був по кнопці "Задача виконана"
	if (event.target.dataset.action == 'done') {
		const parentNode = event.target.closest('.list-group-item')

		// Визначаємо ID задачи
		const id = +parentNode.id;
		const task = tasks.find(task => task.id === id);
		task.done = !task.done;
		// Зберігаємо список задач в массив з задачасми 
		saveToLocalStorage()

		const taskTitle = parentNode.querySelector('.task-title')
		taskTitle.classList.toggle('task-title--done')
	}
}

function checkEmptyList() {
	if (tasks.length === 0) {
		const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
                  <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3" />
                  <div class="empty-list__title">Список дел пуст</div>
               </li>`;
		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
	};

	if (tasks.length > 0) {
		const emptyListEl = document.querySelector('#emptyList');
		emptyListEl ? emptyListEl.remove() : null;
	};
}

function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
	// Формуємо CSS клас
	const cssClass = task.done ? 'task-title task-title--done' : 'task-title'

	// Формуємо розмітку для новой задачі
	const taskHTML = `
						<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
							<span class="${cssClass}">${task.text}</span>
							<div class="task-item__buttons">
								<button type="button" data-action="done" class="btn-action">
									<img src="./img/tick.svg" alt="Done" width="18" height="18">
								</button>
								<button type="button" data-action="delete" class="btn-action">
									<img src="./img/cross.svg" alt="Done" width="18" height="18">
								</button>
							</div>
						</li>`;

	// Добавляємо задачу на сторінку
	tasksList.insertAdjacentHTML('beforeend', taskHTML);
}