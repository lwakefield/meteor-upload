import { Meteor } from 'meteor/meteor';

const Files = new Meteor.Collection('files');

Meteor.publish('files', () => Files.find() );

Meteor.methods({
    getFile(id) {return Files.findOne(id)},
    getFiles() {return Files.find().fetch()},
});

WebApp.connectHandlers.use('/file', (req, res) => {
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    } else if (req.method === 'PUT') {
        if (!req.headers['content-type'].startsWith('image')) {
            res.writeHead(400);
            res.end();
        }

        let getFile = Meteor.wrapAsync(done => {
            let chunks = [];
            req.on('readable', () => {
                chunks.push(req.read());
            });
            req.on('end', () => {
                done(undefined, Buffer.concat(chunks));
            });
        });

        console.log('grabbing from client');
        let buffer = getFile();
        console.log('done');

        let b64 = buffer.toString('base64');
        let type = req.headers['content-type'];
        let data = `data:${type};base64,${b64}`

        let id = Files.insert({ data });

        res.writeHead(200);
        res.write(JSON.stringify({id}));
        res.end();
    }
});

Files.deny({  
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

