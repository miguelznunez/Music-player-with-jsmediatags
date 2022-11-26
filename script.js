const upload = document.querySelector("#upload")
const audio = document.querySelector("#audio")
const source = document.querySelector("#src")

upload.addEventListener("change", (event) => {
  const file = event.target.files[0]
  accessMetadata(file)
  source.src = URL.createObjectURL(file)
  audio.load()
})

function accessMetadata(file) {
  jsmediatags.read(file, {
    onSuccess: function(tag) { 
    try{ 
      const data = tag.tags.picture.data
      const format = tag.tags.picture.format
      let base64String = ""
      for (let i = 0; i < data.length; i++) {
          base64String += String.fromCharCode(data[i])
      }
      displayMetadata(`url(data:${format};base64,${window.btoa(base64String)})`, tag.tags.title, tag.tags.artist, tag.tags.album)
    }catch(error){
      displayMetadata("url(music.jpg)", upload.value.split(/(\\|\/)/g).pop(), "Unknown", "Unknown")
    }
  },
  onError: function(error) {
    displayMetadata("url(music.jpg)", upload.value.split(/(\\|\/)/g).pop(), "Unknown", "Unknown")
  }
  })
}

function displayMetadata(cover, title, artist, album){
  document.querySelector("#cover").style.backgroundImage = cover
  document.querySelector("#title").textContent = title
  document.querySelector("#artist").textContent = artist
  document.querySelector("#album").textContent = album
}
