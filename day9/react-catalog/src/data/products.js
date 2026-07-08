// Product catalogue data with realistic Indian pricing
export const PRODUCTS = [
  { id:1,  name:"ProSound Headphones X1",   category:"Audio",      emoji:"🎧", price:4999,  oldPrice:7499,  rating:4.8, reviews:2341, badge:"sale",  desc:"Active noise cancellation with 30-hr battery & Hi-Res Audio." },
  { id:2,  name:"ZenWatch Ultra Pro",        category:"Wearable",   emoji:"⌚", price:12999, oldPrice:18999, rating:4.6, reviews:876,  badge:"best",  desc:"AMOLED always-on display with health monitoring & GPS." },
  { id:3,  name:"BoomBox Portable Speaker",  category:"Audio",      emoji:"🔊", price:3499,  oldPrice:4999,  rating:4.4, reviews:1523, badge:"hot",   desc:"360° surround sound with 20W output & IPX7 waterproofing." },
  { id:4,  name:"AeroBook Pro 15",           category:"Laptop",     emoji:"💻", price:74999, oldPrice:89999, rating:4.9, reviews:409,  badge:"new",   desc:"Intel Core Ultra 9, 32GB RAM, 2TB NVMe — creator's dream." },
  { id:5,  name:"GhostClick Gaming Mouse",   category:"Gaming",     emoji:"🖱️", price:2199,  oldPrice:3299,  rating:4.3, reviews:3219, badge:"sale",  desc:"25600 DPI optical sensor, 6 programmable buttons, RGB." },
  { id:6,  name:"NovaPad Tablet X10",        category:"Tablet",     emoji:"📱", price:29999, oldPrice:39999, rating:4.5, reviews:762,  badge:"best",  desc:"12.9\" OLED, Snapdragon 8 Gen 3, 256GB storage + S-Pen." },
  { id:7,  name:"CrystalBuds Pro TWS",       category:"Audio",      emoji:"🎵", price:1899,  oldPrice:2999,  rating:4.2, reviews:5104, badge:"hot",   desc:"Hybrid ANC, 8mm drivers, 40-hr total battery, IPX5 rated." },
  { id:8,  name:"KeyForce RGB Keyboard",     category:"Gaming",     emoji:"⌨️", price:5499,  oldPrice:7999,  rating:4.7, reviews:987,  badge:"new",   desc:"Cherry MX Red switches, per-key RGB, full aluminum frame." },
  { id:9,  name:"VisionCam 4K Webcam",       category:"Camera",     emoji:"📷", price:6999,  oldPrice:8499,  rating:4.5, reviews:634,  badge:"best",  desc:"Sony CMOS 4K/60fps, auto-focus AI, built-in stereo mic." },
  { id:10, name:"HaloDisplay 27\" Monitor",  category:"Display",    emoji:"🖥️", price:22999, oldPrice:31999, rating:4.8, reviews:1230, badge:"sale",  desc:"QHD 165Hz IPS, 1ms response, HDR400, 99% sRGB coverage." },
  { id:11, name:"ChargePad 65W GaN",         category:"Accessory",  emoji:"🔋", price:2499,  oldPrice:3499,  rating:3.9, reviews:892,  badge:"hot",   desc:"65W GaN fast charger, 3 ports, universal compatibility." },
  { id:12, name:"PixelPhone Z9 Ultra",        category:"Smartphone", emoji:"📲", price:54999, oldPrice:69999, rating:4.9, reviews:5821, badge:"new",   desc:"200MP camera, Snapdragon 8 Elite, 6000mAh, 100W charge." },
  { id:13, name:"DeskHub 7-Port USB-C",       category:"Accessory",  emoji:"🔌", price:1799,  oldPrice:2499,  rating:4.0, reviews:2110, badge:"sale",  desc:"7-in-1 hub: 4K HDMI, 100W PD, SD card, 3×USB-A ports." },
  { id:14, name:"StealthCam Security Kit",    category:"Security",   emoji:"📹", price:8499,  oldPrice:11999, rating:4.3, reviews:423,  badge:"best",  desc:"2K night vision, motion detection, 30-day cloud storage." },
  { id:15, name:"CloudStore 2TB SSD",         category:"Storage",    emoji:"💾", price:9999,  oldPrice:13999, rating:4.6, reviews:1780, badge:"hot",   desc:"7400MB/s read speed, PCIe 5.0 NVMe, 5-year warranty." },
  { id:16, name:"AirPrint Laser Pro",         category:"Printer",    emoji:"🖨️", price:15499, oldPrice:21999, rating:3.7, reviews:311,  badge:"new",   desc:"Wireless duplex laser, 40ppm, ADF, touch-screen display." },
  { id:17, name:"StreamDeck XL Elite",        category:"Gaming",     emoji:"🎮", price:18999, oldPrice:24999, rating:4.7, reviews:643,  badge:"best",  desc:"32 LCD keys, fully customizable, works with OBS & Adobe." },
  { id:18, name:"CoolMax CPU Cooler 360",     category:"PC Parts",   emoji:"❄️", price:7499,  oldPrice:9999,  rating:4.5, reviews:892,  badge:"new",   desc:"360mm AIO liquid cooler, ARGB pump head, 6-year warranty." },
];

export const CATEGORIES = ["All", ...new Set(PRODUCTS.map(p => p.category))];

export const BADGE_MAP = {
  sale: { label:"Sale",     cls:"badge-sale" },
  new:  { label:"New",      cls:"badge-new"  },
  hot:  { label:"Hot 🔥",   cls:"badge-hot"  },
  best: { label:"Best Pick",cls:"badge-best" },
};

export function formatPrice(n) {
  return "₹" + n.toLocaleString("en-IN");
}

export function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i)           stars.push("full");
    else if (rating >= i - 0.5) stars.push("half");
    else                       stars.push("empty");
  }
  return stars;
}
