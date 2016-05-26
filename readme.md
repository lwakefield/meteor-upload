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

## A little more info

The images are stored in a MongoDB collection named `Files`. The data is encoded as 
base64 data, as it is very easy and quick to do.
There are a number of reasons why you shouldn't do this in production (or 
anywhere for that matter). It is slow, there are file size limitations (16MB for 
a MongoDB record I believe) and base64 is ~33% larger than binary.

So please, be aware this is for demonstration purposes only!
