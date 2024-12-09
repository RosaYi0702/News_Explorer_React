import { BASE_URL } from "./constants";

export const News_API_Key = "4a4a1b93398b4b9f9438e5e0f41e9994";
function KeywordsNewsUrl(KeyWord, apiKey) {
  return `https://newsapi.org/v2/everything?q=${KeyWord}&apiKey=${apiKey}`;
}

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function fetchNews(KeyWord) {
  return fetch(KeywordsNewsUrl(KeyWord, News_API_Key))
    .then(checkResponse)
    .then((data) => {
      return data.articles.map((article) => ({ ...article, saved: false }));
    });
}

export function saveArticleItem(data, token) {
  return fetch(`${BASE_URL}/articles/saved`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      source: {
        id: data.source.id,
        name: data.source.name,
      },
      author: data.author,
      title: data.title,
      description: data.description,
      url: data.url,
      urlToImage: data.urlToImage,
      publishedAt: data.publishedAt,
      content: data.content,
      saved: true,
      keyword: data.keyword,
    }),
  }).then(checkResponse);
}

export function unsaveArticleItem(id, token) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function getSavedArticles(token) {
  return fetch(`${BASE_URL}/articles/saved`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
