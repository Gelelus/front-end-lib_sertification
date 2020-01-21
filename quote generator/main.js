let Random;
let quotes;

function getQuotes() {
   $.ajax({
    headers: {
      Accept: "application/json"
    },
    url: 'https://raw.githubusercontent.com/Gelelus/front-end-lib_sertification/master/quote%20generator/quotes.json',
    success: function(data) {
      if (typeof data === 'string') {
        quotes = JSON.parse(data).quotes;
        nextQuote(false)
      }
    }
  });
}
function nextQuote(n){
  Random = Math.floor(Math.random()*quotes.length);
  let text = quotes[Random].quote;
  let author = quotes[Random].author;
  $('#tweet-quote').on('click', function() {
    event.preventDefault();
    window.open(`https://twitter.com/intent/tweet?hashtags=quotes&text="${text}"-${author}`);
  })
  if(n){
    $("#author").html(` `);
      function textGo(i){
        if(i == text.length+3){
         $("#author").html(`- ${author}`);
         return
        }
        $("#text").html(`${`"${text}"`.slice(0,i++)}`);
        setTimeout(() => textGo(i),20)
      }
      textGo(1)
  }else{
    $("#text").html(`"${text}"`)
    $("#author").html(`- ${author}`)
  }
}
getQuotes() ;
$('#new-quote').on('click', ()=> nextQuote(true));
