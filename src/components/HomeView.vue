<!-- @format -->

<template>
    <div>
        <section class="hidden" id="Welcome">
            <h1>Welcome to my website!</h1>
            <p>I'm Kaden Hood</p>
            <p>A young software engineer</p>

            <p>Click <button class="homeButton" @click="cycleForward">❯</button> to scroll to the Next Section!</p>
        </section>

        <section class="hidden" id="About">
            <h2>About Me</h2>
            <p></p>
            <p>I wear gloves, and go by "Gloves" online.</p>
            <p>I love to code, and learn new things.</p>
        </section>

        <section class="hidden" id="Robotics">
            <h2><strong><a class="fancy-link" href="https://meporobotics.com/">Mediapolis High School Robotics
                        Club</a></strong></h2>
            <p><a class="fancy-link" href="https://frc-events.firstinspires.org/team/9061">FIRST Inspires Robotics Team
                    9061</a></p>
            <p>2023 - Present</p>
            <p></p>
            <p><strong>Role:</strong> Programmer</p>
            <p><strong>Language:</strong> Java & Python</p>
        </section>

        <!-- <div v-html="discordSection"></div> -->

        <section class="hidden" id="Credits">
            <p>This website was built using the <a class="fancy-link" href="https://vuejs.org/">Vue.js</a> web framework
            </p>
            <p></p>
            <h2>How I started this</h2>
            <div class="video-container">
                <iframe src="https://youtube.com/embed/T33NN_pPeNI/" title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen> </iframe>
            </div>
        </section>

        <GitUserComponent :gitUserName="gitUserName" />

        <!-- <section id="Chatbot"> -->
        <!--     <h2>Just A Simple Little Chatbot</h2> -->
        <!--     <p>(Snarky, and only works half of the time)</p> -->
        <!--     <div id="chatbot-container"> -->
        <!--         <div id="chatHistory" class="chat-container" ref="chatContainer"> -->
        <!--             <div v-for="(message, index) in chatHistory" :key="index" -->
        <!--                 :class="{ message: true, user: message.role === 'user', bot: message.role !== 'user' }"> -->
        <!--                 {{ message.parts }} -->
        <!--             </div> -->
        <!--         </div> -->
        <!--         <form id="chatForm" @submit.prevent="submitMessage"> -->
        <!--             <input type="text" id="userMessage" placeholder="Type a message..." v-model="userMessage" /> -->
        <!--             <button type="submit">Send</button> -->
        <!--         </form> -->
        <!--     </div> -->
        <!-- </section> -->

        <section class="hidden" id="FileManager">
            <FileManager />
        </section>

        <NavComponent />

        <router-link to="/store" class="shopping-cart-button">
            <p>Checkout Some Art!</p>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACA0lEQVR4nO3ZTUojURDA8b8NBsUL+BHBG5hTzKh3ULMRFF30RtyKMKsZzzAL3fdCV+JWDX6iFxAUxIVuVPyEUQIvDBRGO9Kpauz6wQOhoaq60l3vJYJzzjnnnHPOOfeeMeAceBXrCTgCqnxz5+/cvFyLFLwBz0CZb2oUOEvRhJiCiUUDEgqmIhpwDUQUSARciSbUm9JwmuK1afcab3cTkg/mwF/jm/8H9FnOgapxA44xngNDxg34nYc5oOlE1PFDK3HywRzQ0hve+UYND0B3kc4Dk6KGjaKdB1ZFDfOaySPjOdABXIj8wyhLDOeAfAIvQ1NUxYZzYF7kXsFAxXAObIjcExiIjOZAF3Avjr/9GEkM5sBPkbN+GDITG8yBPyLnMoYqBnPgWOQcwVCkPAfk8fcR6MFYojgHxkWuTXIgNvz6u0AODAIvBjf/En5/yIUlgwb8ImeqwGH491m7bvo57AJTFmf/NErAHFAD7sLaAWbDNe04qvrDE9Ds0ztI+YttVnFUlT4purH2gU6FOOrmWniPZxTiqKuJ4taAgbDWxLVthTjqbkVx9YIbyuLajUIcdTeiuPIXC88qjrpak0e3XvR6Bq9Aq3HUzbYwvKYV4qgrhf35s6J3U2yDWcQx0Rf252ZF76U8wGQVx0Rn2J+3wkS/DX9Pt/iJZRXHOeecc845/nsD6Zdr5dINCCIAAAAASUVORK5CYII="
                alt="Store">
        </router-link>
        <!-- <canvas></canvas> -->
    </div>
</template>

<script>
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import FileManager from "../components/FileManager.vue";
import NavComponent from "../components/NavComponent.vue";
import GitUserComponent from "../components/GitUserComponent.vue";
import { utils } from "../assets/Utils.js";
// import { discordHtml } from "html-loader!../assets/discord.html";

export default {
    data() {
        return {
            gitUserName: "TheGloved1",
            canvas: null,
            // discordSection: discordHtml,
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
                temperature: 1.0,
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
    async mounted() {
        document.body.style.overflow = "hidden";
        // this.canvas = document.querySelector("canvas");
        // this.ctx = this.canvas.getContext("2d");
        // this.pointer = {
        //     x: 0.5 * window.innerWidth,
        //     y: 0.5 * window.innerHeight,
        // };
        // this.params = {
        //     pointsNumber: 20,
        //     widthFactor: 0.4,
        //     mouseThreshold: 0.5,
        //     spring: 0.5,
        //     friction: 0.5,
        // };
        //
        // for (let i = 0; i < this.params.pointsNumber; i++) {
        //     this.trail[i] = {
        //         x: this.pointer.x,
        //         y: this.pointer.y,
        //         dx: 0,
        //         dy: 0,
        //     };
        // }

        // window.addEventListener("click", this.updateMousePosition);
        // window.addEventListener("mousemove", this.updateMousePosition);
        // window.addEventListener("touchmove", this.updateMousePosition);

        // this.setupCanvas();
        // this.update(0);
        // window.addEventListener("resize", this.setupCanvas);
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

        this.mouseMoved = false;
    },
    beforeUnmount() {
        // window.removeEventListener("click", this.updateMousePosition);
        // window.removeEventListener("mousemove", this.updateMousePosition);
        // window.removeEventListener("touchmove", this.updateMousePosition);
        // window.removeEventListener("resize", this.setupCanvas);
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
        navigateToSection(item) {
            document.querySelector(`#${item}`).scrollIntoView({ behavior: "smooth" });
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
    name: "HomeView",
    components: {
        FileManager,
        NavComponent,
        GitUserComponent,
    },
};
</script>

<style>
.bottomRight {
    display: flex;
    font-size: 25%;
    bottom: 1rem;
    right: 1rem;
}

.shopping-cart-button {
    position: fixed;
    background-color: transparent;
    /* No background color */
    border: none;
    /* Remove default button border */
    padding: 0;
    /* Adjust padding as desired */
    cursor: pointer;
    bottom: 25px;
    left: 25px;
    font-size: 1.25vh;
    filter: invert(50%);
}

@media screen and (max-width: 800px) {
    .shopping-cart-button {
        top: 10vh;
        left: 2vh;
        bottom: auto;
    }
}
</style>
