import type { PageContent } from "~~/server/prisma/generated/client"

export type IHeroSlide = {
  key: string
  name: string
  imgUrl: string
  position: string
}

export type IWelcomeAddress = {
  name: string
  position: string
  imgUrl: string
  body: string
}


export type IPageContent = PageContent & {
  heroSlider: IHeroSlide[],
  gallery: { img: string; title: string; name: string }[]
  welcomeAddress: IWelcomeAddress
  ourGoals: any
  statsCount: any
}