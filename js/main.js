

const shopingCartButton = document.getElementsByClassName('totals')[0]
const addCartMenu = document.getElementsByClassName('add_cart')[0]
const closemenuCartButton = document.getElementById('close_menu_cart')
const cartRows = addCartMenu.getElementsByClassName('cart_row')
const cartRowProduct = document.getElementsByClassName('cart-row-product')
const addCartButton = document.getElementsByClassName('add-product')
const productCartItems = document.getElementsByClassName('product_cart_item')[0]
const quantitiyInput = document.getElementsByName('quantitiy')

// const removeButton = cartRows.getElementsByClassName('remove_button')

document.addEventListener('DOMContentLoaded', ready)

function ready() {

	// remove Item From The Cart

	for (var i = 0; i < cartRows.length; i++) {
		const cartRow = cartRows[i]
		const removeButton = cartRow.getElementsByClassName('remove_button')

		for (var x = 0; x < removeButton.length; x++) {
			let button = removeButton[x]
			button.addEventListener('click', removeProductFromCart)
		}
	}
	// Cart Button
	for (let i = 0; i < addCartButton.length; i++) {

		let button = addCartButton[i]
		button.addEventListener('click', addItemToCart)


	}

	let quantitiyInput = document.getElementsByClassName('quantitiy')
	for (let n = 0; n < quantitiyInput.length; n++) {
		let quantity = quantitiyInput[n]
		quantity.addEventListener('change', quantityChange)
	}

}


function removeProductFromCart() {
	this.parentElement.parentElement.remove()
	updateCartTotal()
	checkAlert()

}

function addItemToCart(e) {
	let buttonClicked = e.target
	let titleProduct = buttonClicked.parentElement.children[0].textContent
	let priceProduct = buttonClicked.parentElement.children[3].textContent
	let imgSrc = buttonClicked.parentElement.children[1].src
	putItemToCart(titleProduct, priceProduct, imgSrc)
	updateCartTotal()
	checkAlert()


}


function putItemToCart(titleProduct, priceProduct, imgSrc) {


	let titleCartItems = addCartMenu.getElementsByClassName('title_cart_item')
	for (let i = 0; i < titleCartItems.length; i++) {
		titleCart = titleCartItems[i]
		if (titleCart.innerText === titleProduct) {
			alert(' you already add item to the cart')
			return
		}

	}

	let CartRowHTML = `	
	<div class="image_title_cart">
		<span class="title_cart_item">${titleProduct}</span>
		<img class="image_cart_item" src="${imgSrc}" alt="" />
	</div>
	<span class="price_cart_item">${priceProduct}</span>
	<div class="quantity_remove">
		<input type="number" value="1" class="quantitiy" placeholder="Quantity" />
		<button class="remove_button">
			<i class="fa fa-times" aria-hidden="true"></i>
		</button>
	</div>
`

	let newCartRow = document.createElement('li')
	newCartRow.classList.add('cart_row')
	productCartItems.appendChild(newCartRow)
	newCartRow.innerHTML = CartRowHTML

	let removeButton = newCartRow.getElementsByClassName('remove_button')[0]
	removeButton.addEventListener('click', removeProductFromCart)


	let quantitiyInput = newCartRow.getElementsByClassName('quantitiy')[0]

	quantitiyInput.addEventListener('change', quantityChange)
}







function updateCartTotal() {
	// console.log(productCartItems)
	let cartRows = productCartItems.getElementsByClassName('cart_row')
	let total = 0

	for (let i = 0; i < cartRows.length; i++) {
		let cartRow = cartRows[i]
		let quantityInput = cartRow.getElementsByClassName('quantitiy')[0]
		let priceElement = cartRow.getElementsByClassName('price_cart_item')[0]
		let quantitiy = quantityInput.value
		let price = parseFloat(priceElement.innerText.replace('EGP', ''))
		total = total + (quantitiy * price)
	}
	let priceDOM = document.getElementsByClassName('price')[0]
	priceDOM.innerText = total
}


function quantityChange(e) {
	let quantitySelected = e.target
	let quantitiy = quantitySelected.value
	if (isNaN(quantitiy) || quantitiy <= 0) {
		alert('Quantity Must Be bigger then one')
		quantitySelected.value = 1
	}
	updateCartTotal()


}

updateCartTotal()









closemenuCartButton.addEventListener('click', function () {
	addCartMenu.style.right = '-100%';
	addCartMenu.style.transform = 'scale(0)'

	checkAlert()

})

shopingCartButton.addEventListener('click', () => {
	addCartMenu.style.right = '0%';
	addCartMenu.style.transform = 'scale(1)'

	checkAlert()
})




function checkAlert() {
	if (productCartItems.childElementCount <= 1) {
		let emptyCart = document.getElementsByClassName('empty_cart')[0]
		emptyCart.style.display = 'block'
	} else if (productCartItems.childElementCount > 1) {
		let emptyCart = document.getElementsByClassName('empty_cart')[0]
		emptyCart.style.display = 'none'
	}

}














































