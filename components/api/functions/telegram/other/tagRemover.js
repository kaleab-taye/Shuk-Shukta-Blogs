export default function tagRemover(text) {
    const reg = new RegExp(/\<\/?\w*\W*>/)
  return (
    text.split(reg).join('')
  )
}
