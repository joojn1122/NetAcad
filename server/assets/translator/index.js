const d = document

const textInput = d.getElementById('textInput')
const divOutput = d.getElementById('outputDiv')

textInput.addEventListener('input', () => {
  waitTillStop()
})

let createImg = (src) => {

  let el = document.createElement("img")
  el.src = src
  
  //el.style.width = "100%"
  //el.style.height = "200px"

  return el
}

function search(){
  if (textInput.value == "") { return }

  var searchFor = textInput.value

  fetch(`/search?q=${encodeURIComponent(searchFor)}`,{
    method : 'GET'
  }).then(res => res.json())
    .then(json => {
      // clear images
      divOutput.innerHTML = '<textarea id="textOutput"></textarea>'
      let textOutput = d.getElementById('textOutput')

      if(json.translated !== undefined)
      {
        textOutput.value = json.translated
      }
      else
      {
        textOutput.value = ""
      }

      if(json.data == "image")
      {
          let images = json.images

          for(let image of images)
          {
            let img = createImg(image)
            divOutput.appendChild(img)
          }
      }
      else if(json.data != null)
      {
        textOutput.value += "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
        textOutput.value += json.data.join("\n\n")
      }

    });
}



function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
var waitTillStop = debounce(search, 500);