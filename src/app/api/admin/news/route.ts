import { NextRequest, NextResponse } from "next/server";

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

export async function GET(req: NextRequest) {
  try {
    if (!NEWS_API_KEY) {
      // Fallback to mock data if API key is not available
      const mockNews = [
        {
          title: "Tech Industry Sees Major Breakthrough in AI Development",
          description:
            "Leading tech companies announce collaborative efforts to advance artificial intelligence research and development.",
          url: "#",
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          source: { name: "Tech News" },
        },
        {
          title: "Global Markets React to Economic Policy Changes",
          description:
            "Financial markets worldwide respond to new economic policies announced by major central banks.",
          url: "#",
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          source: { name: "Business Daily" },
        },
        {
          title: "Climate Summit Addresses Renewable Energy Goals",
          description:
            "World leaders gather to discuss ambitious targets for renewable energy adoption and climate action.",
          url: "#",
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          source: { name: "Global News" },
        },
        {
          title: "Healthcare Innovation: New Treatment Methods Emerge",
          description:
            "Medical researchers discover promising new approaches to treating chronic diseases.",
          url: "#",
          publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          source: { name: "Health Weekly" },
        },
      ];

      return NextResponse.json({ articles: mockNews });
    }

    const response = await fetch(
      `${NEWS_API_URL}?country=ae&category=technology&pageSize=4&apiKey=${NEWS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);

    // Return mock data as fallback
    const mockNews = [
      {
        title: "Tech Industry Sees Major Breakthrough in AI Development",
        description:
          "Leading tech companies announce collaborative efforts to advance artificial intelligence research and development.",
        url: "#",
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        source: { name: "Tech News" },
      },
      {
        title: "Global Markets React to Economic Policy Changes",
        description:
          "Financial markets worldwide respond to new economic policies announced by major central banks.",
        url: "#",
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        source: { name: "Business Daily" },
      },
      {
        title: "Climate Summit Addresses Renewable Energy Goals",
        description:
          "World leaders gather to discuss ambitious targets for renewable energy adoption and climate action.",
        url: "#",
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        source: { name: "Global News" },
      },
      {
        title: "Healthcare Innovation: New Treatment Methods Emerge",
        description:
          "Medical researchers discover promising new approaches to treating chronic diseases.",
        url: "#",
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        source: { name: "Health Weekly" },
      },
    ];

    return NextResponse.json({ articles: mockNews });
  }
}
