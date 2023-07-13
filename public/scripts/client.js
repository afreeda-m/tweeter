/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(function () {
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
        <h5><span>${tweet.created_at} days ago</span></h5>
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

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $(".user-tweets").append(tweetElement);
    }
  }

  renderTweets(data);
});