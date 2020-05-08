//default로 export 했으니 이렇게 import 가능
import app from "./app";
import "./db";

const PORT = 4000;

const handleListening = () =>
  console.log(`🔥Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
