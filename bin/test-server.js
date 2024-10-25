import { sleep, serve } from "bun";

const server = serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);
        const path = url.pathname;
        const dt = new Date();

        let error = false;
        let body = `Got ${path} at ${dt}`;
        switch (path) {
            case "/clicked":
                body = `<div id="target-div"><button data-hx="url: 'http://localhost:3000/clicked2', target:'parent', swap:'replaceWith'" data-tooltip title="I have a tooltip">I\'m a server button</button></div>`;
                break;
            case "/clicked2":
                body = `<div id="target-div">You clicked again!</div>`;
                break;
            case "/mouse_entered":
                break;
            case "/trigger_delay":
                body = `Here are some results for ${url.searchParams} at ${dt}`;
                break;
            case "/validate":
                {
                    const q = url.searchParams.get("q");
                    if (q && q.length > 5) {
                        body = "ok";
                    } else {
                        body = "too short";
                        error = true;
                    }
                }
                break;
            case "/validate_json":
                await sleep(2);
                {
                    const q = url.searchParams.get("q");
                    if (q && q.length > 5) {
                        body = `{"success":true}`;
                    } else {
                        body = `{"error":true,"message":"too short"}`;
                    }
                }
                break;

            case "/redirect":
                break;
            case "/slow":
                await sleep(2);
                break;
        }
        const opts = { status: error ? 418 : 200 };
        const res = new Response(body, opts);
        res.headers.set("Access-Control-Allow-Origin", "*");
        res.headers.set("Access-Control-Allow-Headers", "*");
        res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        return res;
    },
});

console.log(`Listening on ${server.url}`);
