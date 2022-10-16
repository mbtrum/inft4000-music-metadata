//
//Important notes
//
// npm install music-metadata@7.13.0
//
// In Electron .html, include the below security-policy. This will allow you to use a data source for the <img> html element.
//     <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; script-src 'self'">

const mm = require('music-metadata')
const url = require('url')
const path = require('path')

//
// Functions
//

// async function to get the music file's metadata
async function AsyncGetMusicMetadata(file) {
    try {        
        const fileMetadata = await mm.parseFile(file);
        return fileMetadata
    } catch (error) {
        return console.error('An error was encountered==' + error.message);
    }
}

// function to validate file type as a music file
const IsMusicFile = (filepath) => {
    const types = ['.mp3', '.wav', '.ogg']
    const ext = path.extname(filepath)
    
    if (types.includes(ext))
    {
        return true
    }
    else{
        return false
    }
}

//
// Get Music File Metadata
//

const filePath = "C:\\Users\\W0304263\\Music\\Radiohead\\Ok Computer\\01 Airbag.mp3"

if(IsMusicFile(filePath)){
    AsyncGetMusicMetadata(filePath).then(
        function(value){
            const metadata = value

            if(value) {
                const picture = mm.selectCover(metadata.common.picture)

                const track = {
                    title: metadata.common.title,
                    album: metadata.common.album,
                    artist: metadata.common.artist,
                    duration: Math.round(metadata.format.duration),
                    picture: picture ? picture.data.toString('base64') : "",
                    pictureFormat: picture ? picture.format : "",
                    fileURL: url.pathToFileURL(filePath).href
                }

                console.log(track)
            }
        })
}