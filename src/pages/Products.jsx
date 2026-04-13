import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowRight, ShoppingCart, Search, X } from 'lucide-react'
import TiltCard from '../components/TiltCard'
import RevealText from '../components/RevealText'
import ShimmerButton from '../components/ShimmerButton'
import { useCart } from '../context/CartContext'

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Filter groups */
const filterGroups = [
  { label: 'All Brands & Categories', value: 'All', type: 'all' },
  { label: 'Sonoff', value: 'Sonoff', type: 'brand' },
  { label: 'Tuya', value: 'Tuya', type: 'brand' },
  { label: 'Summao', value: 'Summao', type: 'brand' },
  { label: 'Switches', value: 'Switches', type: 'category' },
  { label: 'Plugs', value: 'Plugs', type: 'category' },
  { label: 'Sensors', value: 'Sensors', type: 'category' },
  { label: 'Lighting', value: 'Lighting', type: 'category' },
  { label: 'Security', value: 'Security', type: 'category' },
  { label: 'Curtains', value: 'Curtains', type: 'category' },
  { label: 'Energy', value: 'Energy', type: 'category' },
  { label: 'Thermostats', value: 'Thermostats', type: 'category' },
]

const products = [
  // ===== SONOFF =====
  { id: 1,  name: 'Basic Smart Switch',          model: 'Sonoff BASICR2',           brand: 'Sonoff',  category: 'Switches', badge: 'BESTSELLER', color: '#E00000', img: 'basicr2_real',          desc: 'WiFi relay switch. Installs behind any wall switch or appliance. Remote control, voice control, scheduling. Magic Switch Mode keeps app control even when wall switch is off. 10A / 2200W.', specs: [['Protocol','Wi-Fi 2.4GHz'],['Max Load','10A / 2200W'],['Input','100–240V AC'],['Size','90×41×27mm']] },
  { id: 2,  name: 'Mini Smart Switch',            model: 'Sonoff MINI R2',            brand: 'Sonoff',  category: 'Switches', badge: 'MINI',       color: '#E00000', img: 'minir2_real',           desc: 'Designed for Lebanese wiring — installs hidden behind your existing wall switch. No neutral wire required. Your switch stays exactly as it looks but now you control it from your phone. Fits inside any standard wall box.', specs: [['Protocol','Wi-Fi 2.4GHz'],['Max Load','10A / 2200W'],['Size','48×30×46mm'],['Neutral','Optional']] },
  { id: 3,  name: 'Dual Relay + Power Meter',     model: 'Sonoff DUALR3',             brand: 'Sonoff',  category: 'Switches', badge: null,         color: '#E00000', img: 'dualr3',                desc: 'Two independent relay channels, each with power metering. Ideal for curtains, shutters, or 2 separate circuits.', specs: [['Channels','2 Independent'],['Max Load','10A/gang, 15A total'],['Power Meter','Per channel'],['Protocol','Wi-Fi 2.4GHz']] },
  { id: 4,  name: 'Power Meter Switch 25A',       model: 'Sonoff POWR3',              brand: 'Sonoff',  category: 'Energy',   badge: '25A',        color: '#E00000', img: 'powr3',                 desc: 'High-power smart switch up to 25A / 5500W. Perfect for generator monitoring, heavy appliances and DIN rail. Overload protection included.', specs: [['Max Load','25A / 5500W'],['Protocol','Wi-Fi 2.4GHz'],['Protection','Overload, Voltage, Current'],['Size','166×125×49mm']] },
  { id: 5,  name: '4-Gang Smart Switch',          model: 'Sonoff 4CHPRO R3',          brand: 'Sonoff',  category: 'Switches', badge: null,         color: '#E00000', img: '4chpro',                desc: 'Control 4 appliances independently. WiFi + RF 433MHz. Inching, self-locking and interlock modes. Perfect for 4-circuit panels.', specs: [['Channels','4 Independent'],['Control','WiFi + RF 433MHz'],['Max Load','10A per gang'],['Modes','Normal/Inching/Interlock']] },
  { id: 6,  name: 'Smart Plug + Energy Monitor',  model: 'Sonoff S26',                brand: 'Sonoff',  category: 'Plugs',    badge: 'MONITOR',    color: '#E00000', img: 's26',                   desc: 'Plug-in smart socket (EU/UK formats). Real-time energy monitoring with daily and monthly stats. Overload protection.', specs: [['Protocol','Wi-Fi 2.4GHz'],['Max Load','10A / 2200W'],['Types','EU, UK, US, AU'],['Power Monitor','Yes']] },
  { id: 7,  name: 'Smart LED Light Strip',        model: 'Sonoff L1 (2M/5M)',         brand: 'Sonoff',  category: 'Lighting', badge: 'RGB',        color: '#E00000', img: 'led_strip',             desc: 'WiFi LED strip with 16 million colors. Music reactive mode. Waterproof, flexible, self-adhesive. App, BT or IR remote control.', specs: [['Colors','16M RGB'],['Sizes','2M or 5M'],['Waterproof','Yes'],['Control','App / BT / IR']] },
  { id: 8,  name: 'Smart LED Bulb (White)',        model: 'Sonoff B02-B-A60',          brand: 'Sonoff',  category: 'Lighting', badge: null,         color: '#E00000', img: 'bulb_white',            desc: 'WiFi smart bulb, warm to cool white (2700K–6500K). Stepless dimming. E27 base. 9W, 806 lumens, 10,000 hour lifespan.', specs: [['Base','E27'],['Power','9W / 806lm'],['CCT','2700K–6500K'],['Life','~10,000h']] },
  { id: 9,  name: 'Smart RGB Color Bulb',         model: 'Sonoff B05-BL-A60',         brand: 'Sonoff',  category: 'Lighting', badge: 'RGB',        color: '#E00000', img: 'bulb_rgb',              desc: 'Full RGB color bulb with 16 million colors. Stepless dimming. App and voice control. Create dynamic lighting scenes.', specs: [['Base','E27'],['Power','9W / 806lm'],['Colors','Full RGB + White'],['Control','App + Voice']] },
  { id: 10, name: 'RF Bridge — Sensor Hub',       model: 'Sonoff RF BridgeR2',        brand: 'Sonoff',  category: 'Sensors',  badge: null,         color: '#E00000', img: 'rf_bridge_real',        desc: 'WiFi bridge connecting 433MHz sensors to eWeLink app. Supports motion, door, and remote sensors. One hub for multiple devices.', specs: [['Wireless','WiFi + 433MHz'],['Input','5V 1A'],['Sensors','Multiple supported'],['Size','64×64×23mm']] },
  { id: 11, name: 'Motion Sensor',                model: 'Sonoff PIR3-RF',            brand: 'Sonoff',  category: 'Sensors',  badge: null,         color: '#E00000', img: 'pir_motion_real',       desc: 'Wireless PIR motion sensor. 8m range, 100° angle. Works with RF Bridge to trigger lights or alarms. Battery powered.', specs: [['Range','Up to 8m'],['Angle','100°'],['Battery','CR2450'],['Protocol','RF 433MHz']] },
  { id: 12, name: 'Door / Window Sensor',         model: 'Sonoff DW2 Wi-Fi',          brand: 'Sonoff',  category: 'Sensors',  badge: null,         color: '#E00000', img: 'door_sensor_real',      desc: 'Direct WiFi door/window sensor — no RF bridge needed. Instant phone alert on open. Trigger smart scenes on events.', specs: [['Protocol','Wi-Fi 2.4GHz'],['Battery','2× AAA 1.5V'],['Gap','< 5mm'],['Alerts','Push notification']] },
  { id: 13, name: 'Zigbee Sensors',               model: 'Sonoff SNZB Series',        brand: 'Sonoff',  category: 'Sensors',  badge: 'ZIGBEE',     color: '#E00000', img: 'snzb_01',               desc: 'Zigbee sensor range: wireless button (SNZB-01), temp & humidity (SNZB-02), motion (SNZB-03), door/window (SNZB-04). Requires Zigbee hub.', specs: [['Protocol','Zigbee 3.0'],['Battery','CR2450 / CR2032'],['Hub Required','Yes'],['Range','~30m indoor']] },
  { id: 14, name: 'TX Ultimate Smart Touch Switch', model: 'SONOFF TX Ultimate 120',  brand: 'Sonoff',  category: 'Switches', badge: 'RGB',        color: '#E00000', img: 'SONOFF TX-1gang',       desc: 'Full touch control with edge-lit RGB accents, motion awareness, and motorized shading control. Tactile sound and vibration feedback. Smart automations, timers, and scene control.', specs: [['Protocol','Wi-Fi 2.4GHz'],['Max Load','16A total'],['RGB','Edge-lit LED Ring'],['Feedback','Sound + Vibration']] },

  // ===== TUYA =====
  { id: 15, name: 'Smart Control Panel 7"',        model: 'Tuya TPP06 Mini',          brand: 'Tuya',    category: 'Security', badge: 'PREMIUM',    color: '#FF6900', img: 'control_panel',         desc: 'All-in-one smart home control panel. 3.5" touch screen with built-in Bluetooth Mesh and IR gateway. Control 110+ device categories.', specs: [['Screen','3.5 inch Touch'],['Gateway','BT Mesh + IR Built-in'],['Protocols','Wi-Fi + BT + IR'],['Install','EU Wall Mount']] },
  { id: 16, name: 'Smart Control Panel Pro 8"',    model: 'Tuya TPA08-M3',            brand: 'Tuya',    category: 'Security', badge: 'PREMIUM',    color: '#FF6900', img: 'sm_panel_pro',          desc: 'Premium 8-inch Android smart home panel with Alexa built-in. Zigbee and Bluetooth Mesh gateway, 2 relay gangs, dual speakers.', specs: [['Screen','8 inch Android'],['Voice','Alexa Built-in'],['Gateway','Zigbee + BT Mesh'],['Relay','2 Gang']] },
  { id: 17, name: '2K Smart Video Doorbell',       model: 'Tuya SC162-WCD3',          brand: 'Tuya',    category: 'Security', badge: '2K',         color: '#FF6900', img: 'doorbell_2k',           desc: '2K HD video doorbell with indoor chime. 170° wide angle lens. Push notifications for humans and packages. Battery powered with IP65 rating.', specs: [['Resolution','2K 1536×2048'],['Lens','170° Wide Angle'],['Battery','5200mAh IP65'],['Detection','Human + Package']] },
  { id: 18, name: 'Smart Video Door Lock',         model: 'Tuya I8 Smart Video Lock', brand: 'Tuya',    category: 'Security', badge: 'FACE ID',    color: '#FF6900', img: 'door_lock_ty',          desc: 'Premium smart door lock with video camera. Unlock via Face ID, fingerprint, PIN, card, app or key. Store 300 fingerprints/PINs/cards.', specs: [['Unlock','Face/Fingerprint/PIN/Card/App'],['Video','Live Communication'],['Storage','300 Users'],['Battery','4200mAh']] },
  { id: 19, name: 'AI Smart Circuit Breaker',      model: 'Tuya AICB2SP',             brand: 'Tuya',    category: 'Energy',   badge: 'CIRCUIT',    color: '#FF6900', img: 'circuit_breaker',       desc: 'AI-powered smart circuit breaker with remote on/off, real-time energy monitoring and overload protection. Available in 1P/2P/3P/4P up to 100A. Essential for Lebanon generator management.', specs: [['Rating','6A to 100A'],['Poles','1P/2P/3P/4P'],['Monitoring','Voltage/Current/Power'],['Lifespan','20,000 operations']] },
  { id: 20, name: 'Smart Energy Meter',            model: 'Tuya DAC21C Series',       brand: 'Tuya',    category: 'Energy',   badge: 'ENERGY',     color: '#FF6900', img: 'energy-meter',          desc: 'DIN rail smart energy meter with LCD display. Bi-directional metering, daily and monthly stats. Perfect for generator monitoring in Lebanon.', specs: [['Display','LCD'],['Metering','Bi-directional'],['Install','DIN Rail'],['Monitor','V/A/W/kWh']] },
  { id: 21, name: 'Human Presence Sensor',         model: 'Tuya HP222-Z',             brand: 'Tuya',    category: 'Sensors',  badge: 'AI RADAR',   color: '#FF6900', img: 'presence_sensor',       desc: 'Advanced 60GHz radar sensor. Detects people even when still. Covers 24 sqm. Zigbee. Trigger lights, AC and automations automatically.', specs: [['Technology','60GHz Radar'],['Coverage','24 sqm'],['Detection','Presence + Motion'],['Protocol','Zigbee']] },
  { id: 22, name: 'Zigbee Water Leak Sensor',      model: 'Tuya WD100-Z',             brand: 'Tuya',    category: 'Sensors',  badge: null,         color: '#FF6900', img: 'water_sensor',          desc: 'Zigbee water leak detector. Real-time monitoring and instant push alert. Can auto-close water valve when leak detected. Battery powered.', specs: [['Protocol','Zigbee'],['Detection','Water Contact'],['Action','Scene Linkage'],['Install','Tool-free']] },
  { id: 23, name: 'Matter Smart Plug EU 16A',      model: 'Tuya F1203-EU',            brand: 'Tuya',    category: 'Plugs',    badge: 'MATTER',     color: '#FF6900', img: 'plug',                  desc: 'Matter-certified smart plug. 16A max. Works with Alexa, Google, Apple HomeKit, SmartThings. Remote control, scheduling and power monitoring.', specs: [['Standard','Matter over Wi-Fi'],['Current','16A Max'],['Ecosystems','Alexa/Google/Apple/SmartThings'],['Monitor','Power (Optional)']] },
  { id: 24, name: 'Smart Scene Switch',            model: 'Tuya PS162-W-EU',          brand: 'Tuya',    category: 'Switches', badge: null,         color: '#FF6900', img: 'smart_scence',          desc: 'WiFi scene switch to trigger multiple automations with one tap. Two-way and multi-way control. 16A output.', specs: [['Protocol','Wi-Fi + Bluetooth'],['Output','16A'],['Control','Multi-way Wireless'],['Sensor','Proximity Screen']] },
  { id: 25, name: 'Indoor Smart Camera Kit',       model: 'GS-C23B-1FSK',            brand: 'Tuya',    category: 'Security', badge: 'KIT',        color: '#FF6900', img: 'ty_cam_c23b_1',         desc: 'Complete smart security kit with camera, infrared sensor, door sensor and remote controller. Supports Tuya Smart and Smart Life. Motion tracking, scene linkage and alarm.', specs: [['Resolution','2MP'],['Storage','Up to 256GB SD'],['Protocol','WiFi 2.4GHz'],['Compatible','Alexa / Google']] },
  { id: 26, name: 'Indoor WiFi Camera 2MP',        model: 'GS-C23B-2MP',             brand: 'Tuya',    category: 'Security', badge: null,         color: '#FF6900', img: 'ty_cam_c23b_2mp',       desc: '2MP indoor WiFi camera. Single and dual-band WiFi support. Motion tracking, alarm linkage and app control via Tuya Smart.', specs: [['Resolution','2MP'],['WiFi','2.4GHz + 5GHz'],['Storage','Up to 256GB SD'],['Protocol','ONVIF']] },
  { id: 27, name: 'Indoor WiFi Camera 4MP',        model: 'GS-C23B-4MP',             brand: 'Tuya',    category: 'Security', badge: '4MP',        color: '#FF6900', img: 'ty_cam_c23b_4mp',       desc: '4MP high resolution indoor camera. Dual-band WiFi, motion tracking, preset scene linkage. Alexa and Google Home compatible.', specs: [['Resolution','4MP'],['WiFi','2.4GHz + 5GHz'],['Storage','Up to 256GB SD'],['Compatible','Alexa / Google']] },
  { id: 28, name: 'Indoor PTZ Camera 2MP',         model: 'GS-C26-2MP',              brand: 'Tuya',    category: 'Security', badge: null,         color: '#FF6900', img: 'ty_cam_c26_2mp',        desc: '2MP pan-tilt indoor camera with motion tracking. Dual-band WiFi optional. Alarm sound settings and scene linkage.', specs: [['Resolution','2MP'],['WiFi','2.4GHz + 5GHz'],['Storage','Up to 256GB SD'],['Feature','Pan-Tilt']] },
  { id: 29, name: 'Indoor PTZ Camera 4MP',         model: 'GS-C26-4MP',              brand: 'Tuya',    category: 'Security', badge: '4MP',        color: '#FF6900', img: 'ty_cam_c26_4mp',        desc: '4MP pan-tilt indoor camera. Dual-band WiFi, ONVIF protocol, motion tracking and alarm linkage. Alexa and Google compatible.', specs: [['Resolution','4MP'],['WiFi','2.4GHz + 5GHz'],['Feature','Pan-Tilt + Tracking'],['Protocol','ONVIF']] },
  { id: 30, name: 'Mini Indoor Camera 2MP',        model: 'GS-C11-2MP',              brand: 'Tuya',    category: 'Security', badge: 'COMPACT',    color: '#FF6900', img: 'ty_cam_c11_2mp',        desc: 'Compact mini indoor camera. Single and dual-band WiFi. Supports 2.4GHz, 5GHz and WiFi6. Siren and alarm tone settings.', specs: [['Resolution','2MP'],['WiFi','2.4GHz / 5GHz / WiFi6'],['Storage','Up to 256GB SD'],['Protocol','ONVIF']] },
  { id: 31, name: 'Mini Indoor Camera 4MP',        model: 'GS-C11-4MP',              brand: 'Tuya',    category: 'Security', badge: '4MP',        color: '#FF6900', img: 'ty_cam_c11_4mp',        desc: '4MP compact mini indoor camera. Dual-band WiFi including WiFi6. Alexa and Google Home compatible.', specs: [['Resolution','4MP'],['WiFi','2.4GHz / 5GHz / WiFi6'],['Storage','Up to 256GB SD'],['Compatible','Alexa / Google']] },
  { id: 32, name: 'Outdoor PTZ Camera 4MP',        model: 'GS-C65-400W',             brand: 'Tuya',    category: 'Security', badge: 'OUTDOOR',    color: '#FF6900', img: 'ty_cam_c65_400w',       desc: '4MP outdoor PTZ camera with Bluetooth pairing. Supports up to 128GB SD. Siren settings, motion tracking and preset scene linkage.', specs: [['Resolution','4MP'],['Storage','Up to 128GB SD'],['Feature','Pan-Tilt-Zoom'],['Bluetooth','Pairing Support']] },
  { id: 33, name: 'Outdoor PTZ Camera 8MP',        model: 'GS-C65-800W',             brand: 'Tuya',    category: 'Security', badge: '8MP',        color: '#FF6900', img: 'ty_cam_c65_800w',       desc: '8MP outdoor PTZ camera. Bluetooth pairing, siren, motion tracking and alarm linkage. Premium resolution for outdoor surveillance.', specs: [['Resolution','8MP'],['Storage','Up to 128GB SD'],['Feature','Pan-Tilt-Zoom'],['Bluetooth','Pairing Support']] },
  { id: 34, name: 'Outdoor Floodlight Camera 3MP', model: '426-3M-TY',               brand: 'Tuya',    category: 'Security', badge: 'FLOODLIGHT', color: '#FF6900', img: 'ty_cam_floodlight_3mp', desc: '3MP outdoor floodlight camera with IR LEDs and white light. Alexa and Google compatible. PC support for computer view.', specs: [['Resolution','3MP'],['Lens','3.6mm'],['Lights','IR + White Floodlight'],['Compatible','Alexa / Google']] },
  { id: 35, name: 'Outdoor Floodlight Camera 5MP', model: '426-5M-TY',               brand: 'Tuya',    category: 'Security', badge: '5MP',        color: '#FF6900', img: 'ty_cam_floodlight_5mp', desc: '5MP outdoor floodlight camera. IR and white LED floodlights, Tuya app, Alexa and Google support.', specs: [['Resolution','5MP'],['Lens','3.6mm'],['Lights','IR + White Floodlight'],['Compatible','Alexa / Google']] },
  { id: 36, name: 'Outdoor Mini PTZ Camera 3MP',   model: '425-3M-TY',               brand: 'Tuya',    category: 'Security', badge: 'IP65',       color: '#FF6900', img: 'ty_cam_ptz_3mp',        desc: '1-inch mini PTZ outdoor camera. IP65 rated, IR LEDs, 3.6mm lens, 128GB SD support. Alexa and Google compatible.', specs: [['Resolution','3MP'],['Protection','IP65'],['Lens','3.6mm'],['Storage','Up to 128GB SD']] },
  { id: 37, name: 'Outdoor Mini PTZ Camera 5MP',   model: '425-5M-TY',               brand: 'Tuya',    category: 'Security', badge: '5MP',        color: '#FF6900', img: 'ty_cam_ptz_5mp',        desc: '5MP mini PTZ outdoor camera. IP65, IR LEDs, 128GB SD, Alexa and Google compatible.', specs: [['Resolution','5MP'],['Protection','IP65'],['Lens','3.6mm'],['Storage','Up to 128GB SD']] },
  { id: 38, name: 'Solar WiFi PTZ Camera 4MP',     model: 'GS-42L-4MP',              brand: 'Tuya',    category: 'Security', badge: 'SOLAR',      color: '#FF6900', img: 'ty_cam_solar_4mp',      desc: '4MP solar powered outdoor PTZ camera. 4G + WiFi, human detection, motion detection, two-way audio. No wiring needed — fully solar powered.', specs: [['Resolution','4MP 1440P'],['Power','Solar + Battery'],['Detection','Human + Motion'],['Audio','Two-way']] },
  { id: 39, name: 'Solar Security Camera + Light', model: 'SS18M-3MP-TY',            brand: 'Tuya',    category: 'Security', badge: 'SOLAR',      color: '#FF6900', img: 'ty_cam_solar_light',    desc: '3MP solar security camera with integrated garden floodlight. Rotates 360°, IP66 rated, 5m extension cord. No wiring needed.', specs: [['Resolution','3MP'],['Power','Solar'],['Protection','IP66'],['Feature','360° Rotation']] },
  { id: 40, name: 'Solar Video Doorbell',           model: 'GS-GD8-1',                brand: 'Tuya',    category: 'Security', badge: 'SOLAR',      color: '#FF6900', img: 'ty_cam_doorbell',       desc: 'WiFi video doorbell with 180° lens, night vision, two-way intercom and solar charging. Human detection, 128GB SD support, IP66 waterproof.', specs: [['Resolution','4MP 1440P'],['Lens','180° Wide'],['Power','Solar + Battery'],['Protection','IP66']] },
  { id: 41, name: 'Smart Breaker 1P WiFi',          model: 'WCB-SC-1P100M-WIFI',      brand: 'Tuya',    category: 'Energy',   badge: 'WiFi 1P',    color: '#FF6900', img: 'ty_breaker_1p_wifi',    desc: 'WiFi smart circuit breaker 1P 10A-100A with power meter. Remote on/off, real-time energy monitoring. Essential for Lebanon generator management.', specs: [['Poles','1P'],['Rating','10A–100A'],['Protocol','Wi-Fi 2.4GHz'],['Feature','Power Meter']] },
  { id: 42, name: 'Smart Breaker 1P Zigbee',        model: 'WCB-SC-1P100M-ZIG',       brand: 'Tuya',    category: 'Energy',   badge: 'Zigbee 1P',  color: '#FF6900', img: 'ty_breaker_1p_zig',     desc: 'Zigbee smart circuit breaker 1P 10A-100A with power meter. More reliable than WiFi for critical circuits.', specs: [['Poles','1P'],['Rating','10A–100A'],['Protocol','Zigbee'],['Feature','Power Meter']] },
  { id: 43, name: 'Smart Breaker 2P WiFi',          model: 'WCB-SC-2P100M-WIFI',      brand: 'Tuya',    category: 'Energy',   badge: 'WiFi 2P',    color: '#FF6900', img: 'ty_breaker_2p_wifi',    desc: 'WiFi smart circuit breaker 2P 10A-100A with power meter and electricity leakage protection. Remote control and energy monitoring.', specs: [['Poles','2P'],['Rating','10A–100A'],['Protocol','Wi-Fi 2.4GHz'],['Feature','Power Meter + Leakage Protection']] },
  { id: 44, name: 'Smart Breaker 2P Zigbee',        model: 'WCB-SC-2P100M-ZIG',       brand: 'Tuya',    category: 'Energy',   badge: 'Zigbee 2P',  color: '#FF6900', img: 'ty_breaker_2p_zig',     desc: 'Zigbee smart circuit breaker 2P 10A-100A with power meter and leakage protection. Ideal for critical household circuits.', specs: [['Poles','2P'],['Rating','10A–100A'],['Protocol','Zigbee'],['Feature','Power Meter + Leakage Protection']] },
  { id: 45, name: 'Smart Breaker 3P 80A WiFi',      model: 'WCB-SC-3P80-WIFI',        brand: 'Tuya',    category: 'Energy',   badge: 'WiFi 3P',    color: '#FF6900', img: 'ty_breaker_3p80_wifi',  desc: 'WiFi smart circuit breaker 3P 10A-80A. Remote on/off and monitoring via app. Perfect for 3-phase panels.', specs: [['Poles','3P'],['Rating','10A–80A'],['Protocol','Wi-Fi 2.4GHz'],['Feature','Remote Control']] },
  { id: 46, name: 'Smart Breaker 3P 80A Zigbee',    model: 'WCB-SC-3P80-ZIG',         brand: 'Tuya',    category: 'Energy',   badge: 'Zigbee 3P',  color: '#FF6900', img: 'ty_breaker_3p80_zig',   desc: 'Zigbee smart circuit breaker 3P 10A-80A. Reliable Zigbee protocol for 3-phase smart panel setups.', specs: [['Poles','3P'],['Rating','10A–80A'],['Protocol','Zigbee'],['Feature','Remote Control']] },
  { id: 47, name: 'Smart Breaker 3P 100A WiFi',     model: 'WCB-SC-3P100-WIFI',       brand: 'Tuya',    category: 'Energy',   badge: 'WiFi 100A',  color: '#FF6900', img: 'ty_breaker_3p100_wifi', desc: 'High capacity WiFi smart circuit breaker 3P up to 100A. Ideal for heavy 3-phase loads and generator management.', specs: [['Poles','3P'],['Rating','Up to 100A'],['Protocol','Wi-Fi 2.4GHz'],['Feature','Remote Control']] },
  { id: 48, name: 'Smart Breaker 3P 100A Zigbee',   model: 'WCB-SC-3P100-ZIG',        brand: 'Tuya',    category: 'Energy',   badge: 'Zigbee 100A', color: '#FF6900', img: 'ty_breaker_3p100_zig',  desc: 'High capacity Zigbee smart circuit breaker 3P up to 100A. Best for reliable 3-phase smart installations.', specs: [['Poles','3P'],['Rating','Up to 100A'],['Protocol','Zigbee'],['Feature','Remote Control']] },
  { id: 49, name: 'Smart Breaker 4P 80A WiFi',      model: 'WCB-SC-4P80-WIFI',        brand: 'Tuya',    category: 'Energy',   badge: 'WiFi 4P',    color: '#FF6900', img: 'ty_breaker_4p80_wifi',  desc: 'WiFi smart circuit breaker 4P 10A-80A. Full 4-pole control for complete smart panel management.', specs: [['Poles','4P'],['Rating','10A–80A'],['Protocol','Wi-Fi 2.4GHz'],['Feature','Remote Control']] },
  { id: 50, name: 'Smart Breaker 4P 80A Zigbee',    model: 'WCB-SC-4P80-ZIGBEE',      brand: 'Tuya',    category: 'Energy',   badge: 'Zigbee 4P',  color: '#FF6900', img: 'ty_breaker_4p80_zig',   desc: 'Zigbee smart circuit breaker 4P 10A-80A. Most reliable option for full 4-pole smart panel setups.', specs: [['Poles','4P'],['Rating','10A–80A'],['Protocol','Zigbee'],['Feature','Remote Control']] },

  // ===== SUMMAO =====
  { id: 51, name: 'Smart WiFi Plug Adapter',        model: 'SP-Series',               brand: 'Summao',  category: 'Plugs',    badge: null,         color: '#2B5BA8', img: 'sm_plug_eu',            desc: 'Portable smart plug adapter. Turn any appliance into a smart device instantly. Supports scheduling and remote control via phone.', specs: [['Voltage','100-240V'],['Current','16A'],['Material','ABS+PC Fireproof'],['Life','25,000 Hours']] },
  { id: 52, name: 'WiFi Smart Breaker (10A)',        model: 'Item 16',                 brand: 'Summao',  category: 'Energy',   badge: null,         color: '#2B5BA8', img: 'sm_wifi_breaker',       desc: 'Small WiFi relay for basic light circuits or small appliances. Easy to hide in ceilings or boxes.', specs: [['Voltage','AC 100-240V'],['Max Load','10A'],['Material','ABS+PC Fireproof'],['Safety','94-v0 Fire Rating']] },
  { id: 53, name: 'WiFi Mini Switch + Power Monitor', model: 'Item 17',               brand: 'Summao',  category: 'Switches', badge: 'MONITOR',    color: '#2B5BA8', img: 'sm_mini_switch_mon',    desc: 'Ultra-small smart switch with built-in power monitoring. Fits behind your existing wall switch to track electricity usage.', specs: [['Voltage','AC 100-240V'],['Current','16A'],['Feature','Power Monitor'],['Life','25,000 Hours']] },
  { id: 54, name: 'Smart WiFi RGB Light Bulb',       model: 'Item 18',                brand: 'Summao',  category: 'Lighting', badge: 'RGB',        color: '#2B5BA8', img: 'sm_wifi_bulb',          desc: '10W RGB smart bulb. Change colors, dim brightness, and sync with music from the app.', specs: [['Power','10W'],['Colors','RGB + White'],['Voltage','AC 85-265V'],['Control','WiFi App']] },
  { id: 55, name: 'Smart Video Lock 802 Pro',        model: 'Sum-802pro',              brand: 'Summao',  category: 'Security', badge: 'POPULAR',    color: '#2B5BA8', img: 'sm_lock_802pro',        desc: 'Smart lock with built-in camera and Tuya WiFi. See who is at the door from your phone.', specs: [['Unlock','Camera, Fingerprint, App, Key'],['Power','8x AA Alkaline Battery'],['Material','Aluminum & Tempered Glass'],['App','Tuya / Smart Life']] },
  { id: 56, name: 'Automatic Waterproof Lock',       model: 'Sum-907Max',              brand: 'Summao',  category: 'Security', badge: 'WATERPROOF', color: '#2B5BA8', img: 'sm_lock_907max',        desc: 'Fully automatic lock with waterproof front panel. Ideal for external doors and villas.', specs: [['Feature','IP65 Waterproof Front'],['Battery','Lithium-ion Rechargeable'],['Unlock','Face, Fingerprint, App, Card'],['Video','Live Video Calling']] },
  { id: 57, name: 'Smart Glass Touch Switch',        model: 'STG Series',              brand: 'Summao',  category: 'Switches', badge: 'GLASS',      color: '#2B5BA8', img: 'sm_touch_1g',           desc: 'Luxury tempered glass touch switch. Available in 1 to 4 gangs to control all your lights.', specs: [['Voltage','110-240VAC'],['Load','3-300W/gang'],['Standard','EU/UK 86x86mm'],['WiFi','2.4GHz IEEE 802.11 b/g/n']] },
  { id: 58, name: 'Switch & EU Socket Combo',        model: 'STG-09/11',               brand: 'Summao',  category: 'Plugs',    badge: 'COMBO',      color: '#2B5BA8', img: 'sm_combo_eu_1g',        desc: 'Sleek glass panel combining smart switches with a high-power 16A EU socket.', specs: [['Socket','16A / 3500W Max'],['Standard','EU Type F'],['Size','146 x 86 mm'],['Material','Tempered Glass']] },
  { id: 59, name: 'Switch & USB Socket Combo',       model: 'STG-15/17',               brand: 'Summao',  category: 'Plugs',    badge: 'USB',        color: '#2B5BA8', img: 'sm_combo_usb_1g',       desc: 'Modern smart panel with switches, a universal socket, and dual USB ports for charging.', specs: [['USB Power','5V / 2.1A'],['Socket','13A Universal'],['Size','146 x 86 mm'],['Protection','Fireproof ABS/Glass']] },
  { id: 60, name: 'Smart Water Heater Switch',       model: 'STG-05',                  brand: 'Summao',  category: 'Switches', badge: 'HIGH POWER', color: '#2B5BA8', img: 'sm_heater_20a',         desc: 'Heavy-duty 20A switch for water heaters. Control your hot water from anywhere.', specs: [['Rated Power','4000W Max'],['Current','20A'],['Input','100-240VAC'],['Size','86 x 86 x 35mm']] },
  { id: 61, name: 'Ultra Power Smart Switch (40A)', model: 'STGT-04-2',               brand: 'Summao',  category: 'Switches', badge: '8000W',      color: '#2B5BA8', img: 'sm_heavy_40a',          desc: 'The strongest smart switch for water pumps, large ACs, and industrial loads.', specs: [['Max Power','8000W'],['Current','40A'],['Voltage','AC 90-240V'],['App','Tuya / Smart Life']] },
  { id: 62, name: 'Smart Curtain Switch',            model: 'STGT-05',                 brand: 'Summao',  category: 'Curtains', badge: 'MOTOR',      color: '#2B5BA8', img: 'sm_curtain_sw',         desc: 'Control motorized curtains or shutters from your phone. Supports percentage control.', specs: [['Power','2200W Max'],['Output','AC 90-240V'],['Design','Glass Touch'],['App','Tuya / Smart Life']] },
  { id: 63, name: '3D Face Recognition Lock',        model: 'Sum-666',                 brand: 'Summao',  category: 'Security', badge: 'LUXURY',     color: '#2B5BA8', img: 'sm_lock_666',           desc: 'The ultimate security lock using 3D Face ID technology. Premium Gun Black finish.', specs: [['Technology','3D Face Recognition'],['Battery','5000mAh Rechargeable'],['Emergency','Micro USB Power Port'],['Video','Active Video Calling']] },
  { id: 64, name: 'Smart Waterproof Rim Lock',       model: 'Sum-812-4',               brand: 'Summao',  category: 'Security', badge: 'GATE',       color: '#2B5BA8', img: 'sm_lock_rim',           desc: 'Specialized smart lock for garden gates and aluminum doors. Durable and waterproof.', specs: [['Type','Waterproof Rim Lock'],['Material','Aluminum & Stainless Steel'],['Unlock','Fingerprint, Card, App'],['App','Tuya / TTlock Support']] },
  { id: 65, name: 'Smart Classic Lock 811',          model: 'Sum-811',                 brand: 'Summao',  category: 'Security', badge: 'BEST VALUE', color: '#2B5BA8', img: 'sm_lock_811',           desc: 'Affordable and reliable smart lock. Perfect for standard wooden doors with full App control.', specs: [['Unlock','Fingerprint, Code, Card, Key'],['Power','4x AA Alkaline Battery'],['Material','Aluminum Alloy'],['App','Tuya / Smart Life']] },
  { id: 66, name: 'Luxury 3D Face Lock 937',         model: 'Sum-937Max',              brand: 'Summao',  category: 'Security', badge: 'PREMIUM 3D', color: '#2B5BA8', img: 'sm_lock_937max',        desc: 'High-end 3D Face recognition with active video calling. Premium Mocha Gold or Gun Black finish.', specs: [['Technology','3D Face & Video Call'],['Battery','4200mAh Lithium-ion'],['Material','Aluminum Alloy'],['Unlock','Face, App, Code, Fingerprint']] },
  { id: 67, name: '3D Face ID Entry Lock',           model: 'Sum-929-3',               brand: 'Summao',  category: 'Security', badge: null,         color: '#2B5BA8', img: 'sm_lock_929',           desc: 'The most affordable way to get 3D Face Recognition for your home. Simple and secure.', specs: [['Technology','3D Face Recognition'],['Battery','3200mAh Lithium-ion'],['Material','Durable ABS'],['App','Wishome App Support']] },
  { id: 68, name: 'Narrow Frame Smart Lock',         model: 'Sum-608',                 brand: 'Summao',  category: 'Security', badge: 'SLIM',       color: '#2B5BA8', img: 'sm_lock_608',           desc: 'Specialized slim lock for aluminum or narrow-frame doors. Weather-resistant and durable.', specs: [['Special','Fits 92/72/85 Mortise'],['Width','Only 37mm Wide'],['Unlock','Fingerprint, App, Key'],['Protection','IP65 Weather Resistant']] },
]

