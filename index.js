const http = require("http");

const PORT = 5000;
const server = http.createServer();

const friends = [
  { id: 1, name: "Mulualem" },
  { id: 2, name: "Kirubel" },
  { id: 3, name: "Alexander" },
  { id: 4, name: "Jhone" },
];

server.on("request", (req, res) => {
  // res.writeHead(200, {
  //   "Content-Type": "application/json",
  // });
  const items = req.url.split("/");

  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("Request:", friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (req.method === "GET" && items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    const friendIndex = Number(items[2]);
    if (items.length === 3) {
      res.end(JSON.stringify(friends[friendIndex - 1]));
    } else {
      res.end(JSON.stringify(friends));
      // res.json({
      //   message: "All friends list",
      //   status: 200,
      //   data: friends,
      // });
    }
  } else if (items[1] === "message") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<h2>Welcome to Chicago</h2>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server listen on ${PORT}...`);
});
