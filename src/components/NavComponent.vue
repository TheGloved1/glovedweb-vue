<!-- @format -->

<template>
    <div>
        <nav>
            <button @click="cycleBackward">❮</button>
            <transition-group name="list" tag="ul">
                <li
                    v-for="(item, index) in items"
                    :key="item"
                    @click="
                        (event) => {
                            event.preventDefault();
                        }
                    ">
                    <a :class="{ 'item-big': index === 2, 'item-small': index !== 2, [`item-${index}`]: true, [direction]: true, itemshow: index < 3, itemhide: index >= 3 }" :href="`#${item}`">
                        {{ item }}
                    </a>
                </li>
            </transition-group>
            <button @click="cycleForward">❯</button>
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
        getAllSections() {
            this.items = Array.from(document.querySelectorAll("section:not(.hide)")).map((section) => section.id);
            this.cycleBackward();
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
    name: "NavComponent",
};
</script>
<style scoped lang="sass"></style>
