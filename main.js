const hamburgerBtn = document.getElementById('hamburger_btn')
const header = document.querySelector('header')
const navList = document.querySelector('header nav ul')
const closeBtn = document.getElementById('close_btn')
const selectRewardBtns = document.querySelectorAll('.select_reward_btn')
const amountToBeBackedText = document.querySelector('.amount-to-be-backed')
const currentAmountText = document.querySelector('.current-amount')
const totalBackersText = document.querySelector('.total-backers')
const daysLeftText = document.querySelector('.days-left')
const loader = document.getElementById('loader')
const cancelBtn = document.querySelector('.select-cancel-btn')
const bookmarkBtn = document.querySelector('.bookmark_btn')

const bambooText = document.querySelectorAll('.bamboo-text')
const blackText = document.querySelectorAll('.black-text')
const mahoganyText = document.querySelectorAll('.mahogany-text')
const projectBackingSection = document.querySelector('.project_backing_section')
const thanksModal = document.querySelector('.thanks_modal')
const thanksModalBtn = document.querySelector('.thanks_modal button')
const backProjectBtn = document.querySelector('.back_project_btn')
const bgCover = document.querySelector('.cover')





let amountToBeBacked = 100000
let currentAmount = 0
let totalBackers = 0
const daysLeft  = 100
let bambooNumber = 101
let blackNumber = 65
let mahoganyNumber = 20

const radioBtns = document.querySelectorAll('input[type="radio"]')
const continueBtns = document.querySelectorAll('.fill_pledge_container_input  button')

loadLocalStorage()

function loaderUpdate() {
    let percentage = (currentAmount/amountToBeBacked) * 100
    
    loader.style.width = `${percentage}%`
}

const options = {
    rootMargin: "-100px 0px 0px 0px"
}

const observer = new IntersectionObserver(function(entries,observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            header.style.backgroundColor = "hsla(176, 72%, 28%, 1)"
        } else {
            header.style.backgroundColor = "transparent" 
        }
    })
},options)

const heroImage = document.querySelector('picture')
observer.observe(heroImage)


function updateValues () {
    amountToBeBackedText.textContent = amountToBeBacked
currentAmountText.textContent = currentAmount
totalBackersText.textContent = totalBackers
daysLeftText.textContent = daysLeft
bambooText.forEach(text => {
    text.textContent = bambooNumber
})
blackText.forEach(text => {
    text.textContent = blackNumber
})
mahoganyText.forEach(text => {
    text.textContent = mahoganyNumber
})
checkIfZero()
saveToLocalStorage()
loaderUpdate()
}

updateValues()

backProjectBtn.addEventListener('click', (e) => {
    projectBackingSection.style.display = "block"
    bgCover.style.display = "block"
})

thanksModalBtn.addEventListener('click', (e) => {
    thanksModal.style.display = "none"
    bgCover.style.display = "block"
    bgCover.style.display = "none"
})

hamburgerBtn.addEventListener('click', (e) => {
    navList.style.display = "block"
    hamburgerBtn.style.display = "none"
    closeBtn.style.display = "block"
})

closeBtn.addEventListener('click', (e) => {
    navList.style.display = "none"
    hamburgerBtn.style.display = "block"
    closeBtn.style.display = "none"
    
})

cancelBtn.addEventListener('click', () => {
    projectBackingSection.style.display = "none"
    bgCover.style.display = "none"
})

bookmarkBtn.addEventListener('click', () => {
    if (bookmarkBtn.classList.contains('active')) {
        bookmarkBtn.classList.remove('active')
    } else {
        bookmarkBtn.classList.add('active')
    }
})


selectRewardBtns.forEach(selectRewardBtn => {
   selectRewardBtn.addEventListener('click', () => {
       projectBackingSection.style.display = "block"
       bgCover.style.display = "block"
       const rewardType = selectRewardBtn.getAttribute('data-content') 
       let selectedRadio = document.querySelector(`input[type="radio"][value="${rewardType}"]`)
       selectedRadio.checked = true
    console.log(selectedRadio)
    selectedRadio.dispatchEvent(new Event('change'))
   })
    
}) 

radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener('change', (e) => {
        if (radioBtn.disabled === true) {
            return
        }
        let fillPledgeContainers = document.querySelectorAll('.fill_pledge_container')
        fillPledgeContainers.forEach(fillPledgeContainer => {
            fillPledgeContainer.classList.remove('fill-pledge-active')
        })
        let value = e.target.value
        let pledgeContainer = e.target.closest('article')
        let fillPledgeContainer = pledgeContainer.querySelector('.fill_pledge_container')
    fillPledgeContainer.classList.add('fill-pledge-active')
    })
})


