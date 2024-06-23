// @unocss-include

export type BadgeKeys =
  | "approved"
  | "pending"
  | "queried"
  | "inProgress"
  | "closed"
  | "posting"
  | "transfer"

export const getBadgeStyling = (key: string) => {
  const badgeMap: Record<BadgeKeys, { text: string; color: string }> = {
    approved: {
      text: "Approved",
      color: "green"
    },
    pending: {
      text: "Pending",
      color: "orange"
    },
    queried: {
      text: "Queried",
      color: "red"
    },
    inProgress: {
      color: "blue",
      text: "In Progress"
    },
    closed: {
      color: "red",
      text: "Closed"
    },
    posting: {
      color: "blue",
      text: "Posting"
    },
    transfer: {
      color: "green",
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
