<!-- @format -->

<template>
    <div class="file-font">
        <h1>Simple File Uploader</h1>
        <p>(Don't download random files off the internet)</p>

        <h2>Upload File</h2>
        <input class="homeButton fileButton" type="file" @change="uploadFile" />

        <h2>Download Files <button class="homeButton fileButton" @click="getFiles"
                title="Refresh Files">&#8635;</button>
        </h2>
        <ul class="file-list">
            <li v-for="file in files" :key="file" class="file-item">
                <a class="file-a" :href="`https://api.gloved.dev/download/${file}`">{{ file }}</a> <button
                    class="homeButton deleteButton" @click="deleteFile(file)" title="Delete File">X</button>
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
            passwordEntered: false,
            correctPassword: process.env.FILE_MANAGER_PASSKEY,
        }
    },
    async created() {
        await this.getFiles();
    },
    methods: {
        async deleteFile(file) {
            if (!this.passwordEntered) {
                const password = prompt(`Enter passkey to delete files`);
                if (password === this.correctPassword) {
                    this.passwordEntered = true;
                } else {
                    alert('Incorrect passkey');
                    return;
                }
            }
            try {
                await axios.delete(`https://api.gloved.dev/delete/${file}`);
                await this.getFiles();
            } catch (error) {
                console.error("An error occurred while deleting file:", error);
                alert('An error occurred while deleting file');
            }
        },
        async getFiles() {
            this.files = []
            try {
                const response = await axios.get("https://api.gloved.dev/files/");
                this.files = response.data;
            } catch (error) {
                console.error("An error occurred while getting files:", error);
                alert('An error occured while getting files');
            }
        },
        async uploadFile(event) {
            try {
                const file = event.target.files[0];
                const formData = new FormData();
                formData.append("file", file);

                await axios.post("https://api.gloved.dev/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                await this.getFiles();
            } catch (error) {
                console.error("An error occurred while uploading file:", error);
                alert('An error occured while uploading file');
            }
        },
        async downloadFile(file) {
            try {
                const response = await axios.get(`https://api.gloved.dev/download/${file}`, {
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
                alert('An error occured while downloading file');
            }
        },
    },
};
</script>

<style lang="scss">
.file-font * {
    font-size: 100%;
}

.file-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 10rem;
    overflow-x: auto;
    align-items: center;
}

.file-list * {
    font-size: 90%;
}

@media screen and (max-width: 800px) {
    .file-font * {
        font-size: 50%;
    }

    .file-list * {
        font-size: 60%;
    }

    .fileButton {
        margin: 0;
    }
}

.file-item {
    display: inline-flex;
    flex-basis: 33.33%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.6rem;
    align-items: center;
}

.file-a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0;
    padding: 0.2rem;
    color: #fff;
    text-decoration: none;
    border: 1px solid #fff;
    border-radius: 0.6rem;
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
    background-color: #444;
}

.file-a:hover {
    background-color: #555;
    color: #ddd;
    transform: scale(1.05);
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7);
}

.file-a:active {
    transform: scale(0.9);
}

.fileButton {
    background-color: #6a6aff;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 0.2rem 0.2rem;
    cursor: pointer;
    transition-duration: 0.4s;
    border-radius: 0.5rem;
    transition: transform 0.3s ease;
}

.fileButton:hover {
    background-color: #4c4cff;
    transform: scale(1.05);
}

.deleteButton {
    background-color: #ff6a6a;
}

.deleteButton:hover {
    background-color: #ff4c4c;
}
</style>
