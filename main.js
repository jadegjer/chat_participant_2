// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input')
const chatboxForm = document.querySelector('.chatbox-message-form')

textarea.addEventListener('input', function () {
  let line = textarea.value.split('\n').length

  if(textarea.rows < 6 || line < 6) {
    textarea.rows = line
  }

  if(textarea.rows > 1) {
    chatboxForm.style.alignItems = 'flex-end'
  } else {
    chatboxForm.style.alignItems = 'center'
  }
})



// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle')
const chatboxMessage = document.querySelector('.chatbox-message-wrapper')

chatboxToggle.addEventListener('click', function () {
  chatboxMessage.classList.toggle('show')
})



// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle')
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu')

dropdownToggle.addEventListener('click', function () {
  dropdownMenu.classList.toggle('show')
})

document.addEventListener('click', function (e) {
  if(!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
    dropdownMenu.classList.remove('show')
  }
})







// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content')
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message')

chatboxForm.addEventListener('submit', function (e) {
  e.preventDefault()

  if(isValid(textarea.value)) {
    writeMessage()
    setTimeout(autoReply, 1000)
  }
})



function addZero(num) {
  return num < 10 ? '0'+num : num
}

function writeMessage() {
  const today = new Date()
  let message = `
    <div class="chatbox-message-item sent">
      <span class="chatbox-message-item-text">
        ${textarea.value.trim().replace(/\n/g, '<br>\n')}
      </span>
      <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
    </div>
  `
  chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
  chatboxForm.style.alignItems = 'center'
  textarea.rows = 1
  textarea.focus()
  textarea.value = ''
  chatboxNoMessage.style.display = 'none'
  scrollBottom()
}

// Initialize the index to 0
let autoReplyIndex = 0;

function autoReply() {
    const today = new Date();
    const autoReplyMessages = [
        "well that's a strange way to start, but i'm a 61 year old white male",
        "so did you get the article about the grant?",
        "I dont know about you but i'm so glad they are testing that. I’ve always thought race is a social construction. it seems obvious to me, but I think having some solid proof will be really great. which part of the article did you like best?",
        "personally, i think the part about races changing with the political climate makes a lot of sense. we get races from whats going on in the world, just like everything else. i wish the article had said that too. did you have any edits for the article?", 
        "AUTOMATED MESSAGE: PARTICIPANT 2 HAS LEFT THE CHAT. PLEASE MOVE TO NEXT QUESTION"
        // Add more auto-reply messages as needed
    ];

    // Check if there are more messages to send
    if (autoReplyIndex < autoReplyMessages.length) {
        // Select the next message in sequence
        const message = autoReplyMessages[autoReplyIndex];

        // Increment the index for the next message
        autoReplyIndex++;

        // Calculate delay based on the length of the message
        const messageDelay = message.length * 100 + 200; // Adjust the multiplier as needed

        // Set timeout to send the message after the calculated delay
        setTimeout(function() {
            let messageHTML = `
                <div class="chatbox-message-item received">
                    <span class="chatbox-message-item-text">
                        ${message}
                    </span>
                    <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
                </div>
            `;
            chatboxMessageWrapper.insertAdjacentHTML('beforeend', messageHTML);
            scrollBottom();
        }, messageDelay);
    }
}

function scrollBottom() {
  chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
}

function isValid(value) {
  let text = value.replace(/\n/g, '')
  text = text.replace(/\s/g, '')

  return text.length > 0
}
