import {Feed} from "feed";
import fetch from "node-fetch";
import showdown from "showdown";

const converter = new showdown.Converter();

export default defineEventHandler(async (event) => {

    const feed = new Feed({
        id: "rss",
        title: `Blog - ${process.env.title}`,
        description: process.env.description,
        link: `https://${process.env.domain}`,
        image: process.env.favicon,
        copyright: `Copyright ${new Date().getFullYear()} - ${process.env.title}`
    });

    const config = await (await (fetch(`${process.env.api}/config.json`))).json();

    for(const post of config.blog) {
        feed.addItem({
            title: post.title,
            id: `https://${process.env.domain}/blog/${post.slug}`,
            link: `https://${process.env.domain}/blog/${post.slug}`,
            image: post.image,
            description: post.description,
            published: new Date(post.created * 1000),
            content: converter.makeHtml(await (await fetch(`${process.env.api}${post.content}`)).text()),
            date: undefined
        })
    }

    appendHeader(event, "Content-Type", "application/xml");
    return feed.rss2();
});