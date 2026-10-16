import { useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { SchemeType } from "src/types"

type SetScheme = (scheme: SchemeType) => void

/**
 * kciter.so 를 따라 라이트 전용으로 고정한다.
 * react-notion-x 등 scheme 을 받는 쪽이 있어 훅 자체는 남겨둔다.
 */
const useScheme = (): [SchemeType, SetScheme] => {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: queryKey.scheme(),
    enabled: false,
    initialData: "light" as SchemeType,
  })

  const setScheme = () => {
    queryClient.setQueryData(queryKey.scheme(), "light")
  }

  return [data, setScheme]
}

export default useScheme
