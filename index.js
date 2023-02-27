const App = () => {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState("");
  const [color, setcolor] = React.useState("#fff");

  React.useEffect(() => {
    async function getData() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotes(data);
      let rndIndx = Math.floor(Math.random() * data.length);
      setRandomQuote(data[rndIndx]);
    }
    getData();
  }, []);

  const getNewQuotes = () => {
    const colors = [
      "#77b1a9",
      "#73a857",
      "#e74c3c",
      "#9b59b6",
      "#472e32",
      "#f39c12",
      "#27ae60",
      "#16a085",
    ];
    let rndIndx = Math.floor(Math.random() * quotes.length);
    let rndColorIndx = Math.floor(Math.random() * colors.length);
    setRandomQuote(quotes[rndIndx]);
    setcolor(colors[rndColorIndx]);
  };

  let getColor = {
    color: color === "#fff" ? "black" : color,
  };

  const quoteData = '"' + randomQuote.text + '"' + randomQuote.author;
  return (
    <div className="page-setup" style={{ backgroundColor: color }}>
      <div className="container pt-5">
        <div className="jumbotron">
          <div className="card" id="quote-box">
            <div className="card-header text-center">
              <h1 style={getColor}>Inspirational Quotes</h1>
            </div>
            <div className="card-body">
              {randomQuote ? (
                <>
                  <h5 className="card-title" id="author" style={getColor}>
                    {randomQuote.author || "No Author"}
                  </h5>
                  <i className="fa fa-quote-left" style={getColor}></i>
                  <p className="card-text" id="text" style={getColor}>
                    {randomQuote.text}
                  </p>
                  <i className="fa fa-quote-right" style={getColor}></i>
                </>
              ) : (
                <h2>loading...</h2>
              )}
              <div className="d-flex justify-content-between">
                <button
                  id="new-quote"
                  className="btn m-2"
                  onClick={getNewQuotes}
                  style={getColor}
                >
                  New Quote
                </button>

                <div>
                  <a
                    className="btn"
                    target="_blank"
                    id="tweet-quote"
                    style={getColor}
                    href={
                      "https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=" +
                      encodeURIComponent(quoteData)
                    }
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a
                    className="btn"
                    target="_blank"
                    style={getColor}
                    href={
                      "https://www.tumblr.com/widgets/share/tool?posttype=quote&amp;tags=quotes,freecodecamp&amp;caption=Maya%20Angelou&amp;content=" +
                      encodeURIComponent(quoteData)
                    }
                  >
                    <i className="fa fa-tumblr"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("target"));
root.render(<App />);
