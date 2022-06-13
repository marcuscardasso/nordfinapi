/*const ProtonMail = require('protonmail-api');

(async () => {
  const pm = await ProtonMail.connect({
    username: "marcuscardosso@protonmail.com", 
    password: "7x5fPF7zfBmfkuB"
  })

  await pm.sendEmail({
    to: 'nerdyemmanuel@gmail.com',
    subject: 'Send email tutorial',
    body: 'Hello world'
  })

  pm.close()
})().then(() => {
    console.log('email sent successfully')
}).catch(err => {
    console.log(err, 'there is a failure')
})*/

console.log(process.cwd())