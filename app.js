window.addEventListener('load', solve);

function solve() {

  const taskState = {
      title: null,
      description: null,
      label: null,

      points: null
    };

  const inputFields = {
      title: document.getElementById('title'),
      description: document.getElementById('description'),  
      label: document.getElementById('label'),
      points: document.getElementById('points'), //percentage
  }

 

  let sprintPoints = 0;
  let counter = 0;
  let icon = '';
  let labelType = '';

  const form = document.getElementById('create-task-form');
  const createBtn = document.getElementById('create-task-btn');
  const deleteBtn = document.getElementById('delete-task-btn');
  const totalSprintPoints = document.getElementById('total-sprint-points');
  const tasksSection = document.getElementById('tasks-section');
  const taskIdInput = document.querySelector('#task-id');

  createBtn.addEventListener('click', createTask);
  deleteBtn.addEventListener('click', deleteTask);

  function deleteTask(){

    let tasks = Array.from(tasksSection.children)
    let task = tasks.find((p) => p.id === taskIdInput.value);
  
  
  
    sprintPoints -= Number(inputFields.points.value);
      totalSprintPoints.textContent = `Total percentages: ${sprintPoints}%`;
  
  
  
    task.remove();
   
  
    clearAllInputs();
   
  
    for (const key in inputFields) {
    inputFields[key].removeAttribute('disabled');
    }
  
    deleteBtn.setAttribute('disabled', true);
    createBtn.removeAttribute('disabled');
  }

function createTask(){
  const allFieldsHaveValue = Object.values(inputFields)
  .every((input) => input.value !== '');

  if(!allFieldsHaveValue) {
  return;
  }

 
  counter++;
  const article = createElement('article', tasksSection, null, ['task-card'], `task-${counter}`);
  taskIdInput.value = `task-${counter}`;
 
  if (inputFields.label.value === 'Low Priority Task') {
      icon = '&#9737;'
  }
  if (inputFields.label.value === 'High Priority Task') {
      icon = '&#9888;'
  }

  const taskLabel = createElement('div', article, `${inputFields.label.value} `);

  if (inputFields.label.value === 'Low Priority Task') {
      
    labelType = 'low-priority';
  }

  if (inputFields.label.value === 'High Priority Task') {
  
    labelType = 'high-priority';
  
  }


  taskLabel.classList.add("task-card-label");
  
  taskLabel.classList.add(labelType);
  
  taskLabel.innerHTML += icon;

  
  const h3 = createElement('h3', article, inputFields.title.value, ['task-card-title']);
  const taskP = createElement('p', article, inputFields.description.value, ['task-card-description']);
  
  const tpoints = createElement('div', article, `This task  ${inputFields.points.value}%`, ['task-card-points']);
  const taskButtons = createElement('div', article, null, ['task-card-actions']);
  
  const deleteBtn = createElement('button', taskButtons, 'Delete');

  deleteBtn.addEventListener('click', loadDeleteTask);

  for (const key in inputFields) {
  taskState[key] = inputFields[key].value;
    }
    sprintPoints += Number(inputFields.points.value);
    if(sprintPoints > 100){
      sprintPoints = 100
      alert('You have reached your daily task percentage')
    }
    totalSprintPoints.textContent = `Total percentages: ${sprintPoints}%`;    

  clearAllInputs();

}

function loadDeleteTask(){
  createBtn.setAttribute('disabled', true);
  deleteBtn.removeAttribute('disabled');

  for (const key in inputFields) {
      inputFields[key].value = taskState[key];
      inputFields[key].setAttribute('disabled', true);
    }
}



function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml) {
      const htmlElement = document.createElement(type);
   
      if (content && useInnerHtml) {
        htmlElement.innerHTML = content;
      } else {
        if (content && type !== 'input') {
          htmlElement.textContent = content;
        }
   
        if (content && type === 'input') {
          htmlElement.value = content;
        }
      }
   
      if (classes && classes.length > 0) {
        htmlElement.classList.add(...classes);
      }
   
      if (id) {
        htmlElement.id = id;
      }
   
      if (attributes) {
        for (const key in attributes) {
          htmlElement.setAttribute(key, attributes[key])
        }
      }
   
      if (parentNode) {
        parentNode.appendChild(htmlElement);
      }
   
      return htmlElement;
}

function clearAllInputs() {
      Object.values(inputFields)
        .forEach((input) => {
          input.value = '';
        })
    }
}