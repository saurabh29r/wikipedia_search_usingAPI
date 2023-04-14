let searchInputEl = document.getElementById("searchInput");
let searchResultEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAndAppend(results) {
    let {
        title,
        link,
        description
    } = results;
    //creating a div container for adding all elements inside it.

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultEl.appendChild(resultItemEl);

    //create an anchor tag for adding a link

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    //Title break(line brreak)
    let TitleBreak = document.createElement("br");
    resultItemEl.appendChild(TitleBreak);

    //for showing link we have to create anchore element 
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    //line break 
    let linebreakEl = document.createElement("br");
    resultItemEl.appendChild(linebreakEl);

    //paragraph description area 

    let descriptionEL = document.createElement("p");
    descriptionEL.classList.add("link-description");
    descriptionEL.textContent = description;
    resultItemEl.appendChild(descriptionEL);



}


//this function is written for for loop and fetch the result 
function displayResult(search_results) {
    spinnerEl.classList.toggle("d-none");
    for (let results of search_results) {
        createAndAppend(results);
    }




}

function searchWiki(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            })

    }
}


searchInputEl.addEventListener("keydown", searchWiki);