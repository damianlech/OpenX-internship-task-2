const logUsers = async () => {
    const response = await fetch("https://fakestoreapi.com/users");
    return await response.json();
}

const logCarts = async () => {
    const response = await fetch("https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07");
    return await response.json();
}

const logProducts = async () => {

    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
}

const printProducts = (products) => {
    const productList = [];

    // Iterate over products and save each category with sum of value in the prodcutList array
    for (product of products) {
        const { category, price } = product;
        if (!productList.some(obj => obj.category === category)) {
            productList[productList.length] = { category: category, price: price }
        } else {
            const index = productList.findIndex(obj => obj.category === category);
            productList[index].price = parseFloat((productList[index].price + price).toFixed(2));
        }
    }
    // Assertion to check if the productList contains at least one object
    if (productList.length === 0) {
        return ('printProducts() failed: productList should contain at least one object');
    }

    // Assertion to check if the productList is an array of objects
    if (!Array.isArray(productList) || !productList.every(obj => typeof obj === 'object')) {
        return ('printProducts() failed: productList should be an array of objects');
    }

    // Assertion to check if the price property of each object in the productList is a number
    if (!productList.every(obj => typeof obj.price === 'number')) {
        return ('printProducts() failed: the price property of each object in productList should be a number');
    }

    // If all the assertions succeded, return product list 
    return productList;
}

const printCarts = (users, carts, products) => {

    // Create an object that will be updated with the highest value cart
    const highestValueCart = {
        id: null,
        value: 0,
        fullname: null
    }

    // For every cart calculate total value and if its higher then value saved in highestValueCart - update it
    for (cart of carts) {
        const { id, userId } = cart;
        let tempValue = 0;

        for (cartProduct of cart.products) {
            const { productId, quantity } = cartProduct;
            const productsIndex = products.findIndex(obj => obj.id === productId);
            tempValue += products[productsIndex].price * quantity;
        }

        if (highestValueCart.value < tempValue) {
            const userIndex = users.findIndex(obj => obj.id === userId);
            const userFullname = `${users[userIndex].name.firstname} ${users[userIndex].name.lastname}`;
            highestValueCart.id = id;
            highestValueCart.value = tempValue;
            highestValueCart.fullname = userFullname;
        }
    }

    // Assertion to check if the value property of the returned object is greater than zero
    if (highestValueCart.value <= 0) {
        return ('printCarts() failed: the "value" property of the result object should be greater than zero');
    }

    // Assertion to check if the id property of the returned object is not null
    if (highestValueCart.id === null) {
        return ('printCarts() failed: the "id" property of the result object should not be null');
    }

    // Assertion to check if the fullname property of the returned object is not null or empty
    if (!highestValueCart.fullname || highestValueCart.fullname.trim().length === 0) {
        return ('printCarts() failed: the "fullname" property of the result object should not be null or empty');
    }

    // If all the assertions succeded, return the cart object 
    return highestValueCart;
}

const printUsers = (users) => {

    // Create an object that will be updated with the two users living the furthest
    const twoFurthestUsers = {
        id1: null,
        user1Fullname: null,
        id2: null,
        user2Fullname: null,
        distance: null
    }

    // Iterate trough every pair of users to find out the distance between them
    for (let i = 0; i < users.length - 1; i++) {
        for (let j = i + 1; j < users.length; j++) {

            const lat1 = users[i].address.geolocation.lat;
            const lon1 = users[i].address.geolocation.long;
            const user1Id = users[i].id;
            const user1Fullname = `${users[i].name.firstname} ${users[i].name.lastname}`;
            const lat2 = users[j].address.geolocation.lat;
            const lon2 = users[j].address.geolocation.long;
            const user2Id = users[j].id;
            const user2Fullname = `${users[j].name.firstname} ${users[j].name.lastname}`;

            const distance = getDistance(lat1, lon1, lat2, lon2);

            // Save users id, their fullname and the distance if it's highest yet
            if (distance > twoFurthestUsers.distance) {
                twoFurthestUsers.id1 = user1Id;
                twoFurthestUsers.user1Fullname = user1Fullname;
                twoFurthestUsers.id2 = user2Id;
                twoFurthestUsers.user2Fullname = user2Fullname;
                twoFurthestUsers.distance = distance;
            }
        }
    }

    // Assertion to check if the id1 property of the returned object is not null
    if (twoFurthestUsers.id1 === null) {
        return ('printCarts() failed: the "id1" property of the result object should not be null');
    }

    // Assertion to check if the id2 property of the returned object is not null
    if (twoFurthestUsers.id2 === null) {
        return ('printCarts() failed: the "id2" property of the result object should not be null');
    }

    // Assertion to check if the user1Fullname property of the returned object is not null
    if (twoFurthestUsers.user1Fullname === null) {
        return ('printCarts() failed: the "user1Fullname" property of the result object should not be null');
    }

    // Assertion to check if the user2Fullname property of the returned object is not null
    if (twoFurthestUsers.user2Fullname === null) {
        return ('printCarts() failed: the "user2Fullname" property of the result object should not be null');
    }

    // Assertion to check if the distance property of the returned object is not null
    if (twoFurthestUsers.distance === null) {
        return ('printCarts() failed: the "distance" property of the result object should not be null');
    }

    // If all the assertions succeded, return the twoFurthestUsers object 
    return twoFurthestUsers;
}

// Define the Haversine formula function to calculate distance
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
}

// Assertion to check if the fetch was successfull
(async () => {
    try {
        const users = await logUsers();
        const carts = await logCarts();
        const products = await logProducts();
        const task1Result = printProducts(products);
        const task2Result = printCarts(users, carts, products);
        const task3Result = printUsers(users);
        console.log(`1. Data structure containing all available product categories and the total value of products of a given category:\n`, task1Result);
        console.log(`2. A cart with the highest value, determines its value and full name of its owner:\n`, task2Result);
        console.log(`3. Two users living the furthest away from each other:\n`, task3Result);
    } catch (error) {
        console.error(`Error fetching data!,\nError: ${error.name} with a number of: ${error.cause.errno}`);
    }
})();