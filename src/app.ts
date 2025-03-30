import express from "express";
import cors from "cors";
import { rootRouter } from "./routers/index.route";
import path from "path"

import { connectDB } from "./connect";
import { monitorChanges } from "./utility/databaseChangeStream";
import { proccessMissedFine } from "./utility/missingFine";

const app = express();
const PORT = process.env.PORT;

connectDB();  // Connect to MongoDB
monitorChanges()
app.use((req, _, next) => {
  const info =
    req.method +
    " " +
    req.url +
    " " +
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  console.log("API HIT -------------->", info, "\n|\nv\n|\nv\n");
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: "x-auth-token",
  })
  
);

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

app.all("*", (req, _) => {
  
  throw new Error(
    `Requested URL ${req.path} not found`
  );
});

// Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await proccessMissedFine();
});
