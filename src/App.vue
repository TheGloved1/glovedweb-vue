<!-- @format -->

<template>
    <div>
        <section class="hidden" id="Welcome">
            <h1>Welcome to my website!</h1>
            <p>I'm Gloves</p>
            <p>Click <button @click="cycleForward">❯</button> for more info!</p>
        </section>
        <section class="hidden" id="About">
            <h2>About Me</h2>
            <p>I wear gloves all the time. (Don't Ask Why)</p>
            <p>I like to code.</p>
            <p>I play video games.</p>
            <p>Owner of the <a class="fancy-link" href="#discord" target="_blank" rel="noopener" style="color: rgba(141, 139, 139, 0.541)">Gloved Cult</a>.</p>
        </section>
        <section id="Discord" class="hidden">
            <h2>The Cult</h2>
            <a class="fancy-link" href="https://glovedweb.ddns.net/discord" target="_blank" rel="noopener" style="color: rgba(141, 139, 139, 0.541)">https://glovedweb.ddns.net/discord </a>
            <iframe
                id="discord-widget"
                src="https://discord.com/widget?id=937806100546351174&theme=dark"
                width="350"
                height="500"
                allowtransparency="true"
                frameborder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
            </iframe>
        </section>
        <section id="Funnies">
            <h2 class="hidden">Here, Have some funnies</h2>
            <div class="logo hidden image-container">
                <img src="https://www.boredpanda.com/blog/wp-content/uploads/2023/12/1-85-6579628158bf1__700.jpg?fit=700,700" />
            </div>
            <div class="logo hidden image-container">
                <img src="https://www.rd.com/wp-content/uploads/2023/04/Hilarious-Cat-Memes-2.jpg?fit=700,700" />
            </div>
        </section>
        <section class="hidden" id="Credits">
            <h2>How I made this</h2>
            <div class="video-container">
                <iframe src="https://youtube.com/embed/T33NN_pPeNI/" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>
            </div>
        </section>
        <section class="hidden" id="Github">
            <h2>Here's my github</h2>
            <div class="main container">
                <div id="card" class="user-card">
                    <div class="image-container git-image-container">
                        <a href="https://github.com/TheGloved1" target="_blank" rel="noopener">
                            <img id="git-user-img" src="https://avatars.githubusercontent.com/u/96776176?v=4" alt="User image" />
                        </a>
                    </div>
                    <h2>Gloves</h2>
                    <span>TheGloved1</span>
                    <p>I wear gloves and write functional code.</p>
                    <a class="fancy-link" id="github-link" href="https://github.com/TheGloved1" target="_blank" rel="noopener">https://github.com/TheGloved1 </a>
                </div>
            </div>
        </section>
        <section id="Chatbot" class="hide">
            <h2 class="hidden">Just A Simple Little Chatbot</h2>
            <div id="chatbot-container">
                <h2>GlovedBot</h2>
                <div id="chatHistory" class="chat-container"></div>
                <form id="chatForm">
                    <input type="text" id="userMessage" placeholder="Type a message..." />
                    <button type="submit">Send</button>
                </form>
            </div>
        </section>

        <nav>
            <button @click="cycleBackward">❮</button>
            <transition-group name="list" tag="ul">
                <li v-for="(item, index) in items" :key="item">
                    <a
                        :class="{ 'item-big': index === 2, 'item-small': index !== 2, [`item-${index}`]: true, [direction]: true, itemshow: index < 3, itemhide: index >= 3 }"
                        :href="`#${item}`"
                        @click="index === 1 ? cycleBackward() : index === 3 ? cycleForward() : null">
                        {{ item }}
                    </a>
                </li>
            </transition-group>
            <button @click="cycleForward">❯</button>
        </nav>
    </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
    data() {
        return {
            observer: null,
            currentSection: null,
            sectionObserver: null,
            nextSection: null,
            prevSection: null,
            sections: Array.from(document.getElementsByTagName("section")),
            itemIds: ["Github", "Welcome", "About", "Discord", "Funnies", "Credits"],
            items: [],
            startIndex: 0,
            direction: "",
        };
    },
    computed: {
        visibleItems() {
            return this.items.slice(0, 3);
        },
    },
    mounted() {
        document.body.style.overflow = "hidden";
        this.getAllSections();
        this.sections = Array.from(document.getElementsByTagName("section"));
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    } else {
                        entry.target.classList.remove("show");
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.1,
            }
        );

        Array.from(document.querySelectorAll(".hidden")).forEach((element) => {
            this.observer.observe(element);
        });

        this.addSmoothScroll();
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.onScroll);
        if (this.observer) {
            this.observer.disconnect();
        }
    },
    methods: {
        getAllSections() {
            this.items = Array.from(document.querySelectorAll("section:not(.hide)")).map((section) => section.id);
            this.cycleBackward();
        },
        navigateToSection(item) {
            document.querySelector(`#${item}`).scrollIntoView({ behavior: "smooth" });
        },
        onScroll() {
            const currentSectionIndex = this.items.findIndex((item) => document.getElementById(item).getBoundingClientRect().top >= 0);
            while (this.items[1] !== this.items[currentSectionIndex]) {
                if (currentSectionIndex > 1) {
                    this.cycleForward();
                } else {
                    this.cycleBackward();
                }
            }
        },
        addSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.addEventListener("click", (e) => {
                    e.preventDefault();

                    const target = document.querySelector(anchor.getAttribute("href"));
                    target.scrollIntoView({
                        behavior: "smooth",
                    });
                });
            });
        },
        cycleForward() {
            const firstItem = this.items.shift();
            this.items.push(firstItem);
            this.$nextTick(() => {
                this.direction = "move-right";
                const element = document.getElementById(this.items[1]);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            });
        },
        cycleBackward() {
            const lastItem = this.items.pop();
            this.items.unshift(lastItem);
            this.$nextTick(() => {
                this.direction = "move-left";
                const element = document.getElementById(this.items[1]);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            });
        },
    },
    name: "App",
    components: {},
};
</script>

