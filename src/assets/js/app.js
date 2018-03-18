const form = document.querySelector('#task-form');
const taskList = document.querySelector('.tasks__list');
const clearBtn = document.querySelector('.tasks__btn');
const taskInput = document.querySelector('#task');
const sortName = document.querySelector('.tasks__sort-name');
const sortNumber = document.querySelector('.tasks__sort-num');

loadEventListeners();

function loadEventListeners() {

	document.addEventListener('DOMContentLoaded', getTasks);

	form.addEventListener('submit', addTask);

	taskList.addEventListener('click', removeTask);

	clearBtn.addEventListener('click', deleteAll);
};


function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
		sortTasks(tasks);
	}

	tasks.forEach(function (task, index) {
		const num = index + 1;
		const li = document.createElement('li');
		li.className = 'list__item';
		li.appendChild(document.createTextNode(`${num}. ${task}`));
		const link = document.createElement('a');
		link.className = 'list__item-delete';
		link.innerHTML = '<i class="fa fa-remove"></i>';
		li.appendChild(link);
		taskList.appendChild(li);
	});
};


function addTask(e) {
	e.preventDefault();
	if (taskInput.value === '') {
		alert('You need to add task!');
	} else {
		let allTasks = JSON.parse(localStorage.getItem('tasks'));
		let num;

		if (allTasks == null) {
			num = 1;
		} else {
			num = allTasks.length + 1;
		}

		const li = document.createElement('li');

		li.className = 'list__item';

		li.appendChild(document.createTextNode(`${num}. ${taskInput.value}`));
		
		const link = document.createElement('a');

		link.className = 'list__item-delete';

		link.innerHTML = '<i class="fa fa-remove"></i>';

		li.appendChild(link);

		taskList.appendChild(li);

		storeTaskInLocalStorage(taskInput.value);

		taskInput.value = '';
	}
};


function removeTask(e) {
	if (e.target.parentElement.classList.contains('list__item-delete')) {
		e.target.parentElement.parentElement.remove();

		removeFromLocalStorage(e.target.parentElement.parentElement);
	}
};


function removeFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	let taskContent = taskItem.textContent;
	let taskToDelete = taskContent.replace(/[0-9]+\W\s/, "");
	
	tasks.forEach(function (task, index) {
		if (taskToDelete === task) {
			tasks.splice(index, 1);
		}
	});


	sortTasks(tasks);
	localStorage.setItem('tasks', JSON.stringify(tasks));
};


function deleteAll(e) {
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	clearTasksFromLocalStorage();
};


function clearTasksFromLocalStorage() {
	localStorage.clear();
	sortTasks([]);
};


function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);

	sortTasks(tasks);

	localStorage.setItem('tasks', JSON.stringify(tasks));
};


function sortTasks(tasks) {
	if (tasks.length === 0) {
		console.log('There are no tasks!');
	} else {
		const newAr = tasks.sort();
		console.log(`Tasks are sorted by name ${newAr}`);
		console.log(tasks);
	};
};