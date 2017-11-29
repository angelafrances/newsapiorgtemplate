/*global $ APIKEY*/

$(document).ready(function() {
    $.ajax({
        method: "GET",
        url: "https://newsapi.org/v2/sources",
        data: { category: "technology", country: "us", language: "en", apiKey: APIKEY},
        success: function(data){
            
            if (data.status == "ok") {
                console.log(data);
                
                for (var i=0; i < data.sources.length; i++) {
                    var source = document.createElement("OPTION");
                    source.setAttribute("value", data.sources[i].id)
                    source.innerHTML = data.sources[i].name;
                    document.getElementById('selection').appendChild(source);
                }
            }
        }

 
    })
    

    $('#source').submit(function(event) {
        event.preventDefault();
        // alert(document.getElementById("selection").value);
        
        $.ajax({
            method: "GET",
            url: "https://newsapi.org/v2/top-headlines",
            data: { sources: document.getElementById('selection').value, apiKey: APIKEY},
            success: function(data2){
                
                if (data2.status == "ok"){                        
                    console.log(data2);
                
                    for (var i=0; i < data2.articles.length; i++){
                        var displaynews = document.createElement("DIV");
                        displaynews.setAttribute('id', 'newsbox');
                        // displaynews.setAttribute('id', "HL" + i);
                        var newstitle = document.createElement('H2')
                        newstitle.innerHTML = data2.articles[i].title;
                        displaynews.appendChild(newstitle);
                        var newsimage = document.createElement("IMG");
                        newsimage.setAttribute('src', data2.articles[i].urlToImage);
                        // console.log(newsimage);
                        displaynews.appendChild(newsimage);
                        var descrip = document.createElement("P");
                        descrip.innerHTML = data2.articles[i].description;
                        displaynews.appendChild(descrip);
                        document.getElementById('source').appendChild(displaynews);
      
                    }
                }
            }
        })
        
        
    });



})

  