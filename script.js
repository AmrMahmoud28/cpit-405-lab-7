const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "hNpB6Yql99zPevEyM6zCDT9GIrhejVRwDsp5aCGVYj4";

const searchQuery = document.getElementById("queryInput");
const resultsElement = document.getElementById("results");

document.getElementById("xhrSearch").addEventListener("click", () => {
    let queryTerm = searchQuery.value.trim();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}?query=${queryTerm}`);
    xhr.setRequestHeader("Authorization", `Client-ID ${ACCESS_KEY}`);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            createImages(response);
        }
    };
    xhr.send();
});

document.getElementById("fetchSearch").addEventListener("click", () => {
    let queryTerm = searchQuery.value.trim();
    fetch(`${API_URL}?query=${queryTerm}`, {
        method: "GET",
        headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
        },
    })
        .then((response) => response.json())
        .then((data) => createImages(data))
        .catch((error) => console.error("Error:", error));
});

document
    .getElementById("fetchAsyncAwaitSearch")
    .addEventListener("click", async () => {
        let queryTerm = searchQuery.value.trim();
        const response = await fetch(`${API_URL}?query=${queryTerm}`, {
            method: "GET",
            headers: {
                Authorization: `Client-ID ${ACCESS_KEY}`,
            },
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            createImages(jsonResponse);
        }
    });

const createImages = (data) => {
    resultsElement.innerHTML = "";
    for (let item of data.results) {
        const imgElement = document.createElement("img");
        imgElement.src = item.urls.small;
        imgElement.alt = item.description;
        resultsElement.appendChild(imgElement);
    }
};
