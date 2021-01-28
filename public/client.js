const socket=io('http://localhost:8000',{ transports: ['websocket', 'polling'] });
const form=document.getElementById("send-container");
const messageinput=document.getElementById('messageinp');
const messagecontainer =document.querySelector(".container");
var audio=new Audio('public/ting.mp3');
const name1=prompt("enter your name to join:");
const append=(message,position,name2)=>{
    const messageelement=document.createElement("div");
    messageelement.classList.add("message");
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    const nameclass=document.createElement("div");
    nameclass.classList.add("name");
    const content=document.createElement("div");
    content.innerText=message;
    if(position=='right'){
        nameclass.innerText="";
    }
    else{
        nameclass.innerText=name2;
    }
    content.classList.add("content");
    if(position=='left'){
        content.classList.add("re");
        audio.play();
    }
    messageelement.append(nameclass);
    messageelement.append(content);
}
socket.emit('new-user-joined',name1);
form.addEventListener('submit',(e)=>{
    var x=e.cancelable;
    e.preventDefault();
    const message=messageinput.value; 
    append(`${message}`,'right');
    socket.emit('send',message);
    messageinput.value="";
});
socket.on('user-joined',function(name){
    append("joined the chat","left",name);
});
socket.on('receive',data=>{
    append(`${data.message}`,'left',data.name);
});
socket.on('left',name=>{
    append("left the child",'left',name);
});

