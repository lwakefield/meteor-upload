<template>
    <div class="app">

        <div>
            <div class="dropzone">
                <input type="file" @change="upload($event)" multiple> + Upload Files
            </div>
        </div>

        <div class"upload-list">
            <div v-for="upload in uploads" class="upload">
                <span class="upload-name"> {{ upload.name }} </span>
                <div>
                    <progress :value="upload.progress" max="100"></progress>
                    <span v-show="upload.done">✔</span>
                </div>
            </div>
        </div>

        <div class="images">
            <img v-for="i in images" :src="i.data">
        </div>

    </div>
</template>

<script>
    import {
        createClass
    } from 'asteroid';
    const Asteroid = createClass();
    const asteroid = new Asteroid({
        endpoint: 'ws://localhost:3000/websocket'
    });
    asteroid.subscribe('files');
    export default {
        data () {
            return {
                uploads: [],
                images: []
            };
        },
        methods: {
            upload (e) {
                let files = e.target.files;
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];

                    this.uploads.push({
                        name: file.name,
                        progress: 0,
                        done: false
                    });
                    let index = this.uploads.length - 1;

                    var xhr = new XMLHttpRequest();
                    xhr.open('PUT', 'http://localhost:3000/file', true);
                    xhr.onload = (event) => {
                        this.uploads[index].done = true;
                    };
                    xhr.upload.onprogress = (event) => {
                        let percent = 100 * (event.loaded / event.total);
                        this.uploads[index].progress = percent;
                    };

                    xhr.send(file);
                }
            }
        },
        created () {
            asteroid.ddp.on('added', ({
                collection,
                id,
                fields
            }) => {
                if (collection === 'files') {
                    fields._id = id;
                    console.log(fields);
                    this.images.push(fields);
                }
            });
        }
    };
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Raleway);
    html {
        height: 100%;
    }
    
    body {
        font-family: 'Raleway', sans-serif;
        display: flex;
        justify-content: center;
        height: 100%;
    }

    img {
        width: 100%;
    }
    
    .app {
        max-width: 32rem;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
    }
    
    .dropzone {
        position: relative;
        height: 8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
        border: 1px solid #eee;
        margin: 1rem 0;
    }
    
    .dropzone input {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
    }
    
    .upload {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        margin: 0.25rem 0;
    }
    
    .upload-name {
        width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
