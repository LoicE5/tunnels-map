import bcrypt from 'bcrypt'

// input is 3rd argument of node process
const passwords: string[] = process.argv.slice(2, process.argv.length).reverse()

if (!passwords || passwords.length <= 0) {
    console.error("You did not set a password to hash")
    process.exit(1)
}

for (const password of passwords) {
    bcrypt.hash(password, 10).then((hash: string) => {
        console.log(`${password} -> ${hash}`)
    })
}
