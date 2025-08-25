export const omitProp = <T extends object, K extends keyof T>(
  obj: T,
  key: K
): Omit<T, K> => (({ [key]: _, ...rest }) => rest)(obj)

export const useSlugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

export const useFullname = (data: { [x: string]: any }) => {
  return `${data?.surname} ${data?.firstname}`
}