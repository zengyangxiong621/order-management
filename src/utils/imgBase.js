const reader = new FileReader()

export default function(file) {
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    return reader.result
  }
}
