const stage = process.env.NODE_ENV;
const baseURL = `${process.env.APP_SERVICE_URL}`;

export const fetchArticles = async (type, params) => {
  const response = await fetch(`${baseURL}/articles?type=${type}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  if (response.status >= 200 && response.status <= 299) {
    const { articles } = await response.json();
    return articles || [];
  }
  throw new Error("Status is not 2XX");
};
