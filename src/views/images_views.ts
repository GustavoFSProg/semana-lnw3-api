import Images from '../models/Images'

export default {
  render(image: Images) {
    return {
      id: image.id,
      url: `https://happy-nlw3-app.herokuapp.com/uploads/${image.path}`,
    }
  },
  renderMany(images: Images[]) {
    return images.map((image) => this.render(image))
  },
}
