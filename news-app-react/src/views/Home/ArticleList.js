import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Spinner from "components/Spinner";
import Article from "components/Article";

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`;

const ArticleSpinner = styled(Spinner)`
  margin-top: 15%;
`;

const PageMessage = styled.h2`
  margin: auto;
  margin-top: 15%;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.2;
  text-align: center;
`;

export const ArticleList = ({ articles }) => {
  console.log(articles);
  if (articles.isLoading === true) {
    return <ArticleSpinner label="Loading articles" />;
  }
  if (articles.onError === true) {
    return <PageMessage>Network error, try again later :(</PageMessage>;
  }
  if (articles.data?.length === 0) {
    return (
      <PageMessage>
        Sorry, no news articles are available at moment :(
      </PageMessage>
    );
  }
  return (
    <List data-testid="article-list">
      {articles.data?.map((article, index) => (
        <Article key={index} article={article} />
      ))}
    </List>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.object,
};
