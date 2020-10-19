import Images from '../models/Images'

export default {
  render(image: Images) {
    return {
      id: image.id,
      url: `http://192.168.0.15:3001/uploads/${image.path}`,
    }
  },
  renderMany(images: Images[]) {
    return images.map((image) => this.render(image))
  },
}
