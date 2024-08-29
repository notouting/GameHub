const API_KEY = "3ed92059eab34629aa99fb634eeebfe6"
const API_URL = "https://api.rawg.io/api/"
const url = "https://api.rawg.io/api/games?key=3ed92059eab34629aa99fb634eeebfe6"

let elGameResult = document.querySelector(".game-result")
let elAsideResult = document.querySelector(".aside-res")
let elModeBtn = document.querySelector(".mode-changer")
let elGameTemplate = document.querySelector(".game-template").content
let elAsideLiTemplate = document.querySelector(".aside-li").content
let asideFragment = new DocumentFragment()
let gameFragment = new DocumentFragment()
let elSearchGameForm = document.querySelector(".search-game-form")
let elPlatformSelect = document.querySelector(".platform-sort")
let elOrderSelect = document.querySelector(".order-sort")

fetch(API_URL + "platforms/lists/parents" + "?key=" + API_KEY).then(data => data.json()).then((data) => {
    for (let i = 0; i < data.results.length; i++) {
        let newOpt = document.createElement("option")

        newOpt.value = i
        newOpt.textContent = data.results[i].name

        elPlatformSelect.appendChild(newOpt)
    }
})

fetch(API_URL + "genres" + "?key=" + API_KEY).then(data => data.json()).then((data) => {
    console.log(data)
    for (let i = 0; i < data.results.length; i++) {
        let newTemp = elAsideLiTemplate.cloneNode(true)


        newTemp.querySelector(".me-3").textContent = data.results[i].name
        newTemp.querySelector("li").dataset.gameSlug = data.results[i].slug
        newTemp.querySelector("a").dataset.gameSlug = data.results[i].slug
        newTemp.querySelector("span").dataset.gameSlug = data.results[i].slug
        newTemp.querySelector("img").dataset.gameSlug = data.results[i].slug
        newTemp.querySelector(".aside-img").src = data.results[i].image_background

        asideFragment.appendChild(newTemp)
    }
    elAsideResult.append(asideFragment)
})

elAsideResult.addEventListener("click", (evt) => {
    let slug = evt.target.dataset.gameSlug

    console.log(slug)
    if (evt.target.matches("li")) {
        fetch(API_URL + "games" + "?key=" + API_KEY + `&genres=${slug}`).then(data => data.json()).then((data) => {
            console.log(data)
            renderGames(data.results)
        })
    }
    if (evt.target.matches("a")) {
        fetch(API_URL + "games" + "?key=" + API_KEY + `&genres=${slug}`).then(data => data.json()).then((data) => {
            console.log(data)
            renderGames(data.results)
        })
    }
    if (evt.target.matches("span")) {
        fetch(API_URL + "games" + "?key=" + API_KEY + `&genres=${slug}`).then(data => data.json()).then((data) => {
            console.log(data)
            renderGames(data.results)
        })
    }
    if (evt.target.matches("img")) {
        fetch(API_URL + "games" + "?key=" + API_KEY + `&genres=${slug}`).then(data => data.json()).then((data) => {
            console.log(data)
            renderGames(data.results)
        })
    }
})

elPlatformSelect.addEventListener("change", () => {
    let value = elPlatformSelect.value


    fetch(API_URL + "games" + "?key=" + API_KEY + `&platforms=${value}`).then(data => data.json()).then((data) => {
        console.log(data)
        renderGames(data.results)
    })

})

elOrderSelect.addEventListener("change", () => {

    let value = elOrderSelect.value
    "https://api.rawg.io/api/platforms?key=3ed92059eab3…9aa99fb634eeebfe6&ordering=pc&page=3&page_size=20', previous: 'https://api.rawg.io/api/platforms?key=3ed92059eab34629aa99fb634eeebfe6&ordering=pc&page_size=20"

    fetch(API_URL + "games" + "?key=" + API_KEY + `&ordering=${value}`).then(data => data.json()).then((data) => {
        console.log(data)
        renderGames(data.results)
    })
})

elSearchGameForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let [input] = elSearchGameForm

    fetch(API_URL + "games?" + `key=${API_KEY}&search=${input.value}`).then(data => data.json()).then((data) => {
        console.log(data)
        elGameResult.innerHTML = null
        renderGames(data.results)
    })
})

fetch(API_URL + "games?" + `key=${API_KEY}`).then(data => data.json()).then((data) => {
    renderGames(data.results)
}).catch(err => console.log(err));

