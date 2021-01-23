export const getCookie = (name) => {
  let arr = document.cookie.match(RegExp('(^| )' + name + '=([^;]*)(;|$)'))
  return (arr != null) ? unescape(arr[2]) : null
}

export const setCookies = (param) => {
  for (let key in param) {
    setCookie(key, param[key], 7)
  }
}

export const setCookie = (name, value, expireDays) => {
  if (name) {
    let expires
    if (expireDays) {
      let date = new Date()
      date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000))
      expires = ';expires=' + date.toGMTString()
    } else {
      expires = ''
    }

    window.document.cookie = name + '=' + value + ' ' + expires + ';path=/'
  }
}

export const filterJson = (object) => {
  for (let i in object) {
    let value = object[i]
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length == 0) {
          delete object[i]
          continue
        }
      }
      filterJson(value)
      if (_isEmpty(value)) {
        delete object[i]
      }
    } else if (value === '' || value === null || value === undefined) {
      delete object[i]
    }
  }
  return object
}

const _isEmpty = (object) => {
  for (let name in object) {
    return false
  }
  return true
}