import 'dotenv/config';
import Application from "./application";
import Route from "./router";

import {
    createUserController,
    deleteUserController,
    getAllUsersController,
    getUserController,
    updateUserController,
} from "../user/controllers";

function bootstrapApplication() {
    const app = new Application();

    app.use(Route.get("/api/users", getAllUsersController));
    app.use(Route.get("/api/users/{userId}", getUserController));
    app.use(Route.post("/api/users", createUserController));
    app.use(Route.put("/api/users/{userId}", updateUserController));
    app.use(Route.delete("/api/users/{userId}", deleteUserController));

    app.use(
        Route.notFound((req, res) => {
            if (res.writableEnded) return;

            res.writeHead(404);
            res.end(`There is no handler registered for url "${req.url}"`);
        })
    );

    return app;
}

export default bootstrapApplication;
