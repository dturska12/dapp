import run from '@xmtp/bot-starter'
import { Wallet } from 'ethers'
//@ts-ignore
import qrcode from 'qrcode-terminal'

const key = Wallet.createRandom().privateKey;
const wallet = new Wallet(key)

qrcode.generate(`https://go.cb-w.com/messaging?address=${wallet?.address}`)

console.log(`Your bot wallet address is ${wallet?.address}`)

export const botHandler = () => {
  run(async (context) => {
    // When someone sends your bot a message, you can get the DecodedMessage
    // from the HandlerContext's `message` field
    const messageBody = context.message.content;
  
    // To reply, just call `reply` on the HandlerContext.
    await context.reply(`ECHO: ${messageBody}`);
  })
}