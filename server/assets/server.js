const express = require('express')
const path = require('path');
const app = express();
const translate = require('translate');
const port = 3000;

const google = require('./google');
const cors = require('cors');

const util = require("./util");

const run = () => {
  // to access this site from other domains
  app.use(cors());

  app.use(express.static(path.join(__dirname, "translator")));

  let linkEntries = {
    "itexamanswers.net" : ".dwqa-question-content",
    "itexam24.com" : ".entry-content",
    "ccna7.org" : ".entry-content",
    "ccnav7.net" : ".entry-content",
    "examict.com" : ".entry-content",
   "premiumexam.net" : ".entry-content"
  }

  const getAnswers = (links) => {

    console.log(links)

    for(let link of links)
    {
      for(let url in linkEntries)
      {
        if(link.toLowerCase().indexOf(url) !== -1)
        {
          //console.log("Found at: " + url)

          let cont = linkEntries[url]
          return util.parseWeb(link, cont)
        }
      }
    }

    return {
      data : null
    }
  }


  app.get('/search' , async (req, res) => {
      let searchFor = req.query.q;

      console.log("Starting to search: " + searchFor)

      let translated = await translate(searchFor, "cs");
      
      let links = google.search(searchFor + " itexams", 10)
        
      let answers = getAnswers(links)

      answers.translated = translated

      res.json(answers)
  });

  app.get('/api' , async (req, res) => {
    let searchFor = req.query.q;

    console.log("Starting to search: " + searchFor)
    
    let links = google.search(searchFor + " itexams", 10)

    let answers = getAnswers(links)

    res.json(answers)

  });

  app.listen(port, () => {
    console.log(`HTTP Server at localhost:${port}`)
  })
}

module.exports.run = run
