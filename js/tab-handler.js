const addTabBtn = document.querySelector('.add-tab')
const tabDirectory = document.querySelector('#tab-directory')
const tabHourInp = document.querySelector('.inp-hour')
const tabForm = document.querySelector('#tab-edit')
const tabSubmit = document.querySelector('#submit-tab-data')

const closeTabBtn = document.querySelector('.close-tab-f')

class Tab {
    constructor(time = '') {
        Tab.time = time
        Tab.teamMembers = Array(Tm)
    }
}

var activeTab = null
const tabArray = []

closeTabBtn.addEventListener('click', (e) => {
    hideTabForm()
})

addTabBtn.addEventListener('click', (e) => {
    const empty_tab = document.createElement('div')
    empty_tab.classList.add('tab')

    empty_tab.addEventListener('click', (e) => {
        if (activeTab) {
            showTabForm()
            return
        }

        activeTab = empty_tab
    })

    activeTab = empty_tab
    showTabForm()
})

tabSubmit.addEventListener('click', (e) => {
    if (activeTab == null) return;

    if (tabHourInp.value <= 0) {
        alert('Fields must not be empty!')
        return
    }

    const new_tab = new Tab()

    new_tab.time = tabHourInp.value
    activeTab.innerText = `@ ${militaryToStandardTime(new_tab.time)}`

    tabDirectory.appendChild(activeTab)
    activeTab = null

    tabArray.push(new_tab)
    fillOutTab(new_tab)

    tabHourInp.value = ''
    hideTabForm()
})


function fillOutTab(tab = Tab) {
    // filter out all TMs who do not work during the specified hour.
    const tms_copy = tmArray.filter((tm) => {
        return (timeStringToFloat(tm.start) <= timeStringToFloat(tab.time) && 
               timeStringToFloat(tm.end) >= (timeStringToFloat(tab.time) + 1))
    });
    // add found TMs to tab.teamMembers
    console.log(tms_copy);

    // populate the html with team members
}

function removeTab() {
    tabArray.splice(getArrayIndex(tabDirectory, activeTab), 1)
    activeTab.remove()
    activeTab = null
    hideTabForm()
}

function hideTabForm() {
    tabForm.style.display = 'none'
}

function showTabForm() {
    tabForm.style.display = 'flex'
}