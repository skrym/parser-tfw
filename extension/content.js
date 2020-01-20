// Create parse block
let parseBlock = document.createElement('div')
parseBlock.setAttribute('id', 'parseBlock')
parseBlock.style.cssText = `position: fixed;
  bottom: 10px;
  z-index: 999999;
  right: 10px;`

// Create button
let btn = document.createElement('button')
btn.innerHTML = "GO!"
btn.style.cssText = `font-size: 24px;
  background: #4a9d92;
  color: white;
  width: 72px;
  border: 0;
  height: 72px;
  border-radius: 50%;
  cursor: pointer;`
btn.setAttribute('id', 'parseBtn')

// Create parse field
let testName = document.createElement('input')
testName.setAttribute('id', 'testName')
testName.setAttribute('placeholder', 'Enter test name')
testName.style.cssText = `line-height: 32px;
  margin-right: -16px;
  background: #4a9d921f;
  border: 0;
  padding: 8px;`

// Add elements to page
parseBlock.append(testName)
parseBlock.append(btn)
document.body.append(parseBlock)

const selectors = {
  questions: '.cont.question',
  question: '.questionName',
  asset: '.test_question img',
  variants: '.answers .line label',
  correct: '.answers .line label.success',
  decision: '.decision .content'
}

let btnAct = document.getElementById('parseBtn')

btnAct.addEventListener('click', () => {
  if (testName.value.length < 3)
    return alert('Enter the name test for downloading. Use test level and test number for it')

  // Find all questions on the page
  let questions = document.querySelectorAll(selectors.questions)
  let arrQ = []

  questions.forEach(async (q, i) => {

    let question = gatherQInfo(q, i)
    arrQ.push(question)
  })
  sendQuestion(arrQ)
})

// download image
const downloadAsset = (img, name, interval) => {
  let imgLink = img.getAttribute('src')
  let imgUrl = document.location.origin + imgLink
  let imgEl = document.createElement('a')
  imgEl.setAttribute('href', imgUrl)
  imgEl.setAttribute('download', name)
  setTimeout(() => imgEl.click(), 500 * interval)
}

// send parsed Question to server
const sendQuestion = question => fetch('http://localhost:5050/q', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(question)
})
  .then(res => console.log(res))
  .catch(err => console.log(err))

// gather
const gatherQInfo = (q, i) => {
  // Create question object
  let question = {}
  // get questions text
  q.querySelector(selectors.question + ' .title').remove()
  question.qText = q.querySelector(selectors.question).textContent
  // get asset (img)
  let asset = q.querySelector(selectors.asset)
  let imgName = `${i}-${testName.value}.png`
  downloadAsset(asset, imgName, i + 1)
  question.asset = imgName
  // get variants
  let variantsNodes = q.querySelectorAll(selectors.variants),
    variants = []
  variantsNodes.forEach(variant => variants.push(variant.textContent))
  question.variants = variants
  // get correct answer
  question.correct = q.querySelector(selectors.correct).textContent
  // get answer's decision
  question.decision = q.querySelector(selectors.decision).innerHTML
  question.decisionText = q.querySelector(selectors.decision).textContent
  return question
}