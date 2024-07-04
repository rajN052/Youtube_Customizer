const GEMINI_API_KEY = "AIzaSyAd6jjawnezefQUPwOUCz_WgdqwXxiDY88";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;



chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if (details.url==="https://www.youtube.com/") {
      chrome.storage.sync.get(['keyword'], function(result) {
        let keyword = result.keyword || ""; // Default to empty string if no keyword is saved
  
        if (keyword) {
          let searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`;
          chrome.tabs.update(details.tabId, { url: searchUrl });
        }
      });
    }
    else if(details.url.startsWith("https://www.youtube.com/results?search_query"))
    {
      var allowed =true;
      let query = details.url.substring(45);
      chrome.storage.sync.get(['keyword'], function(result) {
        let keyword = result.keyword || ""; // Default to empty string if no keyword is saved
        if (keyword ) {

          fetch(GEMINI_API_URL, {
            method: "POST",
            body: JSON.stringify({
                contents: [{
                    parts:[{
                         text: "is "+query+" related to studies and"+keyword+" ?,say no if you dont understand what"+query+"is. Answer yes or no and nothing else."
                    }]
                }]
            }),
        })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            let result1 = result["candidates"][0]["content"]["parts"][0]["text"];
            console.log(result1+" "+query);
          //  alert(result1);

            if(result1) 
              {
                    if(result1.substring(0,2).toLowerCase()==='no')
                      {
                      //  alert("Nah uh , youre supposed to study");
                        let searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`;
                        chrome.tabs.update(details.tabId, { url: searchUrl });
                        alert("Nah uh , youre supposed to study");
                      }
                      else 
                      {
                        
                      }
                    
              }
            });
           
          }   
        });
      }
    });







    // chrome.webNavigation.onReferenceFragmentUpdated.addListener(function(details) {
    //   if (details.url==="https://www.youtube.com/") {
    //     chrome.storage.sync.get(['keyword'], function(result) {
    //       let keyword = result.keyword || ""; // Default to empty string if no keyword is saved
    
    //       if (keyword) {
    //         let searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`;
    //         chrome.tabs.update(details.tabId, { url: searchUrl });
    //       }
    //     });
    //   }
    //   else if(details.url.startsWith("https://www.youtube.com/results?search_query"))
    //     {
    //       var allowed =true;
    //       let query = details.url.substring(45);
    //       chrome.storage.sync.get(['keyword'], function(result) {
    //         let keyword = result.keyword || ""; // Default to empty string if no keyword is saved
    //         if (keyword ) {
    
    //           fetch(GEMINI_API_URL, {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 contents: [{
    //                     parts:[{
    //                       text: "is "+query+" related to studies and"+keyword+" ,?say no if you dont understand what"+query+"is. Answer yes or no and nothing else."
    //                     }]
    //                 }]
    //             }),
    //         })
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((result) => {
    //             let result1 = result["candidates"][0]["content"]["parts"][0]["text"];
    //             console.log(result1);
    //           //  alert(result1);
    
    //             if(result1) 
    //               {
    //                     if(result1.substring(0,2).toLowerCase()==='no')
    //                       {
    //                       //  alert("Nah uh , youre supposed to study");
    //                         let searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`;
    //                         chrome.tabs.update(details.tabId, { url: searchUrl });
    //                         alert("Nah uh , youre supposed to study");
    //                       }
    //                       else 
    //                       {
                            
    //                       }
                        
    //               }
    //             });
               
    //           }   
    //         });
    //       }
    // });


    chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
      if (details.url==="https://www.youtube.com/") {
        chrome.storage.sync.get(['keyword'], function(result) {
          let keyword = result.keyword || ""; // Default to empty string if no keyword is saved
    
          if (keyword) {
            let searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`;
            chrome.tabs.update(details.tabId, { url: searchUrl });
          }
        });
      }
      else if(details.url.startsWith("https://www.youtube.com/results?search_query"))
      {
        var allowed =true;
        let query = details.url.substring(45);
        chrome.storage.sync.get(['keyword'], function(result) {
          let keyword = result.keyword || ""; // Default to empty string if no keyword is saved
          if(query.toLowerCase() === keyword.toLowerCase())
            {
              return;
            }
          if (keyword ) {
  
            fetch(GEMINI_API_URL, {
              method: "POST",
              body: JSON.stringify({
                  contents: [{
                      parts:[{
                          text: "is "+query+" related to studies and"+keyword+"?.Answer yes or no and nothing else."
                      }]
                  }]
              }),
          })
          .then((response) => {
              return response.json();
          })
          .then((result) => {
              let result1 = result["candidates"][0]["content"]["parts"][0]["text"];
              console.log(result1+" "+query);
            //  alert(result1);
  
              if(result1) 
                {
                      if(result1.substring(0,2).toLowerCase()==='no')
                        {
                         // alert("Nah uh , youre supposed to study");
                          let searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`;
                          if(keyword!==query) 
                            {
                              chrome.tabs.update(details.tabId, { url: searchUrl });
                              alert("Nah uh , youre supposed to study   "+keyword+" ");
                            }
                          
                        }
                        else 
                        {
                          
                        }
                      
                }
              });
             
            }   
          });
        }
      });
  













