var APIKey = "ea812b-af8305-822932-c0383a-7dea17";
// ------------XXXX

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
  if((this.readyState == 4) && (this.status == 200)){
    var tasklist = JSON.parse(this.responseText);

    for(var i=0; i<tasklist.length; i++){
      createTask(tasklist[i]);
    }
  }
};

xhttp.open("GET", "https://cse204.work/todos", true);
xhttp.setRequestHeader("x-api-key", APIKey);
xhttp.send();

function createTask(input){
    var taskID = input.id;
    var taskText = input.text;
    var task = document.createElement("li");
    task.innerHTML = taskText;
    var br = document.createElement("br");
    var completedTask = document.createElement("input");
    completedTask.type = "checkbox";
    completedTask.id = input.id;
    if(input.completed)
    {
        completedTask.checked = true;
        task.style.textDecoration = "line-through";
        console.log("completed");
    }


  
  var deletedTask = document.createElement("button");
  deletedTask.innerHTML="Delete";
  deletedTask.setAttribute("id", "deletebutton");
  

  var taskdiv = document.getElementById("tasks");
  task.setAttribute("id",taskID);
  task.setAttribute("text",taskText);
  taskdiv.appendChild(task);
  taskdiv.appendChild(br);


  task.appendChild(deletedTask);
  task.appendChild(completedTask);



  completedTask.addEventListener("click", function(event){markComplete(taskID)});
  deletedTask.addEventListener("click", function(event){deleteItem(taskID)});
}

document.getElementById("addTaskButton").addEventListener("click", function(event){addTask()});



function addTask(){
  var newTaskVALUE = 
  {
      text: document.getElementById("newTask").value
}

  var xhttp11 = new XMLHttpRequest();
  xhttp11.onreadystatechange = function (){
    if((this.readyState == 4)&&(this.status==200)){
      var task = JSON.parse(this.responseText);
      createTask(task);
    }
    else if(this.readyState==4){
      console.log(this.responseText);
    }
  };

  xhttp11.open("POST", "https://cse204.work/todos", true);
  xhttp11.setRequestHeader("content-type", "application/json");
  xhttp11.setRequestHeader("x-api-key", APIKey);
  xhttp11.send(JSON.stringify(newTaskVALUE));

  document.getElementById("newTask").value = "";
}


function deleteItem(currentid){
  var deletedTask = currentid;
  var xhttpd = new XMLHttpRequest();
  xhttpd.onreadystatechange = function(){
    if((this.readyState==4)&&(this.status==200)){
      document.getElementById(deletedTask).remove();
    }
    else if(this.readyState==4){
      console.log(this.responseText);
    }
  };

  xhttpd.open("DELETE", "https://cse204.work/todos/"+deletedTask, true);
  xhttpd.setRequestHeader("content-type","application/json");
  xhttpd.setRequestHeader("x-api-key", APIKey);
  xhttpd.send();
}


function markComplete(currentid){
    var completeTaskID = currentid;
    var xhttp22 = new XMLHttpRequest();

    var stat = 
    {
        completed: true
    }
  
    xhttp22.onreadystatechange = function(){
      if((this.readyState==4)&&(this.status==200)){
        console.log(document.getElementById(completeTaskID));
      //   document.getElementById(taskcompletedid).style.fontStyle="italic";
        document.getElementById(completeTaskID).style.textDecoration="line-through";
      }
      else if(this.readyState==4){
        console.log(this.responseText);
      }
    };
  
    xhttp22.open("PUT", "https://cse204.work/todos/"+completeTaskID, true);
    xhttp22.setRequestHeader("content-type", "application/json");
    xhttp22.setRequestHeader("x-api-key", APIKey);
    xhttp22.send(JSON.stringify(stat));
  }

