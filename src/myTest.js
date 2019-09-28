const fetch = require('node-fetch')


async function register(username, password, email, textMsg) {
    return await fetch('http://localhost:5000/register', {
        method: "post",
        credentials: 'include',
        body: JSON.stringify({username: username,
                                    password: password,
                                    email: email,
                                    textMsg: textMsg})
        });
}

async function login(username, password, rememberMe, textMsg) {
    return await fetch('http://localhost:5000/login', {
        method: "post",
        credentials: 'include',
        body: JSON.stringify({username: username,
                                    password: password,
                                    rememberMe: rememberMe,
                                    textMsg: textMsg})
        });
}

async function isLogin() {
    return await fetch('http://localhost:5000/isLogin', {
        credentials: 'include',
    });
}

async function add(username, product) {
    return await fetch('http://localhost:5000/add', {
        method: "put",
        credentials: 'include',
        body: JSON.stringify({
                            product: product,
                            username: username})
    })
}

async function increment(username, productId) {
    return await fetch('http://localhost:5000/increment', {
        method: "post",
        body: JSON.stringify({username: username, id: productId})
    });
}

async function decrement(username, productId) {
    return await fetch('http://localhost:5000/decrement', {
        method: "post",
        body: JSON.stringify({username: username, id: productId}),
    });
}

async function removeItem(username, productId) {
    return await fetch('http://localhost:5000/removeItem', {
        method: "delete",
        credentials: 'include',
        body: JSON.stringify({username: username, id: productId}),
    });
}

async function cart(username) {
    return await fetch('http://localhost:5000/cart',{
        method: 'POST',
        body: JSON.stringify({username: username})
    });
}

async function admin() {
    return await fetch('http://localhost:5000/admin', {});
}


// function callServer(methodType, path) {
//     return new Promise((resolve, reject) => {
//         const options = {
//             hostname: 'localhost',
//             port: 5000,
//             path: path,
//             method: methodType,
//         }
//
//
//         const req = http.request(options, (res) => {
//             console.log(`statusCode: ${res.statusCode}`)
//             res.on('data', (data) => {
//                 resolve(data)
//             })
//         })
//         req.on('error', (error) => {
//             console.error(error.toString())
//             reject(error);
//         })
//         req.end()
//     })
// }

//registering 3 users and checking them

//should print "OK"
register("Avi", "12345678","email@email.com", "")
    .then(res => res.text())
    .then(res => console.log(`Avi register message is: ${res}`))
    .catch(err => {console.error(err)})

//should print "username is taken"
register("Avi", "12345678","email@email.com", "")
    .then(res => res.text())
    .then(res => console.log(`Avi register message is: ${res}`))
    .catch(err => {console.error(err)})

//should print "The password is too short"
register("Beni", "11","email@email.com", "")
    .then(res => res.text())
    .then(res => console.log(`Beni register message is: ${res}`))
    .catch(err => {console.error(err)})

//should print "Invalid email address"
register("Beni", "11111111","email.com", "")
    .then(res => res.text())
    .then(res => console.log(`Beni register message is: ${res}`))
    .catch(err => {console.error(err)})

//should print "OK"
register("Beni", "12345678","email@email.com", "")
    .then(res => res.text())
    .then(res => console.log(`Beni register message is: ${res}`))
    .catch(err => {console.error(err)})

//should print "OK"
register("Gadi", "12345678","email@email.com", "")
    .then(res => res.text())
    .then(res => console.log(`Gadi register message is: ${res}`))
    .catch(err => {console.error(err)})

//should print "There is no username goes by this name"
login("Eazy-E", "12345678",false, "")
    .then(res => res.text())
    .then(res => console.log(`Eazy-E login message is: ${res}`))
    .catch(err => {console.error(err)})

//should print "Invalid password"
login("admin", "12345678",false, "")
    .then(res => res.text())
    .then(res => console.log(`admin login message is: ${res}`))
    .catch(err => {console.error(err)})

//should print "OK"
login("admin", "admin",false, "")
    .then(res => res.text())
    .then(res => console.log(`admin login message is: ${res}`))
    .catch(err => {console.error(err)})


//should print "count:1, total:10"
setTimeout(() => {add("Avi",{id: 0, price: 10, title:"p_id0"})
    .then(res => res.text())
    .then(res => {
        console.log(`Avi add message is: ${res}`)
    })
    .catch(err => {console.error(err)})}, 10000)

//should print "count:2, total:20"
setTimeout( () => {add("Avi",{id: 0, price: 10, title:"p_id0"})
    .then(res => res.text())
    .then(res => {
        console.log(`Avi add message is: ${res}`)
    })
    .catch(err => {console.error(err)})
},10000)

//should print "count:1, total:1010"
setTimeout( () => {add("Avi",{id: 10, price: 1010, title:"p_id10"})
    .then(res => res.text())
    .then(res => {
        console.log(`Avi add message is: ${res}`)
    })
    .catch(err => {console.error(err)})
},10000)

//should print "count:1, total:30"
setTimeout( () => {add("Gadi",{id: 3, price: 30, title:"p_id3"})
        .then(res => res.text())
        .then(res => {
            console.log(`Gadi add message is: ${res}`)
        })
        .catch(err => {console.error(err)})
},10000)

//should print "count:1, total:2"
setTimeout( () => {add("Beni",{id: 5, price: 2, title:"p_id5"})
    .then(res => res.text())
    .then(res => {
        console.log(`Beni add message is: ${res}`)
    })
    .catch(err => {console.error(err)})},10000)



//should print "count:3, total:30"
setTimeout( () => {increment("Avi",0)
    .then(res => res.text())
    .then(res => {
        console.log(`Avi increment message is: ${res}`)
    })
    .catch(err => {console.error(err)})},20000)



//should print "count:4, total:40"
setTimeout( () => {increment("Avi",0)
    .then(res => res.text())
    .then(res => {
        console.log(`Avi increment message is: ${res}`)
    })
    .catch(err => {console.error(err)})},20000)


//should print "count:0, total:0"
setTimeout( () => {decrement("Gadi",3)
    .then(res => res.text())
    .then(res => {
        console.log(`Gadi decrement message is: ${res}`)
    })
    .catch(err => {console.error(err)})
},20000)


//should print "count:0, total:0"
setTimeout( () => {removeItem("Beni", 5)
    .then(res => res.text())
    .then(res => {
        console.log(`Beni removeItem message is: ${res}`)
    })
    .catch(err => {console.error(err)})
},20000)

//should be with two products
setTimeout( () => {cart("Avi")
    .then(res => res.text())
    .then(res => {
        console.log(`Avi cart message is: ${res}`)
    })
    .catch(err => {console.error(err)})
},30000)

//should be with no products
setTimeout( () => {cart("Beni")
    .then(res => res.text())
    .then(res => {
        console.log(`Beni cart message is: ${res}`)
    })
    .catch(err => {console.error(err)})
},30000)

//should show all the activities
setTimeout( () => {admin().then(res => res.text())
    .then(res => {
        console.log(`admin admin message is: ${res}`)
    })
    .catch(err => {console.error(err)})},35000)