const renderPlatforms = (arr) => {
    let result = ""
    arr.forEach((platform) => {
        switch (platform.platform.name) {
            case "PC":
                result += `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" focusable="false" class="chakra-icon css-j9mc1m" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"></path></svg>`
                break
            case "PlayStation":
                result += `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" focusable="false" class="chakra-icon css-j9mc1m" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M570.9 372.3c-11.3 14.2-38.8 24.3-38.8 24.3L327 470.2v-54.3l150.9-53.8c17.1-6.1 19.8-14.8 5.8-19.4-13.9-4.6-39.1-3.3-56.2 2.9L327 381.1v-56.4c23.2-7.8 47.1-13.6 75.7-16.8 40.9-4.5 90.9.6 130.2 15.5 44.2 14 49.2 34.7 38 48.9zm-224.4-92.5v-139c0-16.3-3-31.3-18.3-35.6-11.7-3.8-19 7.1-19 23.4v347.9l-93.8-29.8V32c39.9 7.4 98 24.9 129.2 35.4C424.1 94.7 451 128.7 451 205.2c0 74.5-46 102.8-104.5 74.6zM43.2 410.2c-45.4-12.8-53-39.5-32.3-54.8 19.1-14.2 51.7-24.9 51.7-24.9l134.5-47.8v54.5l-96.8 34.6c-17.1 6.1-19.7 14.8-5.8 19.4 13.9 4.6 39.1 3.3 56.2-2.9l46.4-16.9v48.8c-51.6 9.3-101.4 7.3-153.9-10z"></path></svg>`
                break
            case "Xbox":
                result += `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" focusable="false" class="chakra-icon css-j9mc1m" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M369.9 318.2c44.3 54.3 64.7 98.8 54.4 118.7-7.9 15.1-56.7 44.6-92.6 55.9-29.6 9.3-68.4 13.3-100.4 10.2-38.2-3.7-76.9-17.4-110.1-39C93.3 445.8 87 438.3 87 423.4c0-29.9 32.9-82.3 89.2-142.1 32-33.9 76.5-73.7 81.4-72.6 9.4 2.1 84.3 75.1 112.3 109.5zM188.6 143.8c-29.7-26.9-58.1-53.9-86.4-63.4-15.2-5.1-16.3-4.8-28.7 8.1-29.2 30.4-53.5 79.7-60.3 122.4-5.4 34.2-6.1 43.8-4.2 60.5 5.6 50.5 17.3 85.4 40.5 120.9 9.5 14.6 12.1 17.3 9.3 9.9-4.2-11-.3-37.5 9.5-64 14.3-39 53.9-112.9 120.3-194.4zm311.6 63.5C483.3 127.3 432.7 77 425.6 77c-7.3 0-24.2 6.5-36 13.9-23.3 14.5-41 31.4-64.3 52.8C367.7 197 427.5 283.1 448.2 346c6.8 20.7 9.7 41.1 7.4 52.3-1.7 8.5-1.7 8.5 1.4 4.6 6.1-7.7 19.9-31.3 25.4-43.5 7.4-16.2 15-40.2 18.6-58.7 4.3-22.5 3.9-70.8-.8-93.4zM141.3 43C189 40.5 251 77.5 255.6 78.4c.7.1 10.4-4.2 21.6-9.7 63.9-31.1 94-25.8 107.4-25.2-63.9-39.3-152.7-50-233.9-11.7-23.4 11.1-24 11.9-9.4 11.2z"></path></svg>`
                break
            case "Apple Macintosh":
                result += `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" focusable="false" class="chakra-icon css-j9mc1m" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>`
                break
            case "Nintendo":
                result += `<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" focusable="false" class="chakra-icon css-j9mc1m" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M0 .6h7.1l9.85 15.9V.6H24v22.8h-7.04L7.06 7.5v15.9H0V.6"></path></svg>`
                break
            case "Android":
                result += `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" focusable="false" class="chakra-icon css-j9mc1m" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"></path></svg>`
                break
            case "IOS":
                result += `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" focusable="false" class="chakra-icon css-j9mc1m" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M15.5 1h-8A2.5 2.5 0 005 3.5v17A2.5 2.5 0 007.5 23h8a2.5 2.5 0 002.5-2.5v-17A2.5 2.5 0 0015.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"></path></svg>`
                break
            default:
                result += " "
                break
        }
    })
    return result
}

if (localStorage.getItem("mode")) {
    document.querySelector("html").classList.toggle(localStorage.getItem("mode"))
}

elModeBtn.addEventListener("click", () => {
    document.querySelector("html").classList.toggle("dark")
    localStorage.setItem("mode", document.querySelector("html").className)
})

const renderGames = (arr) => {

    for (let item of arr) {
        elGameResult.innerHTML = null
        let newTemp = elGameTemplate.cloneNode(true)
        newTemp.querySelector(".game-title").textContent = item.name
        newTemp.querySelector(".game-img").src = item.background_image
        newTemp.querySelector(".game-img").alt = item.name + "game"
        newTemp.querySelector(".game-title").dataset.gameId = item.id
        newTemp.querySelector(".game-platforms").innerHTML = renderPlatforms(item.parent_platforms)

        gameFragment.appendChild(newTemp)
    }
    elGameResult.appendChild(gameFragment)
}

elGameResult.addEventListener("click", (evt) => {
    const url = "https://game-hub-mauve-seven.vercel.app/game.html?";
    let id = evt.target.dataset.gameId;

    console.log(id);
    if (evt.target.matches(".game-title")) {
        const params = new URLSearchParams({ id });

        window.location.href = url + params;
    }
});