export default function Products() {
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')
  const { addToCart } = useCart()

  /* Filter logic: brand OR category OR all */
  const activeFilter = filterGroups.find(f => f.value === active)
  const filtered = products.filter(p => {
    const matchesFilter =
      activeFilter?.type === 'all' ? true :
      activeFilter?.type === 'brand' ? p.brand === active :
      p.category === active

    const q = search.toLowerCase().trim()
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.model.toLowerCase().includes(q)

    return matchesFilter && matchesSearch
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* ── Header ── */}
      <section className="pt-32 pb-10 px-6 lg:px-8"
        style={{ background: 'radial-gradient(ellipse at top, rgba(43,91,168,0.1) 0%, transparent 60%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-primary mb-4"
              style={{ background: 'rgba(43,91,168,0.1)', border: '1px solid rgba(43,91,168,0.25)' }}>
              Our Catalog
            </div>
          </FadeIn>
          <RevealText delay={0.05}>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
              Smart Home <span className="text-accent">Products</span>
            </h1>
          </RevealText>
          <FadeIn delay={0.15}>
            <p className="text-gray-text text-lg max-w-xl mx-auto mb-8">
              50+ smart home products from Sonoff, Tuya, and Summao — professionally supplied and installed in Lebanon.
            </p>
          </FadeIn>

          {/* ── Search bar ── */}
          <FadeIn delay={0.22}>
            <div className="relative max-w-lg mx-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products by name, brand, or description..."
                className="w-full pl-11 pr-10 py-3.5 rounded-xl text-white text-sm placeholder-gray-subtle outline-none transition-all duration-200"
                style={{
                  background: '#0F1829',
                  border: '1px solid #1E2D4A',
                }}
                onFocus={e => { e.target.style.borderColor = '#8DC63F'; e.target.style.boxShadow = '0 0 0 3px rgba(141,198,63,0.12)' }}
                onBlur={e => { e.target.style.borderColor = '#1E2D4A'; e.target.style.boxShadow = 'none' }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-text hover:text-white transition-colors"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Filter tabs ── */}
      <section className="px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            {/* Brand group label */}
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {filterGroups.map((f) => {
                const isActive = active === f.value
                const isBrand = f.type === 'brand'
                const isAll = f.type === 'all'
                return (
                  <motion.button
                    key={f.value}
                    onClick={() => setActive(f.value)}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                    style={isActive
                      ? {
                          background: '#8DC63F',
                          color: 'white',
                          boxShadow: '0 0 18px rgba(141,198,63,0.45)',
                          border: '1px solid #8DC63F',
                        }
                      : {
                          background: '#0F1829',
                          color: isBrand ? '#e0e0e0' : '#9CA3AF',
                          border: `1px solid ${isBrand ? 'rgba(141,198,63,0.25)' : '#1E2D4A'}`,
                          fontWeight: isBrand ? '600' : '400',
                        }
                    }
                  >
                    {f.label}
                  </motion.button>
                )
              })}
            </div>
            {/* Result count */}
            <p className="text-center text-gray-text text-xs mt-3">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
              {search && <span> for "<span className="text-accent">{search}</span>"</span>}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Product grid with TiltCard ── */}
      <section className="px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={active + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-text text-lg">No products found.</p>
                <button onClick={() => { setActive('All'); setSearch('') }} className="mt-4 text-accent text-sm hover:underline">Clear filters</button>
              </div>
            ) : filtered.map((product, i) => (
              <FadeIn key={product.id} delay={Math.min(i * 0.04, 0.35)}>
                <TiltCard className="rounded-2xl h-full" intensity={8}>
                  <div
                    className="relative p-5 rounded-2xl flex flex-col h-full cursor-pointer group"
                    style={{ background: '#0F1829', border: '1px solid #1E2D4A' }}
                  >
                    {product.badge && (
                      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold text-white z-20"
                        style={{ background: product.color }}>
                        {product.badge}
                      </div>
                    )}

                    {/* Product image */}
                    <div className="w-full h-36 rounded-xl overflow-hidden mb-4 flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <img
                        src={`/images/${product.img}.jpg`}
                        alt={product.name}
                        className="w-full h-full object-contain p-2"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    </div>

                    <div className="text-xs font-semibold mb-1" style={{ color: product.color }}>{product.brand}</div>
                    <div className="text-[10px] text-gray-text mb-1">{product.model}</div>
                    <h3 className="text-white font-bold text-sm mb-2">{product.name}</h3>
                    <p className="text-gray-text text-xs leading-relaxed flex-1 mb-4">{product.desc}</p>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-1 mb-4">
                      {product.specs.slice(0, 2).map(([key, val], si) => (
                        <div key={si} className="px-2 py-1 rounded-lg text-[10px]"
                          style={{ background: `${product.color}10`, border: `1px solid ${product.color}20` }}>
                          <span className="text-gray-text">{key}: </span>
                          <span style={{ color: product.color }}>{val}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto gap-2">
                      <span className="text-white font-semibold text-xs">Contact for price</span>
                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        whileHover={{ scale: 1.06 }}
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold z-20 shrink-0"
                        style={{
                          background: `${product.color}20`,
                          border: `1px solid ${product.color}40`,
                          color: product.color,
                        }}
                      >
                        <ShoppingCart size={12} />
                        Add
                      </motion.button>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="p-10 rounded-3xl" style={{ background: '#0F1829', border: '1px solid #1E2D4A' }}>
              <RevealText delay={0.05}>
                <h3 className="text-2xl font-black text-white mb-3">Need a Custom Bundle?</h3>
              </RevealText>
              <p className="text-gray-text mb-6">We design tailored smart home packages suited to your space, wiring, and budget. Free consultation included.</p>
              <ShimmerButton
                to="/contact"
                className="gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #2B5BA8, #1a3d7a)', boxShadow: '0 0 25px rgba(43,91,168,0.35)' }}
              >
                Request Free Consultation <ArrowRight size={15} />
              </ShimmerButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  )
}
