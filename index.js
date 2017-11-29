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
                document.getElementById('newsfeed').innerHTML = "";
                if (data2.status == "ok"){                        
                    console.log(data2);

                
                    for (var i=0; i < data2.articles.length; i++){
                        var maincontent = document.createElement("DIV");
                        maincontent.setAttribute("class", "container");
                        
                        var row1 = document.createElement("DIV");
                        row1.setAttribute('class', 'row');
                        maincontent.appendChild(row1);
                        
                        var displaynews = document.createElement("DIV");
                        displaynews.setAttribute('class', 'col-xs-4');
                        row1.appendChild(displaynews);
                        
                        var newstitle = document.createElement('H2');
                        var linktitle = document.createElement("A");
                        linktitle.setAttribute('href', data2.articles[i].url);
                        linktitle.innerHTML = data2.articles[i].title;
                        newstitle.appendChild(linktitle);
                        displaynews.appendChild(newstitle);
                        
                        var newsimage = document.createElement("IMG");
                        newsimage.setAttribute('src', data2.articles[i].urlToImage);
                        displaynews.appendChild(newsimage);
                        
                        var descrip = document.createElement("P");
                        descrip.innerHTML = data2.articles[i].description;
                        displaynews.appendChild(descrip);

                        document.getElementById('newsfeed').appendChild(displaynews);
                    }
                }
            }
        })
        
        
    });



})

  