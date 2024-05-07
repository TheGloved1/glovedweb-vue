<!-- @format -->

<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    components: {},
};
</script>

<style>
* {
    font-size: 100%;
}

body {
    background-color: #121216;
    color: #ffffff;
    font-family: "Poppins", sans-serif;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    align-content: center;
    flex-wrap: nowrap;
}

.pageNav {
    position: fixed;
    margin: 0;
    top: 0;
    left: 0;
    right: auto;
    display: flex;
    width: -webkit-fill-available;
    background-color: #333;
    color: #fff;
    padding: 0.5rem;
}

.pageNav ul {
    display: flex;
    width: 100%;
}

.pageNav ul li {
    justify-content: center;
    transform: scale(1);
    list-style-type: none;
    opacity: 1;
    font-size: 50%;
    margin: 1rem;
    padding: 0.2rem;
    cursor: pointer;
    border: 2px solid #fff;
    border-radius: 5px;
}

.pageNav ul li:hover {
    background-color: #555;
    transform: scale(0.95);
}

.pageNav ul li .routerActive {
    transform: scale(1.45);
}

section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 115vh;
    box-sizing: border-box;
    text-align: center;
}

.hidden {
    contain: content;
    opacity: 0;
    filter: blur(0.5em);
    transform: translateX(-10em);
    transition: all 1s;
}

.show {
    opacity: 1;
    filter: blur(0);
    transform: translateX(0);
}

img {
    max-width: 100%;
    height: auto;
}

.homeButton {
    background-color: #6a6aff;
    border: none;
    color: white;
    padding: 1rem 0.8rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 1rem 0.5rem;
    cursor: pointer;
    transition-duration: 0.4s;
    border-radius: 1.3rem;
    transition: all 0.2s ease;
}

.homeButton:hover {
    background-color: #4c4cff;
    transform: scale(1.1);
}

.homeButton:active {
    transform: scale(0.9);
}

#next-section-button {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
}

#next-section-button-copy {
    bottom: 1.5rem;
    right: 1.5rem;
}

#previous-section-button {
    position: fixed;
    bottom: 1.5rem;
    left: 1.5rem;
}

.next-section-button {
    right: 0.2rem;
    position: absolute;
}

.previous-section-button {
    left: 0.2rem;
    position: absolute;
}

.video-container {
    position: relative;
    width: 50vw;
    padding-bottom: 28.125vw;
    margin: 0 auto;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #ffffff;
}

.image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(100px, 100vw, 300px);
    height: auto;
    padding-bottom: 0rem;
    margin: 0 auto;
}

.image-container img {
    width: 75%;
    height: 75%;
    padding: 0vw;
    padding-top: 2rem;
}

.HomeNav * {
    font-size: 1rem;
}

.HomeNav {
    position: fixed;
    margin: 0;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #333;
    color: #fff;
    padding: 0.3rem;
}

.HomeNav ul {
    display: flex;
    list-style-type: none;
    align-items: center;
    width: 100vw;
    padding: 0;
    justify-content: center;
}

.HomeNav ul li {
    justify-content: center;
    transform: scale(0.8);
    opacity: 1;
    display: flex;
    padding: 0;
}

.HomeNav ul li a {
    display: inline-block;
    position: relative;
    margin: 0 0;
    padding: 0.2em;
    color: #fff;
    text-decoration: none;
    border: 1px solid #fff;
    height: 50%;
    font-size: 2em;
    border-radius: 0.4em;
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
    background-color: #444;
}

.HomeNav ul li a:hover {
    background-color: #555;
    color: #ddd;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7);
}

.HomeNav ul li a:active {
    transform: scale(0.9);
    transition: transform 0.3s;
}

#chatbot-container {
    width: 65vw;
    height: 55vh;
    border: 0.3rem solid #6a6aff;
    padding: 1rem;
    margin: 0 auto;
    background-color: #121216;
    box-shadow: 0 0 1vw rgba(0, 0, 0, 0.1);
    display: flex;
    border-radius: 1.4vw;
    flex-direction: column;
    justify-content: center;
    font-family: "Poppins", sans-serif;
    color: #ffffff;
    align-items: stretch;
}

#chatHistory {
    display: flex;
    flex-direction: column;
    padding: 0.5vw;
    overflow-y: auto;
    scrollbar-width: none;
    text-align: left;
}

#chatHistory::-webkit-scrollbar {
    display: none;
}

#chatHistory .message {
    max-width: 60%;
    margin-bottom: 1vw;
    padding: 1vw;
    border-radius: 1vw;
    color: #ffffff;
}

#chatHistory .message.user {
    align-self: flex-start;
    background-color: #3b3b47;
}

#chatHistory .message.bot {
    align-self: flex-end;
    background-color: #6a6aff;
}

.chat-container {
    border: 1px solid #ccc;
    height: 100%;
    overflow-y: scroll;
    padding: 8px;
    margin-bottom: 10px;
    border-radius: inherit;
}

#chatForm {
    display: flex;
    /* margin-top: 0vw; */
    border-radius: inherit;
}

#chatForm input {
    flex-grow: 1;
    padding: 0.5vw;
    border: 4px solid #6a6aff;
    border-radius: inherit;
    background-color: #121216;
    color: #3b3b47;
}

#chatForm button {
    margin-left: 1vw;
    margin-right: auto;
    padding: 1vw 2vw;
    border: none;
    background-color: #6a6aff;
    color: #ffffff;
    cursor: pointer;
    border-radius: inherit;
    transition-duration: 0.4s;
}

#chatForm button:hover {
    background-color: #4c4cff;
    transform: scale(1.1);
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #888;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.fancy-link {
    text-decoration: none;
    background-image: linear-gradient(90deg, red, blue);
    background-size: 0% 3px;
    background-repeat: no-repeat;
    color: grey;
    background-position: left 1.5rem;
    padding-block: 0.25rem;
    transition: color 500ms, background-size 500ms;
}

.fancy-link:hover,
.fancy-link:focus {
    color: purple;
    background-size: 100% 3px;
}

#discord-widget {
    width: 50vh;
    height: 70vh;
    border: 2px solid #000;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
}

.hide {
    display: none;
    opacity: 0;
    transition: all 0.5s;
    transform: translateX(-10em);
    filter: blur(0.5em);
    contain: content;
}

.list-move {
    transition: transform 0.2s, opacity 2s;
}

.list-enter,
.list-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.list-leave-active,
.list-enter-active {
    transform: translateX(0);
    opacity: 1;
}

.move-right,
.move-left {
    opacity: 1;
}

canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    pointer-events: none;
}

@media screen and (max-width: 1000px) {
    .HomeNav * {
        font-size: 2vw;
    }
}

@media screen and (max-width: 600px) {
    button {
        padding: 0.5rem 0.5rem;
    }

    .next-section-button,
    .previous-section-button,
    .next-section-button-copy {
        display: none;
        position: fixed;
        max-width: 0px;
        max-height: 0px;
        padding: 0 0;
    }



    #chatbot-container {
        width: 75vw;
        height: 45vh;
    }

    #discord-widget {
        width: 75vw;
        height: 60vh;
        border: 2px solid #000;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
    }
}
</style>
