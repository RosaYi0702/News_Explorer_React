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
