<!-- @format -->

<template>
    <div>
        <div class="pageNav">
            <ul>
                <li>
                    <router-link to="/Home">Home</router-link>
                </li>
                <li>
                    <router-link to="/Projects">Projects</router-link>
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
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

.pageNav
    position: fixed
    margin: 0
    top: 0
    left: 0
    right: auto
    display: flex
    width: -webkit-fill-available
    background-color: #333
    color: #fff
    padding: 0.5rem
    ul
        display: flex
        width: 100%
        li
            justify-content: center
            transform: scale(1)
            list-style-type: none
            opacity: 1
            font-size: 2vw
            margin: 1vw
            padding: 0.5rem
            cursor: pointer
            border: 2px solid #fff
            border-radius: 5px
            &:hover
                background-color: #555
                transform: scale(0.95)
            .routerActive
                transform: scale(1.25)
            // a
            //     display: inline-block
            //     position: relative
            //     margin: 0 0.5rem
            //     padding: 0.4rem 1rem
            //     color: #fff
            //     text-decoration: none
            //     border: 1px solid #fff
            //     border-radius: 0.4rem
            //     font-size: 2vw
            //     transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease
            //     box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3)
            //     background-color: #444
            //     &:hover
            //         background-color: #555
            //         color: #ddd
            //         transform: scale(1.1)
            //         box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7)
            //     &:active
            //         transform: scale(0.9)

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
    padding: 0.4rem 0.8rem
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
        width: 75%
        height: 75%
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
    bottom: 0
    left: 0
    right: auto
    display: flex
    width: -webkit-fill-available
    background-color: #333
    color: #fff
    padding: 0.5rem
    ul
        display: flex
        list-style-type: none
        align-items: center
        width: 100%
        justify-content: center
        li
            justify-content: center
            transform: scale(0.8)
            opacity: 0.5
            font-size: 2vw
            display: none
            padding: 0
            &:nth-child(2)
                transform: scale(1.1)
                opacity: 1
            &:nth-child(1)
                transform: perspective(800px) rotateY(-25deg) translate(-3vw)
            &:nth-child(3)
                transform: perspective(800px) rotateY(25deg) translate(3vw)
            &:nth-child(-n+3)
                flex: 0
                display: flex
                align-items: center
                justify-content: center
            a
                display: inline-block
                position: relative
                margin: 0 0.5rem
                padding: 0.4rem 1rem
                color: #fff
                text-decoration: none
                border: 1px solid #fff
                border-radius: 0.4rem
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
    height: 55vh
    border: 0.3rem solid #6a6aff
    padding: 1rem
    margin: 0 auto
    background-color: #121216
    box-shadow: 0 0 1vw rgba(0, 0, 0, 0.1)
    display: flex
    border-radius: 1.4vw
    flex-direction: column
    justify-content: center
    font-family: "Poppins", sans-serif
    color: #ffffff
    align-items: stretch
    font-size: 0.8vw

#chatHistory
    display: flex
    flex-direction: column
    padding: 0.5vw
    overflow-y: auto
    scrollbar-width: none
    &::-webkit-scrollbar
        display: none
    text-align: left
    .message
        max-width: 60%
        margin-bottom: 1vw
        padding: 1vw
        border-radius: 1vw
        color: #ffffff
        &.user
            align-self: flex-start
            background-color: #3b3b47
        &.bot
            align-self: flex-end
            background-color: #6a6aff

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
        color: #3b3b47
    button
        margin-left: 1vw
        margin-right: auto
        padding: 1vw 2vw
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
    transition: all 0.5s
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
    opacity: 0
    transition: all 0.2s

.itemshow
    width: auto
    // position: relative
    display: inline-block
    opacity: 1
    transition: all 0.2s

canvas
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 9999
    pointer-events: none

@media screen and (max-width: 600px)
    body
        font-size: 2vw

    button
        padding: 0.5rem 0.5rem

    #next-section-button,
    #next-section-button-copy
        bottom: 1em
        right: 1em

    #previous-section-button
        bottom: 1em
        left: 1em

    #chatbot-container
        width: 75vw
        height: 45vh
        font-size: 0.6rem

    #discord-widget
        font-size: 0.8rem
        width: 75vw
        height: 60vh
        border: 2px solid #000
        border-radius: 10px
        overflow: hidden
        position: relative
</style>
