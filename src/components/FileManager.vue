<!-- @format -->

<template>
    <div>
        <h1>Simple File Uploader</h1>

        <h2>Upload File</h2>
        <input type="file" @change="uploadFile" />

        <h2>Download Files <button @click="getFiles" title="Refresh Files">&#8635;</button></h2>
        <ul class="file-list">
            <li v-for="file in files" :key="file" class="file-item">
                <a :href="`https://glovedweb.ddns.net/api/download/${file}`">{{ file }}</a> <button class="deleteButton" @click="deleteFile(file)" title="Delete File">X</button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            files: [],
        };
    },
    async created() {
        await this.getFiles();
    },
    methods: {
        async deleteFile(file) {
            try {
                await axios.delete(`https://glovedweb.ddns.net/api/delete/${file}`);
                await this.getFiles();
            } catch (error) {
                console.error("An error occurred while deleting file:", error);
            }
        },
        async getFiles() {
            try {
                const response = await axios.get("https://glovedweb.ddns.net/api/files");
                this.files = response.data;
            } catch (error) {
                console.error("An error occurred while getting files:", error);
            }
        },
        async uploadFile(event) {
            try {
                const file = event.target.files[0];
                const formData = new FormData();
                formData.append("file", file);

                await axios.post("https://glovedweb.ddns.net/api/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                await this.getFiles();
            } catch (error) {
                console.error("An error occurred while uploading file:", error);
            }
        },
        async downloadFile(file) {
            try {
                const response = await axios.get(`https://glovedweb.ddns.net/api/download/${file}`, {
                    responseType: "blob",
                });

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", file);
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.error("An error occurred while downloading file:", error);
            }
        },
    },
};
</script>
<style scoped lang="sass">
ul
    list-style-type: none

.file-list
    display: flex
    flex-direction: column
    flex-wrap: wrap
    height: 15rem
    overflow-x: auto
    align-items: center

.file-item
    display: inline-flex
    flex-basis: 33.33%
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    padding-inline: 1vh
    align-items: center

a
    display: inline-flex
    align-items: center
    justify-content: center
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
        transform: scale(1.05)
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7)
    &:active
        transform: scale(0.9)

button, input
    background-color: #6a6aff
    border: none
    color: white
    padding: 1rem 1rem
    text-align: center
    text-decoration: none
    display: inline-block
    font-size: 1em
    margin: 0.2rem 0.2rem
    cursor: pointer
    transition-duration: 0.4s
    border-radius: 1.3rem
    transition: transform 0.3s ease
    &:hover
        background-color: #4c4cff
        transform: scale(1.05)

.deleteButton
    background-color: #ff6a6a
    &:hover
        background-color: #ff4c4c
</style>
