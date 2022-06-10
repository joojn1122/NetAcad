const HTMLParser = require('node-html-parser');
const fetch = require("sync-fetch")
const util = require("./util")

const search = (query, maxResults) => {
	let html = fetch(`https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en`).text()
	let root = HTMLParser.parse(html)

	let h3s = root.querySelectorAll("h3")
	let links = []

	for(let i = 0 ; i < Math.min(maxResults, h3s.length) ; i++)
	{
		let el = h3s[i].parentNode

		let href = util.get_href(el)

		if(href != null) links.push(href.replace("/url?q=", "").split("&amp")[0])
	}

	return links
}

module.exports.search = search