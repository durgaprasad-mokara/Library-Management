let searchInput = document.getElementById("searchInput");
let searchResults_Container = document.getElementById("searchResults");
let searchResultspara = document.getElementById("searchResultspara");
let loading = document.getElementById("loading");

function displayBooks(author, imageLink) {
    loading.classList.add("d-none");
    let div = document.createElement("div");
    div.classList.add("col-6");
    let imge = document.createElement("img");
    imge.src = imageLink;
    imge.classList.add("text-center", "w-100");
    div.appendChild(imge);
    let authorName = document.createElement("p");
    authorName.classList.add("text-center");
    authorName.textContent = author;
    div.appendChild(authorName);
    searchResults_Container.appendChild(div);
}

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchResults_Container.textContent = "";
        loading.classList.remove("d-none");
        let url = "https://apis.ccbp.in/book-store?title=" + searchInput.value;

        let option = {
            method: "GET"
        }

        fetch(url, option)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;

                if (search_results.length === 0) {
                    let searchResultspara = document.getElementById("searchResultspara");
                    searchResultspara.textContent = "No Result Found";
                } else {
                    searchResultspara.textContent = "";
                    let h1el = document.createElement("h1");
                    h1el.textContent = "Popular Books";
                    searchResults_Container.appendChild(h1el);

                    for (let item of search_results) {
                        let {
                            author,
                            imageLink
                        } = item;
                        displayBooks(author, imageLink);
                    }
                }
            });
    }
});