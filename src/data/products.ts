
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: "1",
    name: "PlayStation 5",
    description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D audio, and an all-new generation of incredible PlayStation games.",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&q=80",
    category: "Console",
    features: [
      "Ultra-high speed SSD",
      "Haptic feedback",
      "Adaptive triggers",
      "3D Audio",
      "4K-TV Gaming up to 120fps"
    ],
    specifications: {
      "CPU": "x86-64-AMD Ryzen Zen 8 Cores / 16 Threads at 3.5GHz",
      "GPU": "10.28 TFLOPs, 36 CUs at 2.23GHz",
      "Memory": "16GB GDDR6",
      "Storage": "825GB SSD",
      "Optical Drive": "Ultra HD Blu-ray",
      "Resolution": "4K at 120Hz"
    },
    stock: 15,
    rating: 4.9
  },
  {
    id: "2",
    name: "Xbox Series X",
    description: "The Xbox Series X offers the most powerful gaming experience ever with 12 teraflops of processing power, true 4K gaming, and compatibility with thousands of titles across four generations of Xbox.",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&q=80",
    category: "Console",
    features: [
      "True 4K Gaming",
      "120fps Gaming",
      "Quick Resume for multiple games",
      "Smart Delivery",
      "Xbox Game Pass compatibility"
    ],
    specifications: {
      "CPU": "8-core AMD Zen 2 CPU at 3.8GHz",
      "GPU": "12 TFLOPs, 52 CUs at 1.825GHz",
      "Memory": "16GB GDDR6",
      "Storage": "1TB Custom NVME SSD",
      "Optical Drive": "4K UHD Blu-ray",
      "Resolution": "True 4K at 60Hz, up to 120Hz"
    },
    stock: 10,
    rating: 4.8
  },
  {
    id: "3",
    name: "Nintendo Switch OLED",
    description: "The Nintendo Switch OLED model features a vibrant 7-inch OLED screen, a wide adjustable stand, enhanced audio, and 64GB of internal storage.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&q=80",
    category: "Console",
    features: [
      "7-inch OLED screen",
      "Wide adjustable stand",
      "Enhanced audio",
      "64GB internal storage",
      "Wired LAN port"
    ],
    specifications: {
      "CPU/GPU": "NVIDIA Custom Tegra processor",
      "Memory": "4GB",
      "Storage": "64GB (expandable with microSD)",
      "Display": "7.0 inch OLED screen, 1280x720",
      "Battery Life": "4.5-9 hours",
      "Connectivity": "Wi-Fi, Bluetooth 4.1, Wired LAN (in dock)"
    },
    stock: 20,
    rating: 4.7
  },
  {
    id: "4",
    name: "Steam Deck",
    description: "The Steam Deck is a powerful handheld gaming PC that lets you play your Steam games wherever you go, with controls designed for precision gameplay.",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1678730505534-15a69660e964?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&q=80",
    category: "Handheld",
    features: [
      "Portable PC gaming",
      "Custom AMD APU",
      "7-inch touchscreen",
      "Trackpads and gyro controls",
      "SteamOS with desktop mode"
    ],
    specifications: {
      "CPU": "AMD Zen 2 4c/8t, 2.4-3.5GHz",
      "GPU": "AMD RDNA 2, 8 CUs at 1.0-1.6GHz",
      "Memory": "16GB LPDDR5 RAM",
      "Storage": "64GB eMMC / 256GB NVMe SSD / 512GB NVMe SSD",
      "Display": "7-inch LCD touchscreen, 1280x800, 60Hz",
      "Battery": "40WHr, 2-8 hours of gameplay"
    },
    stock: 8,
    rating: 4.6
  },
  {
    id: "5",
    name: "Xbox Series S",
    description: "Experience next-gen speed and performance with the Xbox Series S, the smallest, sleekest Xbox ever. This all-digital console delivers 1440p gaming at up to 120 FPS.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1640955014216-75201056c829?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&q=80",
    category: "Console",
    features: [
      "All-Digital",
      "1440p Gaming at up to 120fps",
      "Quick Resume",
      "Smart Delivery",
      "Xbox Game Pass compatibility"
    ],
    specifications: {
      "CPU": "8-core AMD Zen 2 CPU at 3.6GHz",
      "GPU": "4 TFLOPS, 20 CUs at 1.565GHz",
      "Memory": "10GB GDDR6",
      "Storage": "512GB Custom NVMe SSD",
      "Optical Drive": "None",
      "Resolution": "1440p at 60Hz, up to 120Hz"
    },
    stock: 25,
    rating: 4.5
  },
  {
    id: "6",
    name: "Nintendo Switch Lite",
    description: "The Nintendo Switch Lite is a compact, lightweight Nintendo Switch system dedicated to handheld play, with integrated controls and compatible with all physical and digital Nintendo Switch games that support handheld mode.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1605301652377-3e793ada7378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&q=80",
    category: "Handheld",
    features: [
      "Dedicated handheld design",
      "Compact and lightweight",
      "Built-in control pad",
      "Compatible with all handheld-mode games",
      "Multiple color options"
    ],
    specifications: {
      "CPU/GPU": "NVIDIA Custom Tegra processor",
      "Memory": "4GB",
      "Storage": "32GB (expandable with microSD)",
      "Display": "5.5 inch LCD screen, 1280x720",
      "Battery Life": "3-7 hours",
      "Weight": "275g"
    },
    stock: 30,
    rating: 4.4
  }
];
