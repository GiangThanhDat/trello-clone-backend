const mapOrder = (array, order, key = "id") =>
  array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))

export { mapOrder }
