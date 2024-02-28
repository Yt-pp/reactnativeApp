const images = {
    1: require('./winter.jpg'),
    2: require('./karina.jpg'),
    3: require('./giselle.jpg'),
    4: require('./ningning.jpg'),
    // Add more items as needed
  };
  
  export default function imageSequence(itemId) {
    return images[itemId] || require('./defaultImage.jpg');
  }
  