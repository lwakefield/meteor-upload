# Meteor Upload

This is a demo app showing how you can upload files with an XMLHttpRequest.
Check out the [original post here](https://iamlawrence.me/uploading-files-with-meteor).
And the [relevant gists here](https://gist.github.com/lwakefield/23b5ec7e28bb18a2ec1a638d4c2f07b7).

![Screenshot](https://i.imgur.com/HhY27Ip.png)

This app uses Meteor as a backend, 
([see here for more info](https://iamlawrence.me/agnostic-meteor)) and
VueJS for the frontend. The logic in this demo app is completely the same
as if you were to use Meteor (or anything else) for the frontend.

To get started:

```
# Setup the backend:
cd backend
meteor npm install
meteor -p 3000 # The frontend expects meteor on port 3000

# Setup the frontend
cd ../frontend
npm install
npm run dev

# Now you can browse to localhost:8080
```
