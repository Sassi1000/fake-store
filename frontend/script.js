let data = []
axios.get('http://localhost:3000/api/products')
    .then(res => {
        data = res.data.products;
        render(data)
    })
    .catch(err => {
        console.log(err);
        container.innerText = 'There is a problem'
    })

const container = document.querySelector('#container')
const search = document.querySelector('#search')
const select = document.querySelector('#select')
const checkbox = document.querySelector('#checkbox')

const render = productsArr => {
    container.innerHTML = ''
    productsArr.map(product => {
        container.appendChild(createCard(product))
    })
}

select.addEventListener('click', e => {
    const { value } = e.target //const value = e.target.value

    switch (value) {
        case 'low':
            render(data.toSorted((a, b) => a.price - b.price))
            break;
        case 'high':
            render(data.toSorted((a, b) => b.price - a.price))
            break;
        case 'none':
            render(data)
            break;
    }
})
const filterData = filter =>{
    let newData = data
    if(filter.cat.length){
         newData = newData.filter((item) => {
        return filter.cat.includes(item.cat)    
    })
    }
    if(filter.name.length){
         newData = newData.filter(product => product.name.toLowerCase().includes(filter.name.toLowerCase()))
    }
    render(newData)
}

const filter = {
    cat:[],
    name:''
}

search.addEventListener('input', e => {
    const { value } = e.target //const value = e.target.value
    filter.name = value
    filterData(filter)

})

checkbox.addEventListener('change', (e) => {
        if (e.target.checked) { filter.cat.push(e.target.value) }
        else {
            const indexOfRemove = filter.cat.indexOf(e.target.value)
            filter.cat.splice(indexOfRemove, 1)
        }
        filterData(filter)
})


const createCard = product => {
    const card = document.createElement('div')
    card.className = 'card'
    const img = document.createElement('img')
    img.src = product.image
    card.appendChild(img)
    const title = document.createElement('div')
    title.innerText = product.name
    title.className = 'title'
    card.appendChild(title)
    const category = document.createElement('div')
    category.innerText = product.cat
    category.className = 'description'
    card.appendChild(category)
    const price = document.createElement('div')
    price.innerText = product.price
    price.className = 'price'
    card.appendChild(price)

    return card
}
