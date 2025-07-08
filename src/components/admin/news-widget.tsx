"use client";

import React, { useState, useEffect } from "react";
import { Newspaper, Clock, TrendingUp } from "lucide-react";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsWidgetProps {
  minimal?: boolean;
}

const NewsWidget = ({ minimal = false }: NewsWidgetProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/admin/news");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNews(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
        // Fallback to mock data
        const mockNews: NewsItem[] = [
          {
            title: "Tech Industry Sees Major Breakthrough in AI Development",
            description:
              "Leading tech companies announce collaborative efforts to advance artificial intelligence research and development.",
            url: "#",
            publishedAt: new Date(
              Date.now() - 2 * 60 * 60 * 1000
            ).toISOString(),
            source: { name: "Tech News" },
          },
          {
            title: "Global Markets React to Economic Policy Changes",
            description:
              "Financial markets worldwide respond to new economic policies announced by major central banks.",
            url: "#",
            publishedAt: new Date(
              Date.now() - 4 * 60 * 60 * 1000
            ).toISOString(),
            source: { name: "Business Daily" },
          },
          {
            title: "Climate Summit Addresses Renewable Energy Goals",
            description:
              "World leaders gather to discuss ambitious targets for renewable energy adoption and climate action.",
            url: "#",
            publishedAt: new Date(
              Date.now() - 6 * 60 * 60 * 1000
            ).toISOString(),
            source: { name: "Global News" },
          },
          {
            title: "Healthcare Innovation: New Treatment Methods Emerge",
            description:
              "Medical researchers discover promising new approaches to treating chronic diseases.",
            url: "#",
            publishedAt: new Date(
              Date.now() - 8 * 60 * 60 * 1000
            ).toISOString(),
            source: { name: "Health Weekly" },
          },
        ];
        setNews(mockNews);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div
        className={`p-4 mx-auto w-full text-center bg-gray-100 rounded-xl transition-colors duration-300 dark:bg-gray-800 dark:text-white ${minimal ? "flex justify-center items-center max-w-xs h-32" : "max-w-md"}`}
      >
        Loading news...
      </div>
    );
  }

  if (minimal) {
    return (
      <div className="flex flex-col justify-between p-4 w-full h-32 text-white bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 rounded-2xl shadow-lg">
        <div className="flex items-center">
          <Newspaper size={16} className="mr-2 text-white/80" />
          <span className="text-sm font-semibold">Latest News</span>
        </div>
        <div className="space-y-1">
          {news.slice(0, 1).map((item, idx) => (
            <div key={idx} className="text-xs leading-tight">
              <div className="mb-1 font-medium line-clamp-2">{item.title}</div>
              <div className="flex justify-between items-center text-white/70">
                <span className="text-xs">{item.source.name}</span>
                <span className="text-xs">
                  {formatTimeAgo(item.publishedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden relative p-6 text-white bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 rounded-3xl shadow-2xl transition-all duration-300 dark:from-gray-800 dark:via-gray-900 dark:to-black">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 dark:bg-white/5"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5 dark:bg-white/10"></div>

        <div className="flex relative z-10 justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Newspaper size={20} className="text-white/80 dark:text-gray-300" />
            <span className="text-lg font-semibold text-white/90 dark:text-gray-200">
              Latest News
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp
              size={16}
              className="text-white/70 dark:text-gray-400"
            />
            <span className="text-sm text-white/70 dark:text-gray-400">
              Trending
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          {news.map((item, index) => (
            <div
              key={index}
              className="p-4 transition-all duration-300 bg-white/15 dark:bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 dark:hover:bg-white/15 hover:scale-[1.02] cursor-pointer group"
            >
              <h3 className="mb-2 text-sm font-semibold text-white dark:text-gray-100 line-clamp-2 group-hover:text-white/90">
                {item.title}
              </h3>

              <p className="mb-3 text-xs text-white/70 dark:text-gray-400 line-clamp-2">
                {item.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-emerald-300 dark:text-emerald-400">
                  {item.source.name}
                </span>
                <div className="flex items-center space-x-1">
                  <Clock
                    size={12}
                    className="text-white/50 dark:text-gray-500"
                  />
                  <span className="text-xs text-white/50 dark:text-gray-500">
                    {formatTimeAgo(item.publishedAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsWidget;
