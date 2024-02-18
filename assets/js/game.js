let url = new URLSearchParams(document.location.search);
const params = url.get("id");
const API_KEY = "3ed92059eab34629aa99fb634eeebfe6"
const API_URL = "https://api.rawg.io/api/"
let result = ""
let elModeBtn = document.querySelector(".mode-changer")
let readMoreContent = ""

let screenshots = `${API_URL}games/${params}/screenshots?key=${API_KEY}`

if (localStorage.getItem("mode")) {
    document.querySelector("html").classList.toggle(localStorage.getItem("mode"))
}

elModeBtn.addEventListener("click", () => {
    document.querySelector("html").classList.toggle("dark")
    localStorage.setItem("mode", document.querySelector("html").className)
})

const getProduct = async (url) => {
    try {
        const response = await fetch(url);
        const game = await response.json();
        document.title = game.name;

        renderGame(game)
    } catch (error) {
        console.error(error);
    }
};


getProduct(API_URL + "games/" + params + `?key=${API_KEY}`);

const renderGame = (game) => {


    fetch(screenshots).then(data => data.json()).then((data) => {
        document.querySelector(".game-images-box").innerHTML = renderGameImages(data.results)
    })

    console.log(game)
    document.querySelector(".single-title").textContent = game.name_original
    document.querySelector(".single-description").textContent = game.description_raw.slice(0, 200)
    readMoreContent = game.description_raw
    document.querySelector(".platforms-list").innerHTML = renderPlatformList(game.platforms)
    document.querySelector(".game-rating").textContent = game.metacritic
    document.querySelector(".genres-list").innerHTML = renderGenres(game.genres)
    document.querySelector(".stores-res").innerHTML = renderStores(game.stores)
    document.querySelector(".publisher").textContent = game.publishers[0].name



}


const renderPlatformList = (arr) => {
    let res = ""
    arr.forEach((item) => {
        res += `<p class="dark:text-white text-black">${item.platform.name}</p>`
    })
    return res
}

const renderGenres = (arr) => {
    let res = ""
    arr.forEach((item) => {
        res += `<p class="dark:text-white text-black">${item.name}</p>`
    })
    return res
}

const renderStores = (arr) => {
    let res = ""
    arr.forEach((item) => {
        res += `   <a href="https://${item.store.domain}" target="_blank" class="text-black font-bold px-3 rounded-lg bg-orange-400">${item.store.name}</a>`
    })
    return res
}

document.querySelector(".read-more").addEventListener("click", () => {
    document.querySelector(".single-description").textContent = readMoreContent
    document.querySelector(".read-more").style.display = "none"
})

const renderGameImages = (arr) => {
    let res = ""
    arr.forEach((item) => {
        res += `  <img class="single-first-img w-60 h-32" src="${item.image}" alt="${item.id}">`
    })
    return res
}

