/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // create HTML tweet element
  const createTweetElement = function (tweet) {
    let $tweet = `<article>
    <header id="user-tweets-header">
      <div class="user">
        <img src="${tweet.user.avatars}">
        <span class="user-name">${tweet.user.name}</span>
      </div>
      <div>
        <p class="user-handle"><span>${tweet.user.handle}</span></p>
      </div>
    </header>

    <div id="tweet-content">
      <p>
      ${escape(tweet.content.text)}
      </p>
    </div>

    <hr class="user-tweets-horizonLine">

    <footer class="user-tweets-footer">
      <div>
        <span class="tweet-time">${timeago.format(tweet.created_at)}</span>
      </div>
      <div class="footer-icons">
        <i class="fa-sharp fa-solid fa-flag"></i>
        <i class="fa-sharp fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
    </article>`;

    return $tweet;
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //loop through tweet object and render the individual tweets for display
  const renderTweets = function(tweets) {
    $(".user-tweets").empty();
  
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $(".user-tweets").prepend(tweetElement);
    }
  }

  // listen for a tweet submit
  $(".tweet-form").submit(function(event) {
    // Prevent the default page refresh form submission behavior
    event.preventDefault();

    //validate tweet message for emptiness and character count
    const tweetContent = $("#tweet-text").val();

    if (!tweetContent || tweetContent.trim() === ''){
      alert("Tweet content cannot be empty!");
      return;
    }

    if (tweetContent.length > 140) {
      alert("Character count is beyond 140 characters!");
      return;
    }

    // Serialize the form data
    const formData = $(this).serialize();

    // Send an AJAX POST request to the server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: function(response) {
        loadTweets();

        // reset text area and counter for new tweet submission
        $("#tweet-text").val('');
        $("#current-count").text('140');
      },
      error: function(error) {
        console.error('Error sending data:', error);
      }
    });
  });

  // Get tweets object from db and pass into renderTweets function
  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'JSON',
      success: function(response) {
        // If request successful, then show the tweets
        renderTweets(response);
      },
      error: function(error) {
        console.log('Error loading tweets: ', error);
      }
    });
  }

  loadTweets();

});