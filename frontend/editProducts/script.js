const container = document.querySelector('#container')
const dialog = document.querySelector('dialog')
const productKeys = ['name', 'cat', 'image', 'price']
let editProductDetails = {}

const getProducts = () => {
    axios.get('http://localhost:3000/api/products')
        .then(res => {
            render(res.data.products)
        })
        .catch(err => {
            console.log(err);
            container.innerText = 'There is a problem'
        })
}

const deleteProduct = id => {
    axios.delete(`http://localhost:3000/api/products/${id}`)
        .then(res => {
            getProducts()
            alert('Product deleted successfully')
        })
        .catch(err => alert(err))
}

const editProduct = (id, updatedProduct) => {
    axios.put(`http://localhost:3000/api/products/${id}`, updatedProduct)
        .then(res => {
            closePopup()
            getProducts()
            // alert('Product updated successfully')
        })
        .catch(err => alert(err))
}

const updateProduct = e => {
    const { name, value } = e.target
    if (name == 'price') {
        editProductDetails[name] = Number(value)
    } else {
        editProductDetails[name] = value
    }
}

const createForm = product => {
    const form = document.createElement('form')
    form.addEventListener('submit', e => {
        e.preventDefault()
        editProduct(product._id, editProductDetails)
    })
    form.addEventListener('input', updateProduct)
    const closeBtn = document.createElement('button')
    closeBtn.addEventListener('click', e => {
        e.preventDefault()
        closePopup()
    })
    closeBtn.innerText = 'X'
    form.append(closeBtn)
    const title = document.createElement('h2')
    title.innerText = 'Edit product'
    form.append(title)
    productKeys.map(key => {
        const input = document.createElement('input')
        input.name = key
        input.type = 'text'
        input.value = product[key]
        form.append(input)
    })
    const submit = document.createElement('input')
    submit.type = 'submit'
    submit.value = 'Done'
    form.append(submit)
    dialog.append(form)
}

const closePopup = () => {
    dialog.innerHTML = ''
    editProductDetails = {}
    dialog.close()
}

const openPopup = product => {
    editProductDetails = {
        name: product.name,
        cat: product.cat,
        image: product.image,
        price: product.price
    }
    createForm(product)
    dialog.showModal()
}

const createCard = product => {
    const card = document.createElement('div')
    const subContainer1 = document.createElement('div')
    subContainer1.className = 'subcontainer'
    const subContainer2 = document.createElement('div')
    subContainer2.className = 'subcontainer'
    card.className = 'card'
    const img = document.createElement('img')
    img.src = product.image
    subContainer1.appendChild(img)
    const title = document.createElement('div')
    title.innerText = product.name
    title.className = 'title'
    subContainer1.appendChild(title)
    const category = document.createElement('div')
    category.innerText = product.cat
    category.className = 'description'
    subContainer1.appendChild(category)
    const price = document.createElement('div')
    price.innerText = product.price
    price.className = 'price'
    subContainer1.appendChild(price)
    const delBtn = document.createElement('button')
    delBtn.innerText = 'Delete product'
    delBtn.addEventListener('click', e => deleteProduct(product._id))
    subContainer2.appendChild(delBtn)
    const EditBtn = document.createElement('button')
    EditBtn.innerText = 'Edit product'
    EditBtn.addEventListener('click', e => openPopup(product))
    subContainer2.appendChild(EditBtn)
    card.append(subContainer1, subContainer2)
    return card
}

const render = productsArr => {
    container.innerHTML = ''
    productsArr.map(product => {
        container.appendChild(createCard(product))
    })
}

getProducts()