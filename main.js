const API_URL_RANDOM ="https://api.thecatapi.com/v1/images/search?limit=2"
const API_URL_FAVORITES ="https://api.thecatapi.com/v1/favourites"
const API_URL_DELETE_FAVOURITE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`

async function loadRandomMichis()
{

    const res = await fetch(API_URL_RANDOM)
    const data = await res.json()
    console.log(data)

    if(res.status !== 200) {
      document.getElementById("error").innerHTML = "Error: "+ res.status
    } else {
        const img1 = document.getElementById('img1')
        img1.src = await data[0].url
        const img2 = document.getElementById('img2')
        img2.src = await data[1].url
        const btn1 = document.getElementById("btn1")
        btn1.onclick = ()  => saveFavourites(data[0].id)
        const btn2 = document.getElementById("btn2")
        btn2.onclick = () => saveFavourites(data[1].id)

    }
}

async function loadFavouriteMichis()
{

    const res = await fetch(API_URL_FAVORITES,{
            method: 'GET',
            headers:{
                'X-API-KEY':'live_XQzttnbYUzmpeBXgO0CfB3xTXCHSn6ZL1AKtPId5WNrx0SfdG8tPfmmqtx3tMPwj'
            }
    })
    const data = await res.json()
    console.log(data)
    console.log(res.status)
    if(res.status !== 200) {
        document.getElementById("error").innerHTML = "Error: "+ res.status
    } else {
        document.getElementById("favoriteMichis").innerHTML = ""
        const h2 = document.createElement("h2")
        const h2Text = document.createTextNode("Michis Favoritos")
        h2.appendChild(h2Text)
        document.getElementById("favoriteMichis").appendChild(h2)
        data.forEach(michi => {
            const section = document.getElementById("favoriteMichis")
            const article = document.createElement('article')
            const img = document.createElement('img')
            const btn = document.createElement('button')
            const btnText = document.createTextNode("Sacar al michi de favoritos")
            img.src = michi.image.url
            img.width = 150
            btn.appendChild(btnText)
            btn.onclick = () => deleteFavouriteMichi(michi.id)
            article.appendChild(img)
            article.appendChild(btn)
            section.appendChild(article)

        })
    }


}

async function saveFavourites(id){
    const res = await fetch(API_URL_FAVORITES,{
                                        method:'POST',
                                        headers:{
                                            'Content-Type':'application/json',
                                            'X-API-KEY':'live_XQzttnbYUzmpeBXgO0CfB3xTXCHSn6ZL1AKtPId5WNrx0SfdG8tPfmmqtx3tMPwj'

                                        },
                                        body: JSON.stringify(
                                            {
                                                    image_id:id
                                                  }
                                                            )}
                                        )
    const data = await res.json()
    console.log('Save')
    console.log(res)
    if(res.status !== 200) {
        document.getElementById("error").innerHTML = "Error: "+ res.status
    } else {
        await loadFavouriteMichis()
    }

}

async function deleteFavouriteMichi(id){
    const res = await fetch(API_URL_DELETE_FAVOURITE(id),{
        method:'DELETE',
        headers:{
            'X-API-KEY':'live_XQzttnbYUzmpeBXgO0CfB3xTXCHSn6ZL1AKtPId5WNrx0SfdG8tPfmmqtx3tMPwj'

         }
        }
    )
    const data = await res.json()

    if(res.status !== 200) {
        document.getElementById("error").innerHTML = "Error: "+ res.status
    } else {
        await loadFavouriteMichis()

    }
}

loadRandomMichis().then(r => console.log("Michis cargados"))
loadFavouriteMichis().then(r => console.log("hola"))