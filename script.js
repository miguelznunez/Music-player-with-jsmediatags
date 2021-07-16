const mediaTags = document.querySelector('#media-tags');
var input = document.querySelector('input');
var songUpload = document.querySelector('#songUpload');

songUpload.addEventListener("change", (event) => {
    var files = event.target.files;
    document.getElementById("src").setAttribute("src", URL.createObjectURL(files[0]));
    document.getElementById("audio").load();
})

input.addEventListener("change", (event) => {
  var file = event.target.files[0];
  jsmediatags.read(file, {
    onSuccess: function(tag) { 
    try{ 
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;

      let base64String = "";
      for (let i = 0; i < data.length; i++) {
          base64String += String.fromCharCode(data[i]);
      }
      document.getElementById("img").setAttribute('src', `data:${format};base64,${window.btoa(base64String)}`);
      document.getElementById("img").style.display = 'block';
      document.getElementById("artist").textContent = tag.tags.artist;
      document.getElementById("title").textContent = tag.tags.title;
      document.getElementById("album").textContent = tag.tags.album;
      document.getElementById("genre").textContent = tag.tags.genre;
    }catch(error){
      console.log(error);
      document.getElementById("img").setAttribute('src', '');
      document.getElementById("img").style.display = 'none';
      document.getElementById("artist").textContent = `${document.getElementById("songUpload").value.split(/(\\|\/)/g).pop()}`;
      document.getElementById("title").textContent = 'Unknown';
      document.getElementById("album").textContent = 'Unknown';
      document.getElementById("genre").textContent = 'Unknown';
    }
    
  },
  onError: function(error) {
    console.log(error);
    document.getElementById("img").setAttribute('src', '');
    document.getElementById("img").style.display = 'none';
    document.getElementById("artist").textContent = `${document.getElementById("songUpload").value.split(/(\\|\/)/g).pop()}`;
    document.getElementById("title").textContent = 'Unknown';
    document.getElementById("album").textContent = 'Unknown';
    document.getElementById("genre").textContent = 'Unknown';
  }
  })
})

