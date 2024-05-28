import Mermaid from 'mermaid'
import './styles/main.css'

export interface Message {
  type: string
  payload: {
    path?: string
    code?: string
    width?: number
    height?: number
    theme?: string
    lang?: string
  }
}

export const renderMermaid = async (code?: string) => {
  const element = document.querySelector('#mermaid')

  if (!code || !element) return

  const { svg, bindFunctions } = await Mermaid.render('graph', code)
  element.innerHTML = svg
  bindFunctions?.(element)
}

window.onload = () => {
  Mermaid.initialize({
    startOnLoad: true,
    theme: 'forest',
    securityLevel: 'loose',
    flowchart: {
      useMaxWidth: false,
      htmlLabels: true,
      curve: 'linear'
    }
  })
}

window.addEventListener('message', (event) => {
  const message = JSON.parse(event.data) as Message
  const data = message.payload

  if (message.type === 'render' && data.path) {
    renderMermaid(data.code)
  }
})
