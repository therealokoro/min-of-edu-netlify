import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function seedSuperAdmin() {
  const email = process.env.SUPER_ADMIN_EMAIL
  if (!email) throw Error("Super admin credentials not set")

  const superAdmin = await prisma.user.findUnique({ where: { email } })
  if (!superAdmin) {
    await prisma.user.create({
      data: {
        surname: "Super",
        firstname: "Admin",
        phoneNumber: "00000000000",
        email: email,
        role: "Admin"
      }
    })

    console.log("Super admin created, end database seeding...")
  } else {
    console.log("Super admin already exists, end database seeding...")
  }
}

async function seedPageContent() {
  console.log("Start seeding page content...")
  const slides = [
    {
      key: "slider-1",
      imgUrl: "/tinubu.jpg",
      name: "Bola Ahmed Tinubu (GCFR)",
      position: "President, Federal Republic of Nigeria"
    },
    {
      key: "slider-2",
      imgUrl: "/kaura.jpg",
      name: "Comrade Dr. Nasir Idris (Kauran Gwandu)",
      position: "Executive Governor, Kebbi State"
    },
    {
      key: "slider-3",
      imgUrl: "/tafida.jpg",
      name: "Umar Abubakar (Tafidan Kabi)",
      position: "Deputy Governor, Kebbi State"
    },
    {
      key: "slider-4",
      imgUrl: "/commissioner-2.jpg",
      name: "Dr. Halimatu Muhammad Bande",
      position: "Hon. Commissioner For Basic and Secondary Education"
    },
    {
      key: "slider-5",
      imgUrl: "/perm-sec.jpg",
      name: "Abubakar Magaji Nayilwa",
      position: "Permanent Secretary, Min. For Basic and Secondary Education"
    }
  ]

  const welcomeAddress = {
    name: "Dr. Halimatu Muhammad Bande",
    position: "COMMISSIONER",
    imgUrl: "/commissioner.jpg",
    body: `<p>
              You're warmly welcome to the official Website of the Kebbi State
              Ministry for Basic and Secondary Education, located at the State
              Secretariat complex Gwadangaji.
            </p>
            <p>
              Our Ministry is the top in ranking of the Ministries in Kebbi
              State being a Ministry for Education, the foundation and mother of
              all disciplines and professions..
            </p>
            <p>
              We're mandated to provide every citizen of Kebbi State with access
              to basic and secondary education which is the fundamental human
              right.
            </p>
            <div v-if="showFullWelcomeMsg">
              <p>
                We strive to uphold our constitutional mandates on education
                which include but not limited to Research, planning,
                coordinating, monitoring and controlling education, through
                teaching and learning processes in the Primary and Secondary
                schools across Kebbi State.
              </p>
              <p>
                We're also committed to complement the effort of the present
                Administration to revive and improve the education sector in the
                State.
              </p>
              <p>
                Education is the brighter future of everyone; therefore, we
                strive to ensure development of education in Kebbi State. We
                appreciate you for sparing a time to visit our official website.
              </p>
              <p text="center accent">
                Long live Kebbi State and Federal Republic of Nigeria.
              </p>
            </div>`
  }

  const statsCount = {
    lgas: "22",
    schools: "94",
    students: "49",
    teachers: "87"
  }

  const count = await prisma.pageContent.count()
  if (!count) {
    await prisma.pageContent.create({
      data: { heroSlider: slides, welcomeAddress, statsCount }
    })
  }
  console.log("End seeding page content...")
}

async function main() {
  console.log("start database seeding...")
  await seedSuperAdmin()
  await seedPageContent()
}

try {
  await main()
  await prisma.$disconnect()
} catch (e: any) {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
}
