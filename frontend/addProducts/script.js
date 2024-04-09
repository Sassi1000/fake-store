const form = document.querySelector('#form')
let formDetails = {}
form.addEventListener('input', e => {
    const { name, value } = e.target
    if (name == 'price') {
        formDetails[name] = Number(value)
    } else {
        formDetails[name] = value
    }
})

form.addEventListener('submit', async e => {
    e.preventDefault()
    const result = await axios.post('http://localhost:3000/api/products', formDetails)
    form.reset()
    formDetails = {}
})
