const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://dongeun:qw74067406!@cluster0.fcugh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.static('public'))
app.use(bodyParser.json()) 
app.listen(3000, function() {
	console.log('listening on 3000')
});
MongoClient.connect(url, {
	useUnifiedTopology: true
} , function(err, database) {
	if(err) {
		console.error("MongoDB 연결 실패", err);
		return;
	}

	console.log("Connected to Database")
	const db = database.db('test')
    const quotesCollection = db.collection('quotes')

	// app.use , app.get , app.post, app.listen 사용해서 db작업!
	app.set('view engine', 'ejs');
	// body-parser
	app.use(bodyParser.urlencoded({ extended: true }));

	app.post('/quotes', (req, res) => {
		quotesCollection.insertOne(req.body)
		.then(result => {
			res.redirect('/')
		})
		.catch(error => console.error(error))
	});

// sendFile method를 통해 index.html파일로 연결하자
	app.get('/', (req, res) => {
		// res.sendFile(__dirname + '/index.html')
		const cursor = db.collection('quotes').find().toArray()
    	.then(results => {
            res.render('index.ejs', { quotes: results })
        })
    	.catch(error => console.error(error))
	})
	app.put('quotes', (req, res) => {
		quotesCollection.findOneAndUpdate(
			{name: ''},
			{
				$set: {
					name: req.body.name,
					quote: req.body.quote
				}
			},
			{
				// 우리가 찾는 쿼리가 없을 경우 setting값을 quotes에 추가한다
				upsert: true
			}
			.then( result => {
			console.log(result)
			} )
			.catch( error => console.error(error))

		)
	})
});
