const btn1 = document.querySelector(".btn1")
const btn2 = document.querySelector(".btn2")
const btn3 = document.querySelector(".btn3")
const btn4 = document.querySelector(".btn4")
const loading = document.querySelector(".loading")
const cards = document.querySelector(".cards")
const modal_container = document.querySelector(".modal_container")
const modal = document.querySelector(".modal")

var api_link = "https://api.themoviedb.org/3/movie/popular?api_key=e3eba846fb6af8da7df4730f6734f0f7&language=en-US&page=1"

var movies

const getData = async (link) => {
    loading.style = "display: flex;";
    const req = await fetch(link)
    const data = await req.json()
    writeData(data.results)
    movies = data.results

    loading.style = "display: none;";

}

getData(api_link)

const writeData = (Data) => {
    cards.innerHTML = ""
    Data.forEach((item) => {

        cards.innerHTML += `
        <div class="card">
        <h3>${item.title.slice(0, 15)}</h3>
        <div class="image">
            <img onclick="getModal(${item.id})" src="${"https://image.tmdb.org/t/p/w500" + item.backdrop_path}" alt="">
        </div>
    </div>
        `
    });
}

const getModal = async (id) => {
    const movie = movies.filter((item) => {
        return item.id == id;
    });
    modal_container.innerHTML = ""

    modal_container.innerHTML += `
    <div class="modal">
    <i class="fa-solid fa-circle-xmark exit"></i>
    <div class="image">
        <img src="${"https://image.tmdb.org/t/p/w500" + movie[0].backdrop_path}" alt="">
    </div>
    <div class="right">
        <h2>${movie[0].title}</h2>
        <p class="text">
            Release-date:
            <span>${movie[0].release_date}</span>
        </p>
        <p class="text">
            Popularity
            <span>${movie[0].popularity}</span>
        </p>
        <p class="text">
            Original Language
            <span>${movie[0].original_language}</span>
        </p class="text">
        <h2>Overview:</h2>
        <div class="description">
            <p>
               ${movie[0].overview}
            </p>
        </div>
    </div>
</div>
    `



    modal_container.style = " left: 0;  transform: scale(1);";


    const exit = document.querySelector(".exit")


    exit.addEventListener("click", () => {
        modal_container.style = " left: 1400px; transform: scale(0);"
    })
}
const filterData = (id) => {
    if (id == 0) {
        writeData(movies);
    } else {
        const filterMovie = movies.filter((item) => {
            return item.genre_ids.includes(id)
        })
        writeData(filterMovie);
    }

}



btn1.addEventListener("click", () => {
    filterData(0);
    actiweBtn(btn1)
})
btn2.addEventListener("click", () => {
    filterData(35)
    actiweBtn(btn2)
})
btn3.addEventListener("click", () => {
    filterData(28)
    actiweBtn(btn3)
})
btn4.addEventListener("click", () => {
    filterData(53)
    actiweBtn(btn4)
})

const actiweBtn = (id) => {
    btn1.classList.remove("active")
    btn2.classList.remove("active")
    btn3.classList.remove("active")
    btn4.classList.remove("active")
    id.classList.add("active")
}










