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
    

    // .done(function( data ) {
    //     console.log( data );
    //     console.log( "data.status");
    // });
    $('#source').submit(function(event){
        event.preventDefault();
        alert(document.getElementById("selection").value);
            $.ajax({
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines",
        data: { sources: document.getElementById('selection').value, apiKey: APIKEY},
        success: function(data2){
            if (data2.status == "ok"){
                console.log(data2);
                for (var i=0; i < data2.articles.length; i++){
                    var source2 = document.createElement("P");
                    source2.setAttribute("id", "tagme")
                    source2.innerHTML = data2.articles[i].description;
                    
                }    
               
            }
        }
    })
    });
    $('#source2').submit(function(display){
        event.preventDefault();
        alert(document.getElementById("tagme").value);
    });
})

  