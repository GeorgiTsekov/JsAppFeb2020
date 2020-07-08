function attachEvents() {
    const messages = document.getElementById('messages');
    const autorInput = document.getElementById('author');
    const contentInput = document.getElementById('content');

    function sendMessages() {
        const author = autorInput.value;
        const content = contentInput.value;

        const headers = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author, content })
        };

        fetch(`https://rest-messanger.firebaseio.com/messanger.json`, headers)
            .then(() => {
                autorInput.value = '';
                contentInput.value = '';
                
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function refreshMessages() {
        fetch(`https://rest-messanger.firebaseio.com/messanger.json`)
            .then(res => res.json())
            .then(data => {
                messages.innerHTML = '';
                Object.entries(data)
                    .forEach(([elId, messagesData]) => {
                        const { author, content } = messagesData;
                        if (messages.textContent !== '') {
                            messages.textContent += `\n${author}: ${content}`
                        } else {
                            messages.textContent += `${author}: ${content}`
                        }
                        
                    });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return {
        sendMessages,
        refreshMessages
    }
}

let result = attachEvents();
console.log(result);