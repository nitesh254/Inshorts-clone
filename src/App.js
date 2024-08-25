import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavInshort from "./components/NavInshort";
import NewsContent from "./components/NewsContent/NewsContent";

function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState(0); // Initialize as 0
  const [loadMore, setLoadMore] = useState(20);
  const [category, setCategory] = useState("general");

  const newsApi = async () => {
    try {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const news = await axios.get(
        `${proxyUrl}https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${loadMore}&category=${category}`
      );
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  useEffect(() => {
    newsApi();
    // eslint-disable-next-line
  }, [loadMore, category]);

  return (
    <div className="App" id="#home">
      <NavInshort setCategory={setCategory} />
      {newsResults > 0 ? (
        <NewsContent
          newsArray={newsArray}
          newsResults={newsResults}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
        />
      ) : (
        <p>No news available.</p>
      )}
      <Footer />
    </div>
  );
}

export default App;
