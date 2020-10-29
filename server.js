var express = require('express')
var mongoose = require('mongoose')
var shorten_url = require('./models/shortUrl')
var app = express()

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  var final_url = await shorten_url.find().limit(1).sort({$natural:-1})
  res.render('index', { final_url: final_url })
})

app.post('/final_url', async (req, res) => {
  await shorten_url.create({ full: req.body.fullUrl })
  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  var shortUrl = await shorten_url.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 8080);