<style lang="sass">
body
    background-color: #121216
    color: #ffffff
    font-family: "Poppins", sans-serif
    margin: 0
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    min-height: 100vh
    align-content: center
    flex-wrap: nowrap

section
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    min-height: 100vh
    box-sizing: border-box
    text-align: center

.hidden
    contain: content
    opacity: 0
    filter: blur(0.5em)
    transform: translateX(-10em)
    transition: all 1s

.show
    opacity: 1
    filter: blur(0)
    transform: translateX(0)

img
    max-width: 100%
    height: auto

button
    background-color: #6a6aff
    border: none
    color: white
    padding: 1rem 1rem
    text-align: center
    text-decoration: none
    display: inline-block
    font-size: 1em
    margin: 0.2rem 0.4rem
    cursor: pointer
    transition-duration: 0.4s
    border-radius: 1.3rem
    transition: transform 0.3s ease
    &:hover
        background-color: #4c4cff
        transform: scale(1.1)
    &:active
        transform: scale(0.9)

#next-section-button
    position: fixed
    bottom: 1rem
    right: 1rem

#next-section-button-copy
    bottom: 1.5rem
    right: 1.5rem

#previous-section-button
    position: fixed
    bottom: 1rem
    left: 1rem

@media screen and (max-width: 600px)
    button
        padding: 1rem 1rem

    #next-section-button,
    #next-section-button-copy
        bottom: 1em
        right: 1em

    #previous-section-button
        bottom: 1em
        left: 1em

.video-container
    position: relative
    width: 50vw
    padding-bottom: 28.125vw
    margin: 0 auto
    iframe
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        border: 2px solid #ffffff

.image-container
    position: relative
    display: flex
    align-items: center
    justify-content: center
    width: clamp(100px, 100vw, 300px)
    height: auto
    padding-bottom: 0rem
    margin: 0 auto
    img
        width: 95%
        height: 95%
        padding: 0vw
        padding-top: 2rem

.git-image-container
    position: relative
    width: 15vw
    height: auto
    margin: 0 auto

.user-card
    display: grid
    justify-content: center
    align-items: center
    margin: 0 auto
    padding: 2rem
    height: auto
    border: 0.2rem solid #fff
    border-radius: 2rem

