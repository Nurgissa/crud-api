import 'dotenv/config';
import bootstrapApplication from "./app";

const port = parseInt(process.env.PORT || "5000");

const app = bootstrapApplication();
app.start(port)
