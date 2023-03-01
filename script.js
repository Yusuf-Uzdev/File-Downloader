const fileInput = document.querySelector("input"),
donloadBtn = document.querySelector("button");


// to show image of downloading file 
fileInput.addEventListener("input", e => {
    document.querySelector(".preview-img img").src = e.target.value;
});

donloadBtn.addEventListener("click", e => {
    e.preventDefault(); // prevent form from submitting
    fetchFile(fileInput.value);
    donloadBtn.innerText = "Downloading file..."
})

function fetchFile(url) {
    // fetching file and returning response as blob
    fetch(url).then(res => res.blob()).then(file => {
        // URL.createObjectURL creates a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a")
        aTag.href = tempUrl; // passing temp url as href value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/,''); // passing filename as download value of<a> tag
        document.body.appendChild(aTag); //adding a tag inside the body

        aTag.click(); // clicking a tag so the file download
        aTag.remove(); // removing a tag once file downloaded
        URL.revokeObjectURL(tempUrl); // removing tempurl from document
        donloadBtn.innerText = "Download file"
    }).catch(() =>{
        donloadBtn.innerText = "Download file"
        alert("Failed to download file!... Please put valid Url")
    })
}