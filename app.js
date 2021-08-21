const db = firebase.firestore()

const template = ((title, rating, image) => {
    return (
        `<div class="card">
            <div class="card-image">
            <figure class="image is-3by4">
                <img src="${image}" alt="${title}">
            </figure>
            </div>
            <div class="content p-2">
            <p class="title is-6">${title}</p>
            <p class="subtitle is-5 has-text-link"><b>${rating}/100</b></p>
            </div>
        </div>`
    )
})

const create_movie_element = ((title, rating, image) => {
    let div = document.createElement("div")
    div.setAttribute("class", "column is-2")
    div.innerHTML = template(title, rating, image)
    document.getElementById("movies").appendChild(div)
})

db.collection("movies").orderBy("rating", "desc").get().then((movies) => {
    movies.forEach((movie) => {
        let { name, rating, image } = movie.data()
        create_movie_element(name, rating, image)
    })
})