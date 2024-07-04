const GEMINI_API_KEY = "AIzaSyAd6jjawnezefQUPwOUCz_WgdqwXxiDY88";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['keyword'], function(result) {
        if (result.keyword) {
            document.getElementById('keywordInput').value = result.keyword;
        }
    });

    document.getElementById('saveButton').addEventListener('click', function() {
        var keyword = document.getElementById('keywordInput').value;
        isValidRequest(keyword)
            .then(result => {
                if (result === 'yes') {
                    chrome.storage.sync.set({ 'keyword': keyword }, function() {
                        console.log("Value is saved");
                    });
                } else {
                  alert("Please enter a topic related to studies")
                    console.log("Request is not valid");
                }
            })
            .catch(error => {
                console.error("Error in isValidRequest:", error);
            });
    });
});

function isValidRequest(str) {
    return new Promise((resolve, reject) => {
        fetch(GEMINI_API_URL, {
            method: "POST",
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "is " + str + " related to academical studies and not explicit, say yes or no and nothing else."
                    }]
                }]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            let result1 = result["candidates"][0]["content"]["parts"][0]["text"];
            console.log(result1);
            resolve(result1);
        })
        .catch(error => {
            console.error('Error in fetch operation:', error);
            reject(error);
        });
    });
}
