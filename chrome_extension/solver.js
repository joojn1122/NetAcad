  function solveQuestion()
  {

    // let url = "https://fakeGoogleTranslator.joojn.repl.co"
    // let url = "http://localhost:3000"
    let url = "http://gogletranslator.ddns.net"    

    this.question = document.querySelector(".question:not(.hidden)")

    this.fieldSet = this.question.querySelector(".questionFieldset")

    if(this.fieldSet === null)
    {
      this.questionText = this.question.querySelector("textformat").textContent
    }
    else
    {
      this.questionText = this.fieldSet.querySelector(".questionText > .mattext").textContent
    }
    
    console.log("Searching for answer!")

    fetch(`${url}/api?q=${encodeURIComponent(this.questionText)}`,{ method : 'GET'
      }).then(res => res.json())
        .then(json => {
          if(json['data'] === null) 
            {
              console.log("Answer not found! L")
              return;
            }

          if(json['data'] === "image")
          {
            let imageContent = this.question.querySelector(".questionImageContent");

            if(imageContent === null)
            {
              imageContent = document.createElement("div")
              imageContent.classList.add("questionImageContent")

              this.question.appendChild(imageContent)
            }

            for(let image of json['images'])
            {
              // remove childs
              imageContent.innerHTML = ""

              let img = document.createElement("img")
              img.src = image

              imageContent.appendChild(img)
            }

            return;
          }

          this.data = json['data']

          console.log("Answer found " + this.data);

          this.clickAnswers = this.fieldSet.querySelectorAll(".coreContent > li")

          for(let an of this.clickAnswers)
          {
            try
            {
              let el = an.querySelector("label")

              let text = el.querySelector(".mattext").textContent
              let checkBox = el.querySelector("input")

              for(let dat of this.data)
                {
                  let strDat = dat.replaceAll(" ", "").toLowerCase().replaceAll("\n", "")
                  let strText = text.replaceAll(" ", "").toLowerCase().replaceAll("\n", "")

                  if(strDat == strText)
                   {
                    console.log("Found answer -> clicking")

                    checkBox.checked = true
                  }
                }
            } 
            
            catch (ignored){

            }
          }
    });

  }


function setup(){
    /*let button = document.createElement("button")
    button.id = "insane_id";

    document.body.appendChild(button)

    button.addEventListener('click', solveQuestion)*/

    document.addEventListener("keypress", (e) => {
      if(e.key.toLowerCase() === "l")
      {
        solveQuestion()
      }
    })
}

setup()
