const peopleNum = document.querySelector("#connect-people");
const socket = io("/");

socket.on("connect",()=>{
    console.log("hello world");
    console.log(`my socket id is ${socket.id}`);
});

socket.on("connect-people",(numOfPeople)=>{
    peopleNum.textContent = numOfPeople;
});