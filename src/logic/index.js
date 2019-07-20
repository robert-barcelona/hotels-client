import axios from 'axios'

const server = 'http://localhost:4000'

export const searchAvailability = async (adults, children, checkin, checkout, promo_code) => {
  try {
    console.log(adults,children,checkin,checkout,promo_code)
    const settings = {
      method: 'post',
      url: `${server}/availability`,
      data: {
        adults,
        children,
        start: checkin,
        finish: checkout
      },

    }
    if (promo_code) settings.params = {promo_code}
    console.log(settings)
    const results = await axios(settings);
    return results.data
  } catch (e) {
    throw new Error(`Error in checking availability: ${e.message}`)
  }
}
