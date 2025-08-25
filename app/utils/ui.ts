// @unocss-include

export type BadgeKeys =
  | "approved"
  | "pending"
  | "queried"
  | "inProgress"
  | "closed"
  | "posting"
  | "transfer"


export type ColorState = "success" | "warning" | "error" | "info" | "primary" | "secondary" | "neutral"
export const getBadgeStyling = (key: BadgeKeys) => {
  const badgeMap: Record<BadgeKeys, { text: string; color: ColorState }> = {
    approved: {
      text: "Approved",
      color: "success"
    },
    pending: {
      text: "Pending",
      color: "warning"
    },
    queried: {
      text: "Queried",
      color: "error"
    },
    inProgress: {
      color: "info",
      text: "In Progress"
    },
    closed: {
      color: "error",
      text: "Closed"
    },
    posting: {
      color: "info",
      text: "Posting"
    },
    transfer: {
      color: "success",
      text: "Transfer"
    }
  }

  return badgeMap[key as BadgeKeys]
}

export function isDateExpired(datetimeString: string | Date) {
  const givenDateTime = new Date(datetimeString).getTime()
  const currentDateTime = new Date().getTime()
  return givenDateTime < currentDateTime
}
