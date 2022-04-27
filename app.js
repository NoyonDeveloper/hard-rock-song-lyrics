document.getElementById("serch-btn").addEventListener("click", function () {
    const searchField = document.getElementById("search-field").value;
    fetch(`https://api.lyrics.ovh/suggest/${searchField}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("song-container").innerHTML = '';
            for (let i = 0; i < data.data.length; i++) {
                const song = data.data[i];
                const songTitle = song.title;
                const songArtist = song.artist.name;
                const previewVoice = song.preview;
                document.getElementById("song-container").innerHTML += `
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 id="songTitle" class="lyrics-name">${songTitle}</h3>
                        <p id="songArtist" class="author lead">Album by <span>${songArtist}</span></p>
                        <audio controls>
                            <source src="${previewVoice}" type="audio/mpeg">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onClick="getLyric('${songArtist}', '${songTitle}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>`;
            }
        })
        .catch(error => "Song Undefined")
})
function getLyric(names, title) {
    fetch(`https://api.lyrics.ovh/v1/${names}/${title}`)
        .then(res => res.json())
        .then(data => {
            if (data.lyrics == undefined) {
                document.getElementById("song-lyrics").innerText = "Sorry Song Undefined";
            } else {
                document.getElementById("song-lyrics").innerHTML = `<div><pre>${data.lyrics}</pre></div>`;
            }
        })
}