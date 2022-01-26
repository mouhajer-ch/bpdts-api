import * as http from "http";
import app from "./app";
import { PORT } from "./conf";

app.set("port", PORT);

const server = http.createServer(app);
server.listen(PORT);
