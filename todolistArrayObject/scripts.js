const form = document.querySelector("form");
      const input = document.querySelector("input");
      const ul = document.querySelector("ul");
      const tasks = [];
      let taskToEditID = null;

      form.addEventListener("submit", addTask);

      function addTask(e) {
        e.preventDefault();

        addTaskToArray();

        displayTasks();

        storeInLS();
      }

      function addTaskToArray() {
        if (taskToEditID === null) {
          const obj = {};
          obj.id = Date.now();
          obj.task = input.value;
          tasks.push(obj);
        } else {
          const taskToEdit = tasks.find((task) => task.id === taskToEditID);
          taskToEdit.task = input.value;
          taskToEditID = null;
        }
      }

      function storeInLS() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      function displayTasks() {
        cleanSlate();
        tasks.forEach((task) => {
          const li = document.createElement("li");
          li.innerText = task.task;

          const iconWrapper = document.createElement("p");

          const del = document.createElement("i");
          del.classList.add("fa-solid", "fa-trash");
          del.addEventListener("click", () => deleteTask(task.id));

          const edit = document.createElement("i");
          edit.classList.add("fa-solid", "fa-pencil");
          edit.addEventListener("click", () => editTask(task.id));

          iconWrapper.append(del, edit);

          li.append(iconWrapper);

          ul.append(li);
        });
      }

      function deleteTask(id) {
        tasks.forEach((task, index) => {
          task.id === id ? tasks.splice(index, 1) : "";
        });
        displayTasks();
        storeInLS();
      }

      function editTask(id) {
        const taskToEdit = tasks.find((task) => task.id === id);
        input.value = taskToEdit.task;
        taskToEditID = id;
      }

      function cleanSlate() {
        ul.innerHTML = "";
        input.value = "";
        input.focus();
      }