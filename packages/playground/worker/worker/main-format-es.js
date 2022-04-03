// run when format es
import NestedWorker from '../emit-chunk-nested-worker?worker'

function text(el, text) {
  document.querySelector(el).textContent = text
}

text('.format-es', 'format es:')

const nestedWorker = new NestedWorker()
const dataList = []
nestedWorker.addEventListener('message', (ev) => {
  dataList.push(ev.data)
  text(
    '.emti-chunk-worker',
    JSON.stringify(
      dataList.sort(
        (a, b) => JSON.stringify(a).length - JSON.stringify(b).length
      )
    )
  )
})

const dynamicImportWorker = new Worker(
  new URL('../emit-chunk-dynamic-import-worker.js', import.meta.url),
  {
    type: 'module'
  }
)
dynamicImportWorker.addEventListener('message', (ev) => {
  text('.emti-chunk-dynamic-import-worker', JSON.stringify(ev.data))
})

const moduleWorker = new Worker(
  new URL('../module-and-worker.js', import.meta.url),
  { type: 'module' }
)

moduleWorker.addEventListener('message', (ev) => {
  text('.module-and-worker-worker', JSON.stringify(ev.data))
})
