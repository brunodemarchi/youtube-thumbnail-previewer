// Real YouTube video references for realistic thumbnail previewing
// Thumbnails stored locally in /public/thumbs/{id}.jpg
const videoDatabase = [
  // ─── Music ───
  { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up (Official Music Video)', channel: 'Rick Astley', duration: '3:33', views: '1.6B views', age: '15 years ago' },
  { id: 'kJQP7kiw5Fk', title: 'Despacito ft. Daddy Yankee', channel: 'Luis Fonsi', duration: '4:42', views: '8.4B views', age: '8 years ago' },
  { id: '9bZkp7q19f0', title: 'PSY - GANGNAM STYLE', channel: 'officialpsy', duration: '4:13', views: '5.1B views', age: '13 years ago' },
  { id: 'JGwWNGJdvx8', title: 'Ed Sheeran - Shape of You', channel: 'Ed Sheeran', duration: '4:24', views: '6.3B views', age: '8 years ago' },
  { id: 'RgKAFK5djSk', title: 'Wiz Khalifa - See You Again ft. Charlie Puth', channel: 'Wiz Khalifa', duration: '3:58', views: '6.1B views', age: '10 years ago' },
  { id: 'OPf0YbXqDm0', title: 'Mark Ronson - Uptown Funk ft. Bruno Mars', channel: 'Mark Ronson', duration: '4:30', views: '5B views', age: '10 years ago' },
  { id: 'fRh_vgS2dFE', title: 'Justin Bieber - Sorry', channel: 'Justin Bieber', duration: '3:26', views: '3.7B views', age: '9 years ago' },
  { id: '60ItHLz5WEA', title: 'Alan Walker - Faded', channel: 'Alan Walker', duration: '3:33', views: '3.5B views', age: '9 years ago' },
  { id: 'CevxZvSJLk8', title: 'Katy Perry - Roar (Official)', channel: 'Katy Perry', duration: '4:30', views: '3.9B views', age: '12 years ago' },
  { id: 'e-ORhEE9VVg', title: 'Taylor Swift - Blank Space', channel: 'Taylor Swift', duration: '4:33', views: '3.3B views', age: '11 years ago' },
  { id: 'YQHsXMglC9A', title: 'Adele - Hello (Official Music Video)', channel: 'Adele', duration: '6:07', views: '3.3B views', age: '10 years ago' },
  { id: 'hT_nvWreIhg', title: 'OneRepublic - Counting Stars', channel: 'OneRepublic', duration: '4:44', views: '4B views', age: '12 years ago' },
  { id: 'FuXNumBwDOM', title: 'Imagine Dragons - Believer', channel: 'Imagine Dragons', duration: '3:37', views: '2.3B views', age: '8 years ago' },
  { id: 'fJ9rUzIMcZQ', title: 'Queen - Bohemian Rhapsody (Official Video Remastered)', channel: 'Queen Official', duration: '5:59', views: '1.8B views', age: '13 years ago' },
  { id: 'ktvTqknDobU', title: 'Imagine Dragons - Radioactive', channel: 'Imagine Dragons', duration: '3:06', views: '1.7B views', age: '12 years ago' },
  { id: 'aJOTlE1K90k', title: 'The Weeknd - Starboy ft. Daft Punk', channel: 'The Weeknd', duration: '3:50', views: '2.6B views', age: '8 years ago' },

  // ─── Tech / Educational ───
  { id: 'Tn6-PIqc4UM', title: 'React in 100 Seconds', channel: 'Fireship', duration: '2:27', views: '5M views', age: '3 years ago' },
  { id: 'w7ejDZ8SWv8', title: 'React JS Crash Course', channel: 'Traversy Media', duration: '1:48:47', views: '3.5M views', age: '4 years ago' },
  { id: 'HXV3zeQKqGY', title: 'Intro to Large Language Models', channel: 'Andrej Karpathy', duration: '59:47', views: '3.2M views', age: '1 year ago' },
  { id: 'rfscVS0vtbw', title: 'Learn Python - Full Course for Beginners', channel: 'freeCodeCamp', duration: '4:26:52', views: '42M views', age: '6 years ago' },

  // ─── Entertainment / MrBeast ───
  { id: 'erLbbextvlY', title: "I Ate The World's Largest Slice Of Pizza", channel: 'MrBeast', duration: '10:57', views: '124M views', age: '3 years ago' },
  { id: 'fMfipiV_17o', title: "Lamborghini vs World's Largest Shredder", channel: 'MrBeast', duration: '10:30', views: '157M views', age: '3 years ago' },
  { id: 'HEfHFsfGXjs', title: '7 Days Stranded At Sea', channel: 'MrBeast', duration: '17:55', views: '220M views', age: '2 years ago' },

  // ─── Science ───
  { id: 'VyHV0BRtdxo', title: 'Building the Perfect Squirrel Proof Bird Feeder', channel: 'Mark Rober', duration: '21:38', views: '105M views', age: '4 years ago' },
  { id: 'xuCn8ux2gbs', title: 'History of the Entire World, I Guess', channel: 'bill wurtz', duration: '19:26', views: '155M views', age: '8 years ago' },
  { id: 'OWJCfOvochA', title: 'How Gravity Actually Works', channel: 'Veritasium', duration: '17:34', views: '18M views', age: '2 years ago' },
  { id: 'dFCbJmgeHmA', title: 'The Egg - A Short Story', channel: 'Kurzgesagt', duration: '7:44', views: '33M views', age: '5 years ago' },

  // ─── Tech Reviews ───
  { id: 'GEZhD3J89ZE', title: "Apple Vision Pro Review: Tomorrow's Specs... Today!", channel: 'Marques Brownlee', duration: '29:03', views: '22M views', age: '1 year ago' },
  { id: 'dtp6b76pMak', title: 'I Bought Every iPhone Ever Made', channel: 'MrWhoseTheBoss', duration: '17:55', views: '28M views', age: '2 years ago' },

  // ─── Viral / Classic ───
  { id: 'jNQXAC9IVRw', title: 'Me at the zoo', channel: 'jawed', duration: '0:19', views: '310M views', age: '19 years ago' },
]

export default videoDatabase
