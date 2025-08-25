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
