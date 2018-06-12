$( document ).ready(function() {
  
    var bands = ["The Velvet Underground", "Pavement", "Radiohead", "My Bloody Valentine", "Oasis", "Fugazi", "Aphex Twin", "Fleetwood Mac"];
 

    function showGifs(){
        $("#gifButtonsDiv").empty(); // Erases all buttons in DIV so no duplicates are shown.
        for (var i = 0; i < bands.length; i++){ 
            var gifButton = $("<button>"); // will loop through array and create a button for each string and store value in the var gif button.
            gifButton.addClass("band"); //adding class "band" to all buttons
            gifButton.addClass("btn btn-danger") //adding bootstrap class for styling and functionality purposes.
            gifButton.attr("data-name", bands[i]); //creating attribute to button called data-name that will store the value of the string for selecting purposes.
            gifButton.text(bands[i]); //taking the band name from the array and giving the button text of that name.
            $("#gifButtonsDiv").append(gifButton); //after looping through all strings in the array and creating button with classes and attributes we will now append each button to the buttons Div.
        }
    }
     // function for user to add new band button.
    function addNewButton(){
        $("#addGif").on("click", function(){
        var band = $("#band-input").val().trim(); //var band takes value of what the user inputs.
        if (band == ""){
          return false; // if state for making sure user can't add a blank button.
        }
        bands.push(band); //puts user input into bands array.
    
        showGifs();
        return false;
        });
    }
    
    // the function below is to be run when the "remove last band" button is clicked.

    function deleteButton(){
        $("removeGif").on("click", function(){
        bands.pop(band);
        showGifs();
        return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs(){
        var band = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + band + "&api_key=dc6zaTOxFJmzC&limit=8";
       
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
            var results = response.data; //shows results of gifs
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv col-sm-12 col-lg-3 img-thumbnail");
                // pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                var clickToPlay = $("<p>").text("Click Image To Play");
                gifDiv.append(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                gifDiv.append(clickToPlay);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
  
    showGifs(); // displays list of bands already created
    addNewButton();
    deleteButton();
   

    $(document).on("click", ".band", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });