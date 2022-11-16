const saveBTN = document.querySelector('#save-btn')
const loadBTN = document.querySelector('#load-btn')
const fileMenu = document.querySelector('#json-grabber')

saveBTN.addEventListener('click', (e) => {
    console.log([tmArray, tabArray])
    const json = JSON.stringify(tmArray)
    download(json, 'Setup.json', '.json')
})

loadBTN.addEventListener('click', (e) => {
    fileMenu.click()
});

fileMenu.addEventListener('change', () => {

    const reader = new FileReader()
    reader.onload = (e) => {
        parseTmJSON(e.target.result)
    }

    reader.readAsText(fileMenu.files[0])
    fileMenu.files
});

function parseTmJSON(json) {
    const tm_array = []
    tmDirectory.innerHTML = ''
    Array.from(JSON.parse(json)).forEach((elem, index) => {
        const tm = new Tm()
        
        tm.nickName = elem.nickName
        tm.start = elem.start
        tm.end = elem.end
        tm.minor = elem.minor
        tm.id = index

        tm_array.push(tm)
        tmDirectory.appendChild(createTmElement(tm.nickName, index))
    });

    tmArray = tm_array
    fileMenu.value = ''
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}