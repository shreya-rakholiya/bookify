const express = require("express");
const { rootRouter } = require('./routers/index.route');
require('./connect');  // Import the MongoDB connection (no need to assign it to a variable)

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route
app.get('/', (req, res) => {
    res.send('Library Management System is Running!');
});


//middlewares
// app.use("/",register)
// // admin
// app.use("/admin",adminAuthor)
// app.use("/admin",adminContact)
// // user
// app.use("/user",userAuthor)
// app.use("/user",userContact)

app.use(rootRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
