var APIKey = "ea812b-af8305-822932-c0383a-7dea17";
// ------------XXXX

export function getAll()
{
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://cse204.work/todos", true);
  xhttp.setRequestHeader("x-api-key", APIKey);
  xhttp.send();
}


export function newTask(newValue)
{
  var newTaskVALUE = 
  {
      text: newValue
}

try{
  var xhttp11 = new XMLHttpRequest();
  
  xhttp11.open("POST", "https://cse204.work/todos", true);
  xhttp11.setRequestHeader("content-type", "application/json");
  xhttp11.setRequestHeader("x-api-key", APIKey);
  xhttp11.send(JSON.stringify(newTaskVALUE));

  console.log(newTaskVALUE);
}
catch(err)
{console.log(err)}
}



export function deleteItem(currentid){
  var deletedTask = currentid;
  var xhttpd = new XMLHttpRequest();
  
  xhttpd.open("DELETE", "https://cse204.work/todos/"+deletedTask, true);
  xhttpd.setRequestHeader("content-type","application/json");
  xhttpd.setRequestHeader("x-api-key", APIKey);
  xhttpd.send();
}


export function markComplete(currentid){
    var completeTaskID = currentid;
    var xhttp22 = new XMLHttpRequest();

    var stat = 
    {
        completed: true
    }
  
  
    xhttp22.open("PUT", "https://cse204.work/todos/"+completeTaskID, true);
    xhttp22.setRequestHeader("content-type", "application/json");
    xhttp22.setRequestHeader("x-api-key", APIKey);
    xhttp22.send(JSON.stringify(stat));
  }

