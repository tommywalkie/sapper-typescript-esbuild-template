import * as sapper from '@sapper/server'
import * as compressionProxy from 'compression'
import * as polkaProxy from 'polka'
import * as sirvProxy from 'sirv'

const compression: any = (<any>compressionProxy).default || compressionProxy
const polka: any = (<any>polkaProxy).default || polkaProxy
const sirv: any = (<any>sirvProxy).default || sirvProxy

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