import {defineNuxtConfig} from "nuxt"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

    app: {

        head: {
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
                    content: process.env.color 
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

    ssr: false,

    build: {
        extractCSS: true
    },

    plugins: [
        {
            src: "~/plugins/particles.vue3.ts",
            ssr: false,
        },
    ],

    publicRuntimeConfig: {
        env: {
            title: process.env.title,
            header: process.env.header,
            api: process.env.api,
            backup_config: process.env.backup_config,
            favicon: process.env.favicon
        }
    }

})
