import * as sapper from '@sapper/server'
import compression from 'compression'
import polka from 'polka'
import sirv from 'sirv'

const PORT = process.env.PORT
const mode = process.env.NODE_ENV
const dev: boolean = mode === "development"

const app = polka()

app.use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware(),
).listen(PORT, (err: any) => {
    if (err) console.log('error', err)
})