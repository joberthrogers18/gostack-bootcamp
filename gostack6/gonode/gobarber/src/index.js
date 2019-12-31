const server = require('./server.js')
const PORT = process.env.PORT || 3333

server.listen(PORT, () => {
  console.log(`Server is runnig at port ${PORT}`)
})
