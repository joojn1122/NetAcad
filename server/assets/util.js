const HTMLParser = require('node-html-parser');
const fetch = require("sync-fetch")

let get_src = (element) => {

	// (src=")*(")   / - start regex 	 /i - end regex
    let regex = /(?<=src=")(.*?)(?=")/i
    let find = element.rawAttrs.match(regex)

    return find === null ? null : find[0]

}

let get_href = (element) => {

	let regex = /(?<=href=")(.*?)(?=")/i

    let find = element.rawAttrs.match(regex)

    return find === null ? null : find[0]
}

// web pages
let parseWeb = (url, elementName) => {
	try{
		const html = fetch(url, {
          headers : {
            "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"
          }
        }).text()

			let root = HTMLParser.parse(html)
	  	
	    let answerCont = root.querySelector(elementName)
	    
	    if(answerCont == null)
	    {
	    	return { data : null }
	    }
	    
	    let uls = answerCont.querySelectorAll("ul")
	    let imgs = answerCont.querySelectorAll("img")


	    if(uls.length > 0)
	    {
				let answers = []

				for(let ul of uls)
				{
					for(let answer of ul.querySelectorAll("span"))
			    {
			       answers.push(answer.text)
			    }
				}
		  
		    return {
		    	data : answers
		    }
	    }
	    
	    // image
	    else if(imgs.length > 0)
	    {
	    	let srcs = [];

	    	for(let image of imgs)
	    	{
	    		let src = get_src(image)

	    		if(src != null) srcs.push(src)
	    	}

	    	return {
	    		data : "image",
	    		images : srcs
	    	}
	    }
	    else
	    {
	    	return {
	    		data : null
	    	}
	    }
	    
	} 
	catch(e)
	{
		console.log(e)
		return {
			data : null
		}
	}

	return {
		data : null
	}
}

// export
module.exports.parseWeb = parseWeb
module.exports.get_href = get_href
module.exports.get_src = get_src
