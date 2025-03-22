require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const errorHandler = require('errorhandler')
const logger = require('morgan')
const methodOverride = require('method-override')

const app = express()
const path = require('path')
const port = 3000

const Prismic = require('@prismicio/client')

const client = Prismic.createClient(process.env.PRISMIC_ENDPOINT, {accessToken: process.env.PRISMIC_ACCESS_TOKEN})

const handleLinkResolver = doc => {
//	if(doc.type === 'product') {
//		return '/detail/' + doc.slug
//	}
//	
//	if(doc.type === 'about') {
//		return '/about'
//	}
//	
//	if(doc.type === 'collections') {
//		return '/collections'
//	}
//	
	return '/'
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(errorHandler())
app.use(logger('dev'))
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
	res.locals.Link = handleLinkResolver
	res.locals.Prismic = Prismic
	
	next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const handleRequest = async api => {
	const meta = await client.getSingle('meta')
	
	return {
		meta,
	}
}

app.get('/', async (req, res) => {
	const defaults = await handleRequest(client)
	const home = await client.getSingle('home')
	
	res.render('pages/home', {
		...defaults,
		home
	})
})

//app.get('/collections', async (req, res) => {
//	const defaults = await handleRequest(client)
//	const colors = await client.getSingle('collections')
//	const collections = await client.getAllByType('collection', {
//		fetchLinks: 'product.image'
//	})
//	const home = await client.getSingle('homepage')
//	
//	res.render('pages/collections', {
//		...defaults,
//		colors,
//		collections,
//		home
//	})
//})
//
//app.get('/detail/:uid', async (req, res) => {
//	const defaults = await handleRequest(client)
//	const product = await client.getByUID('product', req.params.uid, {
//		fetchLinks: 'collection.title'
//	})
//	const home = await client.getSingle('homepage')
//	
//	res.render('pages/detail', {
//		...defaults,
//		product,
//		home
//	})
//})

app.listen(port, () => {
  console.log('Example app listening at http://localhost:' + port)
})