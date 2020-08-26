export const splitItem = (label, row) => {
  label = label.replace(/\[(\w+)]/g, '.$1') // convert indexes to properties
  label = label.replace(/^\./, '')           // strip a leading dot
  const a = label.split('.')
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i]
    if (k in row) {
      row = row[k]
    } else {
      return
    }
  }
  return row
}