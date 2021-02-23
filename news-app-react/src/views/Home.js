import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Spinner from "components/Spinner";
import Article from "components/Article";

import { fetchArticles } from "../api";

function Home() {
  const defaultContentTitle = "top UK headlines";
  const searchContentTitle = "search results for:";
  const inputLabel =
    "Filter news by keyword. Advanced: use quotes ('') for exact matches, and the + / - symbols for needed / excluded words.";

  const { callback: debouncedSetSearchText } = useDebouncedCallback((value) => {
    setSearchText(value);
  }, 500);

  const [category, setCategory] = useState("q");
  const [searchText, setSearchText] = useState("");
  const [articles, setArticles] = useState({
    isLoading: true,
    data: [],
    onError: false,
  });

  useEffect(() => {
    const type = searchText.length > 0 ? "search" : "headlines";
    const bodyParam =
      searchText.length > 0 ? { [category]: searchText } : { country: "gb" };
    setArticles({
      isLoading: true,
      data: [],
      onError: false,
    });
    fetchArticles(type, bodyParam)
      .then((articles) =>
        setArticles({
          isLoading: false,
          data: articles,
          onError: false,
        })
      )
      .catch(() =>
        setArticles({
          isLoading: false,
          data: [],
          onError: true,
        })
      );
  }, [searchText, category]);

  const contentTitle =
    searchText.length > 0 ? searchContentTitle : defaultContentTitle;
  return (
    <HomePage>
      <PageTitle data-testid="search-title">
        Showing you the {contentTitle}
      </PageTitle>

      <InputGroup role="search" aria-label="for news articles">
        <SearchInput
          name="search-input"
          type="text"
          placeholder={inputLabel}
          defaultValue={searchText}
          aria-label={inputLabel}
          data-testid="search-input"
          onChange={(e) => debouncedSetSearchText(e.target.value)}
        />
        <SearchIcon />
      </InputGroup>
      <FormControl variant="outlined">
        <InputLabel id="news-category-label">Category</InputLabel>
        <Select
          labelId="news-category-label"
          id="news-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          label="Category"
        >
          <MenuItem value={"q"}>Title and description</MenuItem>
          <MenuItem value={"qInTitle"}>Only Title</MenuItem>
        </Select>
      </FormControl>

      {articles.isLoading === true && (
        <ArticleSpinner label="Loading articles" />
      )}

      {articles.data?.length > 0 && (
        <ArticleList data-testid="article-list">
          {articles.data?.map((article, index) => (
            <Article key={index} article={article} />
          ))}
        </ArticleList>
      )}

      {articles.onError === true && (
        <PageMessage>Network error, try again later :(</PageMessage>
      )}

      {articles.onError === false &&
        articles.data?.length === 0 &&
        articles.isLoading === false && (
          <PageMessage>
            Sorry, no news articles are available at moment :(
          </PageMessage>
        )}
    </HomePage>
  );
}

const HomePage = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding: 0 20px 20px;

  @media (max-width: 486px) {
    padding: 10px;
  }
`;

const PageTitle = styled.h1`
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
  margin: auto;
  margin-bottom: 2.5vh;
  text-overflow: wrap
  width: 100%;
`;

const InputGroup = styled.div`
  position: relative;
  display: inline-grid;
  flex: 1 1 auto;
  width: 100%;
  margin-bottom: 2.5vh;

  svg {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    fill: rgba(0, 0, 0, 0.44);
  }
`;

const SearchInput = styled.input`
  color: rgba(0, 0, 0, 0.87);
  line-height: 20px;
  padding: 8px 12px 8px 45px;
  margin: 0;
  min-width: 0;
  max-width: 100%;
  height: 32px;
  background-color: #dcdcdc;
  border-style: none;
  border-radius: 2px;
  font-size: 16px;

  &[placeholder] {
    color: rgba(0, 0, 0, 0.74);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:focus {
    color: #fff;
    background-color: #424242;
    caret-color: #ee44aa;
    outline: 0;

    ::placeholder {
      color: #fff;
    }

    & + svg {
      fill: #ee44aa;
    }
  }
`;

const PageMessage = styled.h2`
  margin: auto;
  margin-top: 15%;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.2;
  text-align: center;
`;

const ArticleList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`;

const ArticleSpinner = styled(Spinner)`
  margin-top: 15%;
`;

export default Home;
