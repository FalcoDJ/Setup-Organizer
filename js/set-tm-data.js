const tmForm = document.querySelector('#tm-info-edit')
const submitData = document.querySelector("#submit-tm-data")
const tmName = document.querySelector("#tm-name")
const tmStart = document.querySelector("#tm-start")
const tmEnd = document.querySelector("#tm-end")
const tmMinor = document.querySelector("#tm-minor")

const closeBTN = document.querySelector('.close-tm-f')

class Tm {
    constructor(name, start, end, id) {
        this.nickName = name
        this.start = start
        this.end = end
        this.id = id
        this.minor = false
        this.job = ''
    }
}

var tmArray = []

var activeTm = null
var formDisplayVal = 'flex';

closeBTN.addEventListener('click', (e) => {
    hideForm()
})

submitData.addEventListener('click', (e) => {
    if (activeTm != null) {
        const index = parseInt(activeTm.innerText.split('#')[1])
        fillOutTm(tmArray[index])

        activeTm.innerText = `${tmName.value}  #${index}`

        hideForm()

        return
    }

    if ((tmName.value + tmStart.value + tmEnd.value).length <= 0) {
        alert('Fields must not be empty!')
        return
    }

    // create empty tm
    const new_tm = new Tm()
    new_tm.id = tmArray.length

    fillOutTm(new_tm)

    tmArray.push(new_tm)

    // Setup html element
    const tm_elem = createTmElement(tmName.value, new_tm.id)
    tmDirectory.appendChild(tm_elem)

    hideForm()
});

function createTmElement(name = '', id = 0) {
    const empty_tm = document.createElement('div')

    empty_tm.classList.add('box')
    empty_tm.classList.add('tm')

    empty_tm.addEventListener('click', (e) => {
        activeTm = empty_tm
        
        // fill form with TM data
        const index = parseInt(empty_tm.innerText.split('#')[1])
        tmName.value = tmArray[index].nickName
        tmStart.value = tmArray[index].start
        tmEnd.value = tmArray[index].end
        tmMinor.checked = tmArray[index].minor

        
        showForm()
    });
    
    empty_tm.innerText = `${name}  #${id}`
    
    return empty_tm
}

function showForm() {
    tmForm.style.display = formDisplayVal
    tmName.focus()
}

function hideForm() {
    tmForm.style.display = 'none'
    activeTm = null

    // clear form
    tmName.value = ''
    tmStart.value = ''
    tmEnd.value = ''
    tmMinor.checked = false
}

function fillOutTm(tm) {
    tm.nickName  = tmName.value
    tm.start = tmStart.value
    tm.end   = tmEnd.value
    tm.minor = tmMinor.checked
}

function removeTM() {
    const index = parseInt(activeTm.innerText.split('#')[1])
    
    deleteTM(index, activeTm)


    // reconfigure each element so that it has the correct number
    var i = 0
    tmDirectory.childNodes.forEach((tm) => {
        tm.innerText = `${tm.innerText.split('#')[0]}  #${i}`

        i += 1
    })

    hideForm()
}

function deleteTM(index, node) {
    tmArray.splice(index, 1)
    node.remove()
}