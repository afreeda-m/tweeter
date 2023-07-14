/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // create dynamic tweet element
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
      <p>${tweet.content.text}
      </p>
    </div>

    <hr class="user-tweets-horizonLine">

    <footer class="user-tweets-footer">
      <div>
        <h5><span><time class="tweet-timeago">${tweet.created_at}</time> days ago</span></h5>
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

  //loop through all tweet objects and render the individual elements for display
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $(".user-tweets").prepend(tweetElement);
    }
  }

  $(".tweet-form").submit(function(event) {
    // Prevent the default pag refresh form submission behavior
    event.preventDefault();

    // Serialize the form data
    const formData = $(this).serialize();

    // Send an AJAX POST request to the server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: function(response) {
        // Handle the success response
        console.log('Data sent successfully:', response);
        loadTweets();
      },
      error: function(error) {
        // Handle the error response
        console.error('Error sending data:', error);
      }
    });
  });

  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'JSON',
      success: function(response) {
        $(".user-tweets").empty();

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