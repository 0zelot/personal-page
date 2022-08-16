import {defineNuxtConfig} from "nuxt";
import fetch from "node-fetch";
import showdown from "showdown";

const converter = new showdown.Converter();

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

    ssr: true,

    target: "static",

    app: {

        head: {
            htmlAttrs: {
                lang: process.env.html_lang,
            },
            title: process.env.title,
            meta: [
                { 
                    charset: "utf-8" 
                },
                { 
                    "http-equiv": "X-UA-Compatible", 
                    content: "IE=edge" 
                },
                {
                    name: "viewport", 
                    content: "width=device-width, initial-scale=1" 
                },
                { 
                    hid: "description", 
                    name: "description", 
                    content: process.env.description 
                },
                { 
                    hid: "robots", 
                    name: "robots", 
                    content: "index,follow" 
                },
                { 
                    hid: "theme-color", 
                    name: "theme-color", 
                    content: "#5c4dff"
                },
                { 
                    hid: "og:title", 
                    name: "og:title", 
                    property: "og:title", 
                    content: process.env.title
                },
                { 
                    hid: "og:description", 
                    name: "og:description", 
                    property: "og:description",
                    content: process.env.description
                },
                { 
                    hid: "og:site_name", 
                    name: "og:site_name", 
                    property: "og:site_name",
                    content: process.env.title
                },
                { 
                    hid: "og:image", 
                    name: "og:image", 
                    property: "og:image", 
                    content: process.env.favicon
                },
                { 
                    hid: "og:type", 
                    name: "og:type", 
                    property: "og:type", 
                    content: "website"
                },
                { 
                    hid: "og:url", 
                    name: "og:url", 
                    property: "og:url", 
                    content: `https://${process.env.domain}`
                },
                { 
                    hid: "twitter:title", 
                    name: "twitter:title", 
                    content: process.env.title
                },
                { 
                    hid: "twitter:description", 
                    name: "twitter:description", 
                    content: process.env.description
                },
                { 
                    hid: "twitter:site", 
                    name: "twitter:site", 
                    content: process.env.title
                },
                { 
                    hid: "twitter:image", 
                    name: "twitter:image", 
                    content: process.env.favicon
                },
                { 
                    hid: "twitter:card", 
                    name: "twitter:card", 
                    content: "summary"
                }
            ],
            script: [
                {
                    src: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.0/js/bootstrap.min.js"
                }
            ],
            link: [
                { 
                    rel: "stylesheet", 
                    href: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.0/css/bootstrap.min.css" 
                },
                {
                    rel: "stylesheet",
                    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
                },
                {
                    rel: "stylesheet",
                    href: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
                },
                { 
                    rel: "icon", 
                    type: "image/x-icon", 
                    href: process.env.favicon 
                },
                { 
                    rel: "apple-touch-icon", 
                    href: process.env.favicon 
                }
            ],
            noscript: [
                {
                    children: "Javascript is required" 
                }
            ]
        },

    },

    css: [
        "~/assets/css/general.css"
    ],

    build: {
        transpile: ["@popperjs"]
    },

    plugins: [
        {
            src: "~/plugins/particles.vue3.ts",
            ssr: false,
        },
        {
            src: "~/plugins/scrollToTop.ts",
            ssr: false,
        },
    ],

    modules: [
        "@nuxtjs/feed"
    ],
    
    feed: [
        {
            path: "/feed",

            async create(feed) {

                feed.options = {
                    title: process.env.title,
                    link: `https://${process.env.domain}/feed`,
                    description: process.env.description
                }

                const config = await (await (fetch(`${process.env.api}/config.json`))).json();
                
                for(const post of config.blog) {
                    feed.addItem({
                        title: post.title,
                        id: `https://${process.env.domain}/blog/${post.slug}`,
                        link: `https://${process.env.domain}/blog/${post.slug}`,
                        image: post.image,
                        favicon: process.env.favicon,
                        description: post.description,
                        published: new Date(post.created * 1000),
                        content: converter.makeHtml(await (await fetch(`${process.env.api}${post.content}`)).text())
                    })
                }

            },

            cacheTime: 1000 * 60 * 15,
            type: "rss2"
        }
    ],

    publicRuntimeConfig: {
        env: {
            title: process.env.title,
            domain: process.env.domain,
            header: process.env.header,
            api: process.env.api,
            backup_config: process.env.backup_config,
            favicon: process.env.favicon
        }
    }

})
