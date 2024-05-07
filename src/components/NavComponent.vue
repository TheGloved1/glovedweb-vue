<!-- @format -->

<template>
    <div>
        <nav class="HomeNav">
            <button class="homeButton previous-section-button" @click="cycleBackward">❮</button>
            <transition-group name="list" tag="ul">
                <li v-for="(item, index) in items" :key="item">
                    <a :class="{ 'item-big': index === this.currentSectionIndex, [`item-${index}`]: true, [direction]: true }"
                        :href="`#${item}`" @click="setSectionIndex(index)">
                        {{ item }}
                    </a>
                </li>
            </transition-group>
            <button class="homeButton next-section-button" @click="cycleForward">❯</button>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            observer: null,
            currentSection: null,
            sectionObserver: null,
            nextSection: null,
            prevSection: null,
            sections: null,
            items: [],
            currentSectionIndex: 0,
            startIndex: 0,
            direction: "",
        };
    },
    mounted() {
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
        window.removeEventListener("scroll", this.onScroll);
        if (this.observer) {
            this.observer.disconnect();
        }
    },
    methods: {
        setSectionIndex(index) {
            console.log(`Setting section index to ${index}!`);
            this.currentSectionIndex = index;
            console.log(`Current section index is now ${this.currentSectionIndex}!`);
            this.scrollTo(this.currentSectionIndex);
        },
        getAllSections() {
            this.items = Array.from(document.querySelectorAll("section")).map((section) => section.id);
        },
        onScroll() {
            this.currentSectionIndex = this.items.findIndex((item) => document.getElementById(item).getBoundingClientRect().top >= 0);
            while (this.items[0] !== this.items[this.currentSectionIndex]) {
                if (this.currentSectionIndex > 1) {
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
        async cycleForward() {
            if (this.currentSectionIndex < this.items.length - 1) {
                this.currentSectionIndex++;
            } else {
                this.currentSectionIndex = 0;
            }
            console.log(`Scrolling to index ${this.currentSectionIndex}!`);
            this.scrollTo(this.currentSectionIndex);
        },
        async cycleBackward() {
            if (this.currentSectionIndex > 0) {
                this.currentSectionIndex--;
            } else {
                this.currentSectionIndex = this.items.length - 1;
            }
            console.log(`Scrolling to index ${this.currentSectionIndex}!`);
            this.scrollTo(this.currentSectionIndex);
        },
        async scrollTo(index) {
            const element = document.getElementById(this.items[index]);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }

        },
    },
    name: "NavComponent",
    components: {},
};
</script>
<style>
.item-big {
    transform: scale(1.2);
    margin: 0 1rem;
}
</style>
