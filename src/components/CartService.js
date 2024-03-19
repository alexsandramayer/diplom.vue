export default {
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),

    getCartItem(productId) {
        return this.cartItems.find(item => item.id === productId);
    },

    addToCart(product, count) {
        const existingItem = this.getCartItem(product.id);

        if (existingItem) {
            existingItem.count += count;
        } else {
            const cartItem = { ...product, count };
            this.cartItems.push(cartItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
}
