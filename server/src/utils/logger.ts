export const info = (...params) => {
  process.env.NODE_ENV !== 'test' ? console.log(...params) : null
}

export const error = (...params) => {
  process.env.NODE_ENV !== 'test' ? console.error(...params) : null
}

export default {
  info,
  error
}
