const express = require("express");
const path = require("path");
const http = require("http");
const nunjucks = require("nunjucks");


const app = express();

const PORT = process.env.PORT || 4321;

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("port",PORT);
app.set("view engine","html");
nunjucks.configure(path.join(__dirname,"views"),{
    express:app,
    watch:true
});

app.get("/",(req, res) => {
    res.render("index");
})


const server = http.createServer(app);

// 접속한 사람수의 리스트
const connectedPeers = [];

server.listen(app.get("port"),()=>{
    console.log(`server is open ${app.get("port")}`);

})
const io = require("socket.io")(server);
io.on("connection",(socket)=>{
    // 접속한 사람 리스트에 저장
    connectedPeers.push(socket.id);
    // 접속한 사람수 이벤트 보냄
    io.emit("connect-people",connectedPeers.length);
    socket.on("disconnect",()=>{
        // 연결해제될시 리스트에있는 소켓아이디 삭제
        connectedPeers.splice(connectedPeers.indexOf(socket.id),1);
    })
});
