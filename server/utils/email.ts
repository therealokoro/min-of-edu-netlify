// import nodemailer from "nodemailer"
// import { useCompiler } from "#vue-email"

// type EmailPayload = {
//   to: string
//   content: string
//   name: string
// }
export async function sendMail({ to, content, name }){
  console.log("Mail sent",  to, content, name)
}

// export async function sendMail({ to, content, name }: EmailPayload) {
  // const config = useRuntimeConfig(useEvent())

  // try {
  //   const template = await useCompiler("Application.vue", {
  //     props: { name, content }
  //   })

  //   const transporter = nodemailer.createTransport({
  //     // @ts-expect-error
  //     host: config.emailHost,
  //     port: config.emailPort,
  //     secure: Number(config.emailPort) == 465 ? true : false,
  //     auth: {
  //       user: config.emailUser,
  //       pass: config.emailPass
  //     }
  //   })

  //   const options = {
  //     to,
  //     html: template.html,
  //     subject: 'Application Response',
  //     from: "contact@min-basic-edu-kebbi.com.ng"
  //   }

  //   transporter.sendMail(options, (err, info) => {
  //     if (err) throw new Error(err.message)
  //     console.log("Message sent: %s", info.messageId)
  //   })
  // } catch (e: any) {
  //   createError(e)
  // }
// }
