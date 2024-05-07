<template>
    <section class="hidden" id="Github">
        <h2>Here's my github</h2>
        <div class="main container">
            <div v-if="loading">Loading user data...</div>
            <div v-else-if="error" class="error">{{ error }}</div>
            <div v-else-if="gitUser" id="card" class="user-card">
                <div class="image-container git-image-container">
                    <a :href="gitUser.html_url" target="_blank" rel="noopener">
                        <img id="git-user-img" :src="gitUser.avatar_url" alt="User image" />
                    </a>
                </div>
                <h2>{{ gitUser.name }}</h2>
                <span>{{ gitUser.login }}</span>
                <p>{{ gitUser.bio }}</p>
                <a class="fancy-link" id="github-link" :href="gitUser.html_url" target="_blank" rel="noopener">{{
                    gitUser.html_url }}</a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['gitUserName'],
    data() {
        return {
            gitUser: null,
            loading: true,
            error: null,
        };
    },
    async mounted() {
        this.gitUser = await this.fetchGitUser(this.gitUserName);
        this.loading = false;
    },
    methods: {
        async fetchGitUser(name) {
            let gitUserResponse = null;
            try {
                const response = await fetch(`https://api.github.com/users/${name}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                gitUserResponse = await response.json();
                console.log('Fetched gitUserData!', this.gitUser);
            } catch (error) {
                console.error('There was a problem with the fetch operation: ', error);
                gitUserResponse = null;
                this.error = "There was a problem fetching the user data. Please try again later.";
            }
            return gitUserResponse;
        },
    },
};
</script>

<style>
.git-image-container {
    position: relative;
    width: 15vw;
    height: auto;
    margin: 0 auto;
}

.user-card {
    display: grid;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 2rem;
    height: auto;
    border: 0.2rem solid #fff;
    border-radius: 2rem;
}

.error {
    color: red;
}
</style>
