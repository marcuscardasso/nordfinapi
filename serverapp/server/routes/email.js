import express from 'express';
const ProtonMail = require('protonmail-api');
const router = express.Router();
const email = router;

email.get('/api/triggermail', (req, res) => {
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
          console.log('email sent successfully');
          res.status(200).send({
            message: 'email sent sucessfully'
          })
      }).catch(err => {
          console.log(err, 'there is a failure')
      })
});

export default email;