let taskList = document.getElementById('task-list');

// Function to add a new task
function addTask() {
  let taskInput = document.getElementById('task-input').value;
  let categorySelect = document.getElementById('category-select').value;

  // If no task input, do not add the task
  if (!taskInput.trim()) {
    alert('Please enter a task');
    return;
  }

  // Create a new list item for the task
  let li = document.createElement('li');
  li.classList.add('task'); // Add base class for styling

  // Apply the selected category class
  li.classList.add(categorySelect);

  // Add task content
  let taskText = document.createElement('span');
  taskText.textContent = taskInput;
  li.appendChild(taskText);

  // Add a checkbox for marking the task as completed
  let checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.addEventListener('change', function () {
    if (checkBox.checked) {
      li.classList.add('completed');
    } else {
      li.classList.remove('completed');
    }
  });

  // Add checkbox to task
  li.prepend(checkBox);

  // Append task to the task list
  taskList.appendChild(li);

  // Clear the input fields
  document.getElementById('task-input').value = '';
  categorySelect.value = 'Important-urgent';  // Reset category dropdown to default
}
