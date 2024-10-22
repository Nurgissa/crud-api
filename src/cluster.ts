import cluster from 'node:cluster';
import { createServer, request } from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';
import bootstrapApplication from "./app";


const port = parseInt(process.env.PORT || "6000");
const workerPidByPortMap = new Map();
const portByWorkerMap = new Map();

if (cluster.isPrimary) {
    const possibleWorkerCount = availableParallelism();
    for (let i = 1; i < possibleWorkerCount; i++) {
        const WORKER_PORT = port + i;
        const worker = cluster.fork({ WORKER_PORT });
        workerPidByPortMap.set(worker.process.pid, port + i);
        portByWorkerMap.set(WORKER_PORT, worker);
    }

    let workerIndex = 0;

    const loadBalancer = createServer((req, res) => {
        const workerPort = port + 1 + (workerIndex % possibleWorkerCount);
        workerIndex++;

        const options = {
            hostname: 'localhost',
            port: workerPort,
            path: req.url,
            method: req.method,
            headers: req.headers,
        };



        const proxy = request(options, (workerResponse) => {
            if (workerResponse.statusCode) {
                res.writeHead(workerResponse.statusCode, workerResponse.headers);
            }
            workerResponse.pipe(res);
        });

        req.pipe(proxy);
    });

    loadBalancer.listen(port, () => {
        console.log(`Starting load balancer on http://localhost:${port}/api`);
    });

    cluster.on('exit', (worker, code, signal) => {
        const port = workerPidByPortMap.get(worker.process.pid);
        console.log(`Worker ${worker.process.pid} on port: ${port} died`);
        console.log('Starting a new worker...');
        const WORKER_PORT = workerPidByPortMap.get(worker.process.pid);
        const newWorker = cluster.fork({
            WORKER_PORT: workerPidByPortMap.get(worker.process.pid)
        });
        portByWorkerMap.set(WORKER_PORT, newWorker);
    });
} else {
    const port = parseInt(process.env.WORKER_PORT!);
    const app = bootstrapApplication();

    app.start(port);

    console.log(`Worker ${process.pid} started on port: ${port}`);
}
