const form = document.getElementById('form');
const taskInput = document.getElementById('taskInput');
const tasksList = document.getElementById('tasksList');
const emptyList = document.getElementById('emptyList');

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

function addTask(event) {
	// Відміняємо відправку форми
	event.preventDefault();

	// Дістаємо текст задачі з поля вводу
	const taskText = taskInput.value;

	// Формуємо розмітку для новой задачі
	const taskHTML = `
					<li class="list-group-item d-flex justify-content-between task-item">
						<span class="task-title">${taskText}</span>
						<div class="task-item__buttons">
							<button type="button" data-action="done" class="btn-action">
								<img src="./img/tick.svg" alt="Done" width="18" height="18">
							</button>
							<button type="button" data-action="delete" class="btn-action">
								<img src="./img/cross.svg" alt="Done" width="18" height="18">
							</button>
						</div>
					</li>`;

	// Добавляємо задачц на сторінку
	tasksList.insertAdjacentHTML('beforeend', taskHTML);

	// Очищуємо поле вводу та повертаємо на него фокус
	taskInput.value = '';
	taskInput.focus();

	if (tasksList.children.length > 1) {
		emptyList.classList.add('none');
	};
}
function deleteTask(event) {
	// Провіряємо що клік був по кнопці "Видалити задачу"
	if (event.target.dataset.action == 'delete') {
		const parentNode = event.target.closest('.list-group-item')
		parentNode.remove()
		// Провіряємо, якщо в списку задач 1 елемент показуємо блок з "Список справ пустий"
		if (tasksList.children.length === 1) {
			emptyList.classList.remove('none');
		};
	}
}
function doneTask(event) {
	// Провіряємо що клік був по кнопці "Задача виконана"
	if (event.target.dataset.action == 'done') {
		const parentNode = event.target.closest('.list-group-item')
		const taskTitle = parentNode.querySelector('.task-title')
		taskTitle.classList.toggle('task-title--done')
	}
}
