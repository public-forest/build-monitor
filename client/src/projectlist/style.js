import { images } from '../config'

export const style = {
  container: {
    // backgroundColor: 'white',
    backgroundImage: `url(${images.background})`,
    backgroundRepeat: 'repeat',
    backgroundAttachment: 'fixed',
    width: '100vw',
    height: '100vh',

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',

    overflow: 'scroll',
    backgroundPosition: 'center',
  },
};

export default style;