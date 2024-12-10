import express from "express";
import clientRoutes from "./routes/client.js";
import stukerRoutes from "./routes/stuker.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/client", clientRoutes);
app.use("/stuker", stukerRoutes);

//untuk mengizinkan akses ke uploads untuk ambil file gambar
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