continueBtns.forEach(continueBtn => {
    continueBtn.addEventListener('click', (e) => {
        let wrapper = continueBtn.parentElement
        let card = wrapper.closest('article')
        let radio = card.querySelector('input[type="radio"]')
        let radioValue = radio.value
    
    let amountInput = wrapper.querySelector('.fill_pledge_container_input_wrapper input')
    let errorText = card.querySelector('.enter-pledge-wrapper .error-text')
    let pledgeContainer = e.target.closest('article')
        let fillPledgeContainer = pledgeContainer.querySelector('.fill_pledge_container')
    
    
    if (radioValue === "none") {
    
        if (amountInput.value.trim() === "") {
            
            
            errorText.textContent = "Enter valid amount "
            
            errorText.style.display = "block"
        } else {
            currentAmount = currentAmount + Number(amountInput.value)
    totalBackers++
    projectBackingSection.style.display = "none"
    bgCover.style.display = "none"
    amountInput.value = ""
    uncheckBtns()
    updateValues()
        }
    }
    
    if (radioValue === "bamboo") {
        if (amountInput.value.trim() === "") {
            errorText.textContent = "Enter valid amount "
            
            errorText.style.display = "block"
        } else if (amountInput.value < 25) {
            errorText.textContent = "Amount cannot be less than $25"
            
            errorText.style.display = "block"
        } else {
            currentAmount = currentAmount + Number(amountInput.value)
    totalBackers++
    bambooNumber--
    projectBackingSection.style.display = "none"
    bgCover.style.display = "none"
    amountInput.value = ""
    uncheckBtns()
    updateValues()
        }
    }
    
    if (radioValue === "black") {
        if (amountInput.value.trim() === "") {
            errorText.textContent = "Enter valid amount "
            
            errorText.style.display = "block"
        } else if (amountInput.value < 75) {
            errorText.textContent = "Amount cannot be less than $75"
            
            errorText.style.display = "block"
        } else {
            currentAmount = currentAmount + Number(amountInput.value)
    totalBackers++
    blackNumber--
    projectBackingSection.style.display = "none"
    bgCover.style.display = "none"
    amountInput.value = ""
    uncheckBtns()
    updateValues()
        }
    }
    
    if (radioValue === "mahogany") {
        if (amountInput.value.trim() === "") {
            errorText.textContent = "Enter valid amount "
            
            errorText.style.display = "block"
        } else if (amountInput.value < 200) {
            errorText.textContent = "Amount cannot be less than $200"
            
            errorText.style.display = "block"
        } else {
            currentAmount = currentAmount + Number(amountInput.value)
    totalBackers++
    mahoganyNumber--
    projectBackingSection.style.display = "none"
    bgCover.style.display = "none"
    amountInput.value = ""
    uncheckBtns()
    updateValues()
        }
    }
    
    
    
    })
})


function uncheckBtns() {
    radioBtns.forEach(radioBtn => {
        radioBtn.checked = false
    })
    thanksModal.style.display = "block"
    bgCover.style.display = "block"
}


function saveToLocalStorage() {
    localStorage.setItem('currentAmount', currentAmount)
    localStorage.setItem('totalBackers', totalBackers)
    localStorage.setItem('bambooNumber', bambooNumber)
    localStorage.setItem('blackNumber', blackNumber)
    localStorage.setItem('mahoganyNumber', mahoganyNumber)
}

function loadLocalStorage() {
    const savedCurrentAmount = localStorage.getItem('currentAmount')
    const savedTotalBackers = localStorage.getItem('totalBackers')
    const savedBambooNumber = localStorage.getItem('bambooNumber')
    const savedBlackNumber = localStorage.getItem('blackNumber')
    const savedMahoganyNumber = localStorage.getItem('mahoganyNumber')
    
    if (savedCurrentAmount !== null) {
        currentAmount = Number(savedCurrentAmount)
    }
    if (savedTotalBackers !== null) {
        totalBackers = Number(savedTotalBackers)
    }
    if (savedBambooNumber !== null) {
        bambooNumber = Number(savedBambooNumber)
    }
    if (savedBlackNumber !== null) {
        blackNumber = Number(savedBlackNumber)
    }
    if (savedMahoganyNumber !== null) {
        mahoganyNumber = Number(savedMahoganyNumber)
    }
    loaderUpdate()
}

function checkIfZero() {
    let bambooRadioBtn = document.querySelector('input[type="radio"][value="bamboo"]')
    let blackRadioBtn = document.querySelector('input[type="radio"][value="black"]')
    let mahoganyRadioBtn = document.querySelector('input[type="radio"][value="mahogany"]')
    
    const bambooSelectBtn = document.querySelector('.select_reward_btn[data-content="bamboo"]')
    const blackSelectBtn = document.querySelector('.select_reward_btn[data-content="black"]')
    const mahoganySelectBtn = document.querySelector('.select_reward_btn[data-content="mahogany"]')
    
    
    if (bambooNumber <= 0) {
        bambooRadioBtn.disabled = true
        bambooSelectBtn.disabled = true
        bambooSelectBtn.textContent = "Out of Stock"
        bambooSelectBtn.style.backgroundColor = "gray"
        let radioArticle = bambooRadioBtn.closest('article')
        let selectArticle = bambooSelectBtn.closest('.pledge')
        radioArticle.style.opacity = '0.5'
        selectArticle.style.opacity = '0.5'
    }
    
    if (blackNumber <= 0) {
        blackRadioBtn.disabled = true
        blackSelectBtn.disabled = true
        blackSelectBtn.textContent = "Out of Stock"
        blackSelectBtn.style.backgroundColor = "gray"
        let radioArticle = blackRadioBtn.closest('article')
        let selectArticle = blackSelectBtn.closest('.pledge')
        radioArticle.style.opacity = '0.5'
        selectArticle.style.opacity = '0.5'
    }
    
    if (mahoganyNumber <= 0) {
        mahoganyRadioBtn.disabled = true
        mahoganySelectBtn.disabled = true
        mahoganySelectBtn.textContent = "Out of Stock"
        mahoganySelectBtn.style.backgroundColor = "gray"
        let radioArticle = mahoganyRadioBtn.closest('article')
        let selectArticle = mahoganySelectBtn.closest('.pledge')
        radioArticle.style.opacity = '0.5'
        selectArticle.style.opacity = '0.5'
    }
}