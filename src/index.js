export default function styleInject(css, { insertAt } = {}) {
  if (!css || typeof document === 'undefined') return

  const ampStyleSelector = 'style[amp-custom]'

  const { appendChild, insertBefore, firstChild, querySelector } =
    document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')
  const ampStyle = querySelector(ampStyleSelector) || style

  switch (insertAt) {
    // AMP only allows a single <script> tag with an 'amp-custom' attribute set
    case 'amp':
      style.setAttribute('amp-custom', true)
      ampStyle.innerText += css

      if (!querySelector(ampStyleSelector)) {
        appendChild(ampStyle)
      }
      break
    // By default styleInject appends a new <style> tag in <head>
    case 'top':
    default:
      style.type = 'text/css'

      if (style.styleSheet) {
        style.styleSheet.cssText = css
      } else {
        style.appendChild(document.createTextNode(css))
      }

      if (firstChild && insertAt === 'top') {
        insertBefore(style, firstChild)
      } else {
        appendChild(style)
      }
  }
}
