import SitePrerender from 'site-prerender';
import Crawler from 'site-prerender/lib/crawler';
import Serve from 'site-prerender/lib/serve';
import log from 'site-prerender/lib/log';
import fp from 'find-free-port';
import express from "express";
import path from "path";

type ServeConfig = {
    basePath: string;
    staticPath: string;
}

type CrawlerConfig = {
    headless?: boolean;
    baseUrl: string;
    basePath: string;
}

/**
 * Patches SitePrerenderer to be able to use base paths (we use /apidocs) to do the prerendering correctly
 * The only real line patched is from site-prerender/lib/serve in the `start` async method.
 * `res.sendFile(path.join(staticPath, 'index.html'))` is changed to:
 * `res.sendFile(path.join(staticPath, basePath, 'index.html'))` to be able to include a basePath.
 *  Everything else just helps to pass the required variable.
 */
export class PatchedSitePrerenderer extends SitePrerender {

    private readonly basePath: string;

    constructor(basePath: string, ...args: unknown[]) {
        super(...args);
        this.basePath = basePath;
    }

    async init() {
        this.serve = new PatchedServe()
        const { baseUrl } = await this.serve.start({
            staticPath: this.config.staticPath,
            basePath: this.basePath
        });
        this.baseUrl = path.join(baseUrl, this.basePath);

        this.crawler = new Crawler({
            baseUrl: this.baseUrl
        });
        await this.crawler.init();
    }
}

class PatchedServe extends Serve {
    async start(config: ServeConfig) {
        const { staticPath, basePath } = config
        const [freeP] = await fp(3000)
        this.httpServer = this.app.listen(freeP, () => {
            log.info(`Server started at http://localhost:${freeP}`)
        })

        this.app.use(express.static(staticPath))
        this.app.use((req: unknown, res: any) => {
            res.sendFile(path.join(staticPath, basePath, 'index.html'))
        })

        return {
            baseUrl: `http://127.0.0.1:${freeP}`,
        }
    }
}
