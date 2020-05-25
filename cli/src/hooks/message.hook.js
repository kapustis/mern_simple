import {useCallback} from 'react'

export const useMessage = () => {
  return useCallback(text => {
    if (window.M && text) {
      if (Array.isArray(text)) {
        text.map(item => {
          return (window.M.toast({html: item.msg}))
        })
      } else {
        window.M.toast({html: text})
      }
    }
  }, [])
}
