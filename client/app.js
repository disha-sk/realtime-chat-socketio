
const socket = io("ws://localhost:3001");
const form = document.querySelector("form");//reference to form element
const p = document.querySelector("p");//reference to paragraph tag
const input = document.querySelector("input");
let activityTimer; 
function sendMessage(e){
   e.preventDefault();
  
  //to check if input is having value and not an empty string
  if(input.value){
     socket.emit("message",input.value);
     input.value = "";// to clear the input field after sending the message
  }
} 
form.addEventListener("submit", sendMessage)

//capturing the message from the server
socket.on("message",(data) =>{
 const ul = document.querySelector("ul");
 const li = document.createElement("li");
 li.textContent = data;
 ul.appendChild(li);
 p.textContent = "";//to clear the typing message
})

//listening to keypress 
input.addEventListener("keypress", () =>{
 //activity event

 socket.emit("activity",socket.id.substring(0,5));
})

// creating activity timer

socket.on("activity",(name) =>{
      p.textContent = ` ${name} is typing...`;

      //clear after 3secs
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() =>{
        p.textContent = "";
      },3000);
   })