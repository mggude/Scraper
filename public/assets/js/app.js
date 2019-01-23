// Grab the articles as a json
function displayHeadlines() {
  $("#headlines").empty();
  $.getJSON("/headlines", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      // $("#headlines").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].description + "</p>");
      var cardDiv = $("<div class='card-body'>");

      // Storing the title data
      var title = data[i].title;

      // Creating an element to have the title displayed
      var h5 = $("<h5>").text(title);
      $("h5").addClass("card-title");

      // Displaying the title
      cardDiv.append(h5);

      // Storing the summary
      var description = data[i].description;

      // Creating an element to hold the summary
      var p = $("<p>").text(description);
      $("p").addClass("card-text");

      // Displaying the summary
      cardDiv.append(p);

      // Storing the link
      var link = data[i].link;

      // Creating a button to hold the link
      var a1 = $("<a>").attr("href", link).addClass("btn btn-info").text("Read More").attr("target", "_blank");

      // Appending the link
      cardDiv.append(a1);

      // Creating a button to save/unsave the article
      var a2 = $("<a>").addClass("btn btn-primary saveBtn").text("Save Article").attr("target", "_blank");

      // Appending the link
      cardDiv.append(a2);

      // Retrieving the URL for the image
      // var imgURL = data[i].image;

      // // Creating an element to hold the image
      // var image = $("<img>").attr("src", imgURL).addClass("card-img-top").html(imgURL);

      // // Appending the image
      // cardDiv.append(image);

      // Putting the entire card above the previous cards
      $("#headlines").prepend(cardDiv);
    }
  });
}

$("#clearBtn").click(() => {
  $("#headlines").empty();
});

$("#scrapeBtn").click(() => {
  displayHeadlines();
});

$("#saveBtn").click(() => {
  $.ajax({
    type: "GET",
    url: "/saved/" + $(this).attr("data"),

    success: function(response) {
      console.log("Article saved!");
    }
  });
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/headlines/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/headlines/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
