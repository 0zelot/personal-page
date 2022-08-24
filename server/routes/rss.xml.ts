import {serverQueryContent} from "#content/server";
import {Feed} from "feed";

export default defineEventHandler(async (event) => {

    const posts = await serverQueryContent(event).where({visibility: 1}).find();

    const feed = new Feed({
        id: "rss",
        title: `Blog - ${process.env.title}`,
        description: process.env.description,
        link: `https://${process.env.domain}`,
        image: process.env.favicon,
        copyright: `Copyright ${new Date().getFullYear()} - ${process.env.title}`
    });

    for(const post of posts) {
        feed.addItem({
            title: post.title,
            id: `https://${process.env.domain}${post._path}`,
            link: `https://${process.env.domain}${post._path}`,
            image: post.image,
            description: post.description,
            published: new Date(post.created * 1000),
            content: `
                <p>
                    <img alt="Cover image" src="${post.image}">
                </p>
                <p>You are viewing an article as a preview for RSS readers and it may be slightly different from the original article. <a href='https://${process.env.domain}${post._path}'>Click here</a> to see full article.</p> 
                ${post.excerpt.children.map(b => `<${b.tag} ${b.children.filter(x => x.type === 'element')}>${b.children.filter(x => x.type === 'text').map(c => c.value).join(' ')}</${b.tag}>`).join('')}
            `,
            date: undefined
        })
    }

    appendHeader(event, "Content-Type", "application/xml");
    return feed.rss2();

});