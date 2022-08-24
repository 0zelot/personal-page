import {serverQueryContent} from "#content/server";
import {SitemapStream, streamToPromise} from "sitemap";

export default defineEventHandler(async (event) => {

    const posts = await serverQueryContent(event).where({visibility: 1}).only("_path").find();
    posts.push(
        {
            _path: "/"
        },
        {
            _path: "/blog"
        }
    );

    const sitemap = new SitemapStream({
        hostname: `https://${process.env.domain}`
    });

    for(const post of posts) {
        sitemap.write({
            url: post._path,
            changefreq: "weekly"
        });
    }

    sitemap.end();
    return streamToPromise(sitemap);

});