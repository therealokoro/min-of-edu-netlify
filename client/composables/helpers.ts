export const useFullname = (data: { [x: string]: any }) => {
  return `${data?.surname} ${data?.firstname}`
}

export const useSlugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

export const useTablePaginate = (
  data: any[],
  page: MaybeRef<number>,
  count: number
) => {
  const _page = isRef(page) ? page : ref(page)
  return computed(() => {
    return data.slice((_page.value - 1) * count, _page.value * count)
  }).value
}
