import React from "react"
import './Articles.css';
 const Articles = (props) => {

// JavaScript: Fetch data and display articles in divs
fetch('https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=8ce21b03bc284075bba47f80a6cbba26')
  .then(response => response.json())
  .then(data => {
    if (data.status === "ok" && Array.isArray(data.articles) && data.articles.length > 0) {
      const articles = data.articles;
      const articleContainer = document.getElementById("articleContainer");

      articles.forEach(article => {
        const articleDiv = document.createElement("div");
        articleDiv.classList.add("article");

        const sourceDiv = document.createElement("div");
        sourceDiv.textContent = "Source: " + (article.source?.name || "N/A");
        articleDiv.appendChild(sourceDiv);

        const authorDiv = document.createElement("div");
        authorDiv.textContent = "Author: " + (article.author || "N/A");
        articleDiv.appendChild(authorDiv);

        const titleDiv = document.createElement("div");
        titleDiv.textContent = "Title: " + (article.title || "N/A");
        articleDiv.appendChild(titleDiv);

        const descriptionDiv = document.createElement("div");
        descriptionDiv.textContent = "Description: " + (article.description || "N/A");
        articleDiv.appendChild(descriptionDiv);

        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = "Content: " + (article.content || "N/A");
        articleDiv.appendChild(contentDiv);

        articleContainer.appendChild(articleDiv);
      });
    } else {
      console.log("No articles found.");
    }
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });


  return (
  <>
   <div id="articleContainer"></div>
  </>
  )
};

export default Articles;
