<template>
    <nav class="storeNav" :class="{ open: navOpen }">
        <button class="hamburger" :class="{ open: navOpen }" @click="toggleNav">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <ul class="nav-list">
            <li>
                <router-link to="/store/home">Home</router-link>
            </li>
            <li>
                <router-link to="/store/gallery">Gallery</router-link>
            </li>
            <li>
                <router-link to="/store/about">About</router-link>
            </li>
        </ul>
    </nav>
    <router-view></router-view>
</template>


<script>
export default {
    name: "StoreNav",
    components: {},
    data() {
        return {
            navOpen: true,
        }
    },
    methods: {
        toggleNav() {
            this.navOpen = !this.navOpen;
        }
    },
    mounted() {
        document.title = "Kamden's Art Store";
    }
};
</script>

<style lang="scss">
:root {
    --body-bg: #123;
    --nav-bg: #234;
}

.hamburger {
    position: relative;
    top: 1rem;
    left: 125%;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 1000;
    transition: transform 0.3s ease-out;

    &:hover {
        background: grey;
        transform: scale(1.1);
        border-radius: 50%;
        border: grey;
    }

    span {
        display: block;
        width: 2rem;
        height: 0.25rem;
        background: white;
        margin: 0.25rem 0;
    }

    &.open {
        transform: rotate(180deg);
    }
}

* {
    box-sizing: border-box;
}

.storeNav {
    background: var(--nav-bg);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    padding-block: 2rem;
    transform: translateX(-100%);
    transition: transform 0.3s ease-out;

    &.open {
        transform: translateX(0);
    }
}

.nav-list {
    margin: 0;
    padding: 0;
    list-style: none;

    display: grid;
    gap: 1rem;
}

.nav-list a {
    color: white;
    display: block;
    text-decoration: none;
}

.nav-list li {
    padding-block: 1rem;
    padding-inline: 2rem;
    margin-inline: 1rem 0;
    /* prevent animation glitch on right side */
    box-shadow: 2px 0 0 var(--body-bg);
}

.nav-list li.active {
    view-transition-name: nav;
    display: block;
    background: var(--body-bg);
    position: relative;
    z-index: -1;
    border-radius: 100vw 0 0 100vw;
}

::view-transition-group(nav) {
    animation-duration: 1s;
}

.nav-list li.active::before,
.nav-list li.active::after {
    --border-radius: 1rem;

    content: "";
    position: absolute;
    width: var(--border-radius);
    height: var(--border-radius);
    right: 0rem;
    background: var(--nav-bg);
}

.nav-list li.active::before {
    border-radius: 0 0 var(--border-radius);
    top: calc(var(--border-radius) * -1);
    box-shadow: 5px 5px 0 5px var(--body-bg);
}

.nav-list li.active::after {
    border-radius: 0 var(--border-radius) 0 0;
    bottom: calc(var(--border-radius) * -1);
    box-shadow: 5px -5px 0 5px var(--body-bg);
}

.nav-list li:nth-child(1) a {
    view-transition-name: test;
}

.nav-list li:nth-child(2) a {
    view-transition-name: test-2;
}

.nav-list li:nth-child(3) a {
    view-transition-name: test-3;
}


li:has([aria-current]) {
    view-transition-name: nav;
    display: block;
    background: var(--body-bg);
    position: relative;
    z-index: 100;
    border-radius: 100vw 0 0 100vw;
}

::view-transition-group(.storeNav) {
    animation-duration: 1s;
}

li:has([aria-current]) {
    z-index: -1;
}

li:has([aria-current])::before,
li:has([aria-current])::after {
    --br: 0.5rem;

    content: "";
    position: absolute;
    width: var(--br);
    height: var(--br);
    right: 0rem;
    top: -0.5rem;
    background: var(--nav-bg);
    box-shadow: 3px 3px 0 0rem var(--body-bg);
    border-radius: 0 0 var(--br);
}

li:has([aria-current])::after {
    border-radius: 0 var(--br) 0 0;
    bottom: -0.5rem;
    top: auto;
    box-shadow: 3px -3px 0 0rem var(--body-bg);
}
</style>
