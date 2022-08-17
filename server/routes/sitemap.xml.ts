import {SitemapStream, streamToPromise} from "sitemap";
import {Readable} from "stream";
import fetch from "node-fetch";

export default defineEventHandler(async (event) => {
  
    const config = await (await (fetch(`${process.env.api}/config.json`))).json();
    const links = ["/", "/blog/", ...config.blog.map((post) => `/blog/${post.slug}`)];

    const stream = new SitemapStream({hostname: `https://${process.env.domain}`});
  
    return streamToPromise(Readable.from(links).pipe(stream))

});