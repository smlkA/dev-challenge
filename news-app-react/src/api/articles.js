const stage = process.env.NODE_ENV;
const baseURL = `${process.env.APP_SERVICE_URL}/${stage}`;

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
    const { data } = await response.json();
    return data || [];
  }
  throw new Error("Status is not 2XX");
};
