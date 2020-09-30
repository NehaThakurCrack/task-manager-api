const sendGrid= require('@sendgrid/mail')
const SENDGRID_API_KEY='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'
sendGrid.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeEmail= (name, email)=>{
const msg={
    to: email,
    from: 'nt716215@gmail.com',
    subject: 'Welcome to the organization',
    text: 'Hi'+name+', we are glad to see you here!'
}
sendGrid.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
    // console.log(error.response.body.errors[0].message)
})

}
const sendCancelEmail= (name, email)=>{
    const msg={
        to: email,
        from: 'nt716215@gmail.com',
        subject: 'Going out from the organization',
        text: 'Hi'+name+', we are apologize to not satisfied your requirement, Please help us to know reason why are you leaving!'
    }
    sendGrid.send(msg).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })
    
    }
module.exports= {
    sendWelcomeEmail,
    sendCancelEmail
}