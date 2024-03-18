<!-- @format -->

<template>
    <div>
        <section class="hidden" id="Welcome">
            <h1>Welcome to my website!</h1>
            <p>I'm Kaden Hood</p>
            <p>This is my online blog/portfolio that shows projects I'm working on</p>
            <p>or things I'm involved with.</p>
            <p>Click <button @click="cycleForward">❯</button> to scroll to the Next Section!</p>
        </section>
        <section class="hidden" id="About">
            <h2>About Me</h2>
            <p></p>
            <p>I wear gloves all the time. (Don't Ask Why)</p>
            <p>My name online is Gloves.</p>
            <p>I play video games.</p>
            <p>Owner of the <a class="fancy-link" href="#Discord" target="_blank" rel="noopener" style="color: rgba(141, 139, 139, 0.541)">Gloved Discord Server</a>.</p>
            <p>My favorite thing to do is code.</p>
        </section>
        <section id="Discord" class="hidden">
            <h2>My Discord Server</h2>
            <a class="fancy-link" href="https://glovedweb.ddns.net/discord" target="_blank" rel="noopener" style="color: rgba(141, 139, 139, 0.541)">https://glovedweb.ddns.net/discord </a>
            <iframe id="discord-widget" src="https://discord.com/widget?id=937806100546351174&theme=dark" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"> </iframe>
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
            <h2>How I started this</h2>
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
        <section id="Chatbot">
            <h2>Just A Simple Little Chatbot</h2>
            <p>(Snarky, and only works half of the time)</p>
            <div id="chatbot-container">
                <div id="chatHistory" class="chat-container" ref="chatContainer">
                    <div v-for="(message, index) in chatHistory" :key="index" :class="{ message: true, user: message.role === 'user', bot: message.role !== 'user' }">
                        {{ message.parts }}
                    </div>
                </div>
                <form id="chatForm" @submit.prevent="submitMessage">
                    <input type="text" id="userMessage" placeholder="Type a message..." v-model="userMessage" />
                    <button type="submit">Send</button>
                </form>
            </div>
        </section>
        <section class="hidden" id="FileManager">
            <FileManager />
        </section>

        <NavComponent />
        <canvas></canvas>
    </div>
</template>

<script>
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import FileManager from "../components/FileManager.vue";
import NavComponent from "../components/NavComponent.vue";
import { utils } from "../assets/Utils.js";

export default {
    data() {
        return {
            // observer: null,
            // currentSection: null,
            // sectionObserver: null,
            // nextSection: null,
            // prevSection: null,
            // items: [],
            // startIndex: 0,
            // direction: "",
            canvas: null,
            ctx: null,
            pointer: {},
            params: {},
            trail: [],
            mouseMoved: false,
            angle: 15,
            cursor: null,
            mouseX: 0,
            mouseY: 0,
            radius: 50,
            speed: 0.2,
            mouseMoveTimeout: null,
            userMessage: null,
            message: null,
            chatHistory: [],
            thinkingInterval: null,
            chat: null,
            genAI: new GoogleGenerativeAI(process.env.VUE_APP_GOOGLE_API_KEY),
            generationConfig: {
                temperature: 7.0,
                topK: 3,
                topP: 1,
                maxOutputTokens: 512,
            },
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
            ],
        };
    },
    computed: {
        visibleItems() {
            return this.items.slice(0, 3);
        },
    },
    mounted() {
        document.body.style.overflow = "hidden";
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.pointer = {
            x: 0.5 * window.innerWidth,
            y: 0.5 * window.innerHeight,
        };
        this.params = {
            pointsNumber: 20,
            widthFactor: 0.4,
            mouseThreshold: 0.5,
            spring: 0.5,
            friction: 0.5,
        };

        for (let i = 0; i < this.params.pointsNumber; i++) {
            this.trail[i] = {
                x: this.pointer.x,
                y: this.pointer.y,
                dx: 0,
                dy: 0,
            };
        }

        window.addEventListener("click", this.updateMousePosition);
        window.addEventListener("mousemove", this.updateMousePosition);
        window.addEventListener("touchmove", this.updateMousePosition);

        this.setupCanvas();
        this.update(0);
        window.addEventListener("resize", this.setupCanvas);
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
        this.mouseMoved = false;
    },
    beforeUnmount() {
        window.removeEventListener("click", this.updateMousePosition);
        window.removeEventListener("mousemove", this.updateMousePosition);
        window.removeEventListener("touchmove", this.updateMousePosition);
        window.removeEventListener("resize", this.setupCanvas);
        window.removeEventListener("scroll", this.onScroll);
        if (this.observer) {
            this.observer.disconnect();
        }
    },
    methods: {
        async submitMessage() {
            if (!this.userMessage) {
                return;
            }

            const text = this.userMessage;
            this.message = text;
            this.userMessage = "";
            this.chatHistory.push({ role: "user", parts: this.message });
            console.log(this.chatHistory);

            let result;
            if (!this.chat) {
                const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
                this.chat = model.startChat({
                    history: utils.history,
                    generationConfig: this.generationConfig,
                    safetySettings: this.safetySettings,
                });
                result = await this.chat.sendMessage(this.message);
            } else {
                try {
                    result = await this.chat.sendMessage(this.message);
                } catch (error) {
                    console.error(error);
                    this.chat = null;
                    this.chatHistory.push({ role: "model", parts: "I'm sorry, I'm having trouble understanding you right now. Reset Conversation." });
                    return;
                }
            }
            const response = await result.response;
            console.log(response);
            this.chatHistory.push({ role: "model", parts: response.text() });
            this.$nextTick(() => {
                const container = this.$refs.chatContainer;
                container.scrollTop = container.scrollHeight;
            });
        },
        updateMousePosition(e) {
            this.mouseMoved = true;
            clearTimeout(this.mouseMoveTimeout);
            this.mouseMoveTimeout = setTimeout(() => {
                this.mouseMoved = false;
            }, 6000);
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        },
        setupCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        },
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
        update(t) {
            this.angle += this.speed;
            this.pointer.x = this.mouseX + this.radius * Math.cos(this.angle);
            this.pointer.y = this.mouseY + this.radius * Math.sin(this.angle);
            if (!this.mouseMoved) {
                this.pointer.x = (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * window.innerWidth;
                this.pointer.y = (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) * window.innerHeight;
            }

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.trail.forEach((p, pIdx) => {
                const prev = pIdx === 0 ? this.pointer : this.trail[pIdx - 1];
                const spring = pIdx === 0 ? 0.4 * this.params.spring : this.params.spring;
                p.dx += (prev.x - p.x) * spring;
                p.dy += (prev.y - p.y) * spring;
                p.dx *= this.params.friction;
                p.dy *= this.params.friction;
                p.x += p.dx;
                p.y += p.dy;
            });

            this.ctx.lineCap = "round";
            this.ctx.beginPath();
            this.ctx.moveTo(this.trail[0].x, this.trail[0].y);

            for (let i = 1; i < this.trail.length - 1; i++) {
                const xc = 0.5 * (this.trail[i].x + this.trail[i + 1].x);
                const yc = 0.5 * (this.trail[i].y + this.trail[i + 1].y);
                this.ctx.quadraticCurveTo(this.trail[i].x, this.trail[i].y, xc, yc);
                this.ctx.lineWidth = this.params.widthFactor * (this.params.pointsNumber - i);
                this.ctx.stroke();
            }
            this.ctx.lineTo(this.trail[this.trail.length - 1].x, this.trail[this.trail.length - 1].y);
            this.ctx.stroke();

            window.requestAnimationFrame(this.update);
        },
    },
    name: "HomeRoute",
    components: {
        FileManager,
        NavComponent,
    },
};
</script>

<style lang="sass"></style>
