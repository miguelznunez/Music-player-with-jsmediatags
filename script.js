const upload = document.querySelector("#upload")
const audio = document.querySelector("#audio")
const source = document.querySelector("#src")

upload.addEventListener("change", (event) => {
  const files = event.target.files
  const file = event.target.files[0]
  accessMediaTags(file)
  source.src = URL.createObjectURL(files[0])
  audio.load()
})

function accessMediaTags(file) {
  jsmediatags.read(file, {
    onSuccess: function(tag) { 
    try{ 
      const data = tag.tags.picture.data
      const format = tag.tags.picture.format
      let base64String = ""
      for (let i = 0; i < data.length; i++) {
          base64String += String.fromCharCode(data[i])
      }
      displayMediaTags('url(data:'+format+';base64,'+window.btoa(base64String)+')', tag.tags.title, tag.tags.artist, tag.tags.album)
    }catch(error){
      displayMediaTags('url(music.jpg)', `${document.getElementById("songUpload").value.split(/(\\|\/)/g).pop()}`, 'Unknown', 'Unknown')
    }
  },
  onError: function(error) {
    displayMediaTags('url(music.jpg)', `${document.getElementById("songUpload").value.split(/(\\|\/)/g).pop()}`, 'Unknown', 'Unknown')
  }
  })
}

function displayMediaTags(cover, title, artist, album){
  document.getElementById("cover").style.backgroundImage = cover
  document.getElementById("title").textContent = title
  document.getElementById("artist").textContent = artist
  document.getElementById("album").textContent = album
}