nav
    position: fixed
    margin: 0
    top: 0
    left: 0
    right: auto
    display: flex
    align-items: center
    width: -webkit-fill-available
    background-color: #333
    color: #fff
    padding: 1em
    justify-content: center
    button
        background-color: #6a6aff
        border: none
        color: white
        margin: 0.2rem 0.4rem
        padding: 1rem 1rem
        text-align: center
        text-decoration: none
        display: inline-block
        font-size: 1em
        cursor: pointer
        transition-duration: 0.4s
        border-radius: 1.3rem
        transition: transform 0.3s ease
        &:hover
            background-color: #4c4cff
            transform: scale(1.1)
        &:active
            transform: scale(0.9)
    ul
        display: flex
        list-style-type: none
        margin: 0
        padding: 0
        justify-content: center
        align-items: center
        width: -webkit-fill-available
        li
            display: none
            margin: 0
            justify-content: center
            transform: scale(0.8)
            &:nth-child(2)
                transform: scale(1.1)
            &:nth-child(-n+3)
                flex: 0
                display: flex
                align-items: center
                justify-content: center
                margin: 0 1rem
            a
                display: inline-block
                position: relative
                margin: 0
                padding: 0.5rem
                color: #fff
                text-decoration: none
                border: 1px solid #fff
                border-radius: 0.6rem
                font-size: 2vw
                transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease
                box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3)
                background-color: #444
                &:hover
                    background-color: #555
                    color: #ddd
                    transform: scale(1.1)
                    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7)
                &:active
                    transform: scale(0.9)

#chatbot-container
    width: 65vw
    height: 65vh
    border: 0.3rem solid #6a6aff
    padding: 1rem
    margin: 0 auto
    background-color: #121216
    box-shadow: 0 0 1vw rgba(0, 0, 0, 0.1)
    display: flex
    border-radius: 1vw
    flex-direction: column
    justify-content: center
    font-family: "Poppins", sans-serif
    color: #ffffff
    align-items: stretch
    font-size: 0.8rem

#chatHistory
    display: flex
    flex-direction: column
    padding: 0.5vw
    overflow-y: auto
    text-align: left
    .message
        max-width: 60%
        margin-bottom: 1vw
        padding: 1vw
        border-radius: 1vw
        color: #ffffff
        .user
            align-self: flex-start
            background-color: #3b3b47
        .bot
            align-self: flex-end
            background-color: #6a6aff
    p
        margin: 0.5vw 0
        strong
            color: #6a6aff

.chat-container
    border: 1px solid #ccc
    height: 100%
    overflow-y: scroll
    padding: 8px
    margin-bottom: 10px
    border-radius: inherit

#chatForm
    display: flex
    /* margin-top: 0vw; */
    border-radius: inherit
    input
        flex-grow: 1
        padding: 0.5vw
        border: 4px solid #6a6aff
        border-radius: inherit
        background-color: #121216
        color: #ffffff
    button
        margin-left: 1vw
        margin-right: auto
        padding: 1vw 3vw
        border: none
        background-color: #6a6aff
        color: #ffffff
        cursor: pointer
        border-radius: inherit
        transition-duration: 0.4s
        &:hover
            background-color: #4c4cff
            transform: scale(1.1)

::-webkit-scrollbar
    width: 5px

::-webkit-scrollbar-track
    background: #f1f1f1

::-webkit-scrollbar-thumb
    background: #888
    &:hover
        background: #555

.fancy-link
    text-decoration: none
    background-image: linear-gradient(90deg, red, blue)
    background-size: 0% 3px
    background-repeat: no-repeat
    background-position: left 1.5rem
    padding-block: 0.25rem
    transition: color 500ms, background-size 500ms
    &:hover,
    &:focus
        color: grey
        background-size: 100% 3px

#discord-widget
    width: 50vh
    height: 70vh
    border: 2px solid #000
    border-radius: 10px
    overflow: hidden
    position: relative

.hide
    display: none
    opacity: 0
    transition: all 1s
    transform: translateX(-10em)
    filter: blur(0.5em)
    contain: content

.list-move
    transition: transform 0.2s, opacity 2s

.list-enter, .list-leave-to
    transform: translateX(100%)
    opacity: 0

.list-leave-active, .list-enter-active
    transform: translateX(0)
    opacity: 1

.move-right, .move-left
    opacity: 1

.itemhide
    position: absolute
    width: 0%
    display: none
    opacity: 0
    transition: all 0.5s

.itemshow
    width: auto
    position: relative
    display: inline-block
    opacity: 1
    transition: all 0.5s
</style>
