<!-- @format -->

<template>
    <div>
        <section class="hidden" id="Hemochromatosis">
            <h2>What is the name of the disorder?</h2>
            <p>The disorder is called Hereditary Hemochromatosis. It is also sometimes referred to as "iron overload disorder".</p>
        </section>

        <section class="hidden" id="Mutations">
            <h2>What type of mutation causes this disorder?</h2>
            <p>Hereditary hemochromatosis is caused by a genetic mutation in the HFE gene. The most common mutations are C282Y and H63D.</p>
        </section>

        <section class="hidden" id="Diagnosis">
            <h2>How is the disorder diagnosed and inherited?</h2>
            <ul>
                <li><strong>Diagnosis:</strong> Hemochromatosis is diagnosed through blood tests (measuring iron, transferrin saturation, ferritin) and genetic testing for HFE mutations.</li>
                <li><strong>Inheritance:</strong> It's an autosomal recessive inherited disorder, meaning you need two copies of the mutated gene (one from each parent) to develop it.</li>
            </ul>
        </section>

        <section class="hidden" id="Symptoms">
            <h2>Main signs, symptoms, and impact</h2>
            <p>Early hemochromatosis may be asymptomatic. Symptoms can include:</p>
            <ul>
                <li>Fatigue and weakness</li>
                <li>Joint pain</li>
                <li>Abdominal pain</li>
                <li>Bronze or gray skin color</li>
                <li>Heart problems</li>
                <li>Liver problems</li>
                <li>Diabetes</li>
                <li>Depression</li>
            </ul>
            <p>Untreated hemochromatosis can lead to serious organ damage.</p>
        </section>

        <section class="hidden" id="Treatment">
            <h2>Treatment options</h2>
            <ul>
                <li><strong>Phlebotomy:</strong> Removing blood, similar to blood donation, to reduce iron levels.</li>
                <li><strong>Chelation therapy:</strong> Medication to remove excess iron.</li>
                <li><strong>Dietary changes:</strong> Limiting iron-rich foods and alcohol.</li>
            </ul>
        </section>

        <section class="hidden" id="Video">
            <h2>Video</h2>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/fXazHRK60rY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"> </iframe>
            </div>
        </section>

        <section class="hidden" id="References">
            <h2>Refrences</h2>
            <ul>
                <li><a>https://www.mayoclinic.org/diseases-conditions/hemochromatosis/symptoms-causes/syc-20351443</a></li>
            </ul>
        </section>
        <NavComponent />
    </div>
</template>

<script>
import NavComponent from "./NavComponent.vue";

export default {
    data() {
        return {};
    },
    methods: {},
    name: "GeneticsProjRoute",
    components: {
        NavComponent,
    },
};
</script>

<style lang="sass" scoped>

section
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    min-height: 35vh
    box-sizing: border-box
    text-align: center

.flexbox
    display: flex
    width: 75vw
    justify-content: center
    flex-wrap: wrap
    flex-direction: column
    align-items: center

.pageNav
    display: none

nav
    display: none
    top: 0
    bottom: auto
</style>
