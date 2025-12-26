// src/components/NewsCarousel.tsx
import React, { useState, useEffect } from "react";
import { backend_url } from "../../utils";

interface NewsArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

const NewsCarousel: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${backend_url}/api/news/latest`,{
          credentials: "include",
        });
        const json = await response.json();
        setArticles(json.data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const nextSlide = () => {
    if (currentIndex + 3 < articles.length) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const prevSlide = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  if (articles.length === 0) {
    return <p className="text-gray-500 text-center mt-4">Loading news...</p>;
  }

  const visibleArticles = articles.slice(currentIndex, currentIndex + 3);

  return (
    <div className="w-full mx-auto p-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-left">
        Latest News
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleArticles.map((article, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            {article.urlToImage ? (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="h-40 w-full object-cover"
              />
            ) : (
              <div className="h-40 w-full flex items-center justify-center bg-gray-200 text-gray-500">
                No Image
              </div>
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 flex-grow">
                {article.description || "No description available."}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-blue-500 hover:underline"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          ◀ Prev
        </button>
        <button
          onClick={nextSlide}
          disabled={currentIndex + 3 >= articles.length}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default NewsCarousel;
