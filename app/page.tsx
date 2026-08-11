'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Coffee,
  Compass,
  Facebook,
  Heart,
  Instagram,
  Leaf,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';

const images = {
  hero: 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  thali: 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  paneer: 'https://images.pexels.com/photos/11188417/pexels-photo-11188417.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  paneerTikka: 'https://images.pexels.com/photos/3928854/pexels-photo-3928854.png?auto=compress&cs=tinysrgb&h=650&w=940',
  paneerSpecial: 'https://images.pexels.com/photos/29685056/pexels-photo-29685056.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  vegKolhapuri: 'https://images.pexels.com/photos/33430561/pexels-photo-33430561.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  curry: 'https://images.pexels.com/photos/35993886/pexels-photo-35993886.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  dosa: 'https://images.pexels.com/photos/20422138/pexels-photo-20422138.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  biryani: 'https://images.pexels.com/photos/7593267/pexels-photo-7593267.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  chineseNoodles: 'https://images.pexels.com/photos/5848494/pexels-photo-5848494.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  manchurian: 'https://images.pexels.com/photos/28674530/pexels-photo-28674530.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  friedRice: 'https://images.pexels.com/photos/35588196/pexels-photo-35588196.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  pavBhaji: 'https://images.pexels.com/photos/166654/pexels-photo-166654.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const mapLink = 'https://www.google.com/maps/search/?api=1&query=Shrikrishna+Pure+Veg+Restaurant+Baramati';
const phoneLink = 'tel:+917755913664';
const whatsappLink = 'https://wa.me/917755913664';

const categories = [
  { en: 'North Indian', mr: 'उत्तर भारतीय', copy: 'Rich gravies, breads and comforting classics.', image: images.paneer, icon: Utensils },
  { en: 'South Indian', mr: 'दक्षिण भारतीय', copy: 'Crisp dosas, fluffy idlis and more.', image: images.dosa, icon: Coffee },
  { en: 'Chinese', mr: 'चायनीज', copy: 'Wok-tossed favourites with a vegetarian twist.', image: images.chineseNoodles, icon: Sparkles },
  { en: 'Paneer Specialities', mr: 'पनीर स्पेशलिटी', copy: 'House favourites made for sharing.', image: images.curry, icon: Heart },
  { en: 'Rice & Biryani', mr: 'राईस & बिर्याणी', copy: 'Fragrant rice dishes, made to order.', image: images.biryani, icon: Leaf },
  { en: 'Snacks & Chaat', mr: 'स्नॅक्स', copy: 'Quick bites for every mood.', image: images.pavBhaji, icon: Award },
];

const popularDishes = [
  ['Paneer Butter Masala', 'पनीर बटर मसाला', 'Creamy tomato gravy, soft paneer', 'Paneer', images.paneer, '₹250'],
  ['Shrikrishna Special Paneer', 'श्रीकृष्ण स्पेशल पनीर', 'A signature house favourite', 'Chef’s Pick', images.paneerSpecial, '₹450'],
  ['Veg Kolhapuri', 'व्हेज कोल्हापुरी', 'Bold, rustic Maharashtrian flavours', 'Main Course', images.vegKolhapuri, '₹250'],
  ['Veg Dum Biryani', 'व्हेज दम बिर्याणी', 'Fragrant rice layered with vegetables', 'Rice & Biryani', images.biryani, '₹220'],
  ['Masala Dosa', 'मसाला डोसा', 'Crisp dosa with classic potato filling', 'South Indian', images.dosa, '₹120'],
  ['Veg Manchurian', 'व्हेज मंच्युरियन', 'Crisp vegetable bites in savoury sauce', 'Chinese', images.manchurian, '₹190'],
  ['Pav Bhaji', 'पाव भाजी', 'Mumbai-style spiced vegetable mash', 'Snacks', images.pavBhaji, '₹120'],
  ['Hakka Noodles', 'हक्का नूडल्स', 'Wok-tossed noodles with fresh vegetables', 'Chinese', images.chineseNoodles, '₹180'],
];

const menuItems = [
  ['Veg Hyderabadi', 'व्हेज हैदराबादी', 'A rich vegetable preparation with Hyderabad-style spices', 'Main Course', '', '₹230'],
  ['Chana Masala', 'चना मसाला', 'Chickpeas cooked in an aromatic masala', 'Main Course', '', '₹210'],
  ['Shev Bhaji', 'शेव भाजी', 'Spiced curry finished with crisp shev', 'Main Course', '', '₹230'],
  ['Green Peas Masala', 'ग्रीन पीस मसाला', 'Green peas in a rich masala gravy', 'Main Course', '', '₹200'],
  ['Kadai Veg', 'कडाई व्हेज', 'Mixed vegetables in kadai masala', 'Main Course', '', '₹230'],
  ['Kaju Curry', 'काजू करी', 'Creamy cashew curry', 'Main Course', '', '₹260'],
  ['Kaju Masala', 'काजू मसाला', 'Cashews in a bold masala gravy', 'Main Course', '', '₹270'],
  ['Kaju Paneer Masala', 'काजू पनीर मसाला', 'Paneer and cashews in masala gravy', 'Paneer', '', '₹270'],
  ['Mix Vegetable', 'मिक्स वेजिटेबल', 'Seasonal vegetables cooked together', 'Main Course', '', '₹230'],
  ['Punjabi Tawa', 'पंजाबी तवा', 'Punjabi-style vegetables from the tawa', 'Main Course', '', '₹230'],
  ['Maratha Masala', 'मराठम मसाला', 'A rustic Maharashtrian masala preparation', 'Main Course', '', '₹240'],
  ['Maratha Chatpata', 'मराठम चटपटा', 'Tangy and spicy Maharashtrian vegetables', 'Main Course', '', '₹240'],
  ['Maratha Tikka Masala', 'मराठम टिक्का मसाला', 'Maharashtrian-style tikka in masala', 'Main Course', '', '₹250'],
  ['Veg Agra', 'व्हेज आग्रा', 'Vegetables in a house special gravy', 'Main Course', '', '₹260'],
  ['Veg Bhuna Masala', 'व्हेज भुना मसाला', 'Slow-cooked vegetables in bhuna masala', 'Main Course', '', '₹250'],
  ['Veg Chatpata', 'व्हेज चटपटा', 'Tangy, spicy mixed vegetables', 'Main Course', '', '₹240'],
  ['Veg Chilli Milli', 'व्हेज चिल्ली मिली', 'A lively mix of vegetables and spices', 'Main Course', '', '₹250'],
  ['Veg Handi', 'व्हेज हंडी', 'Mixed vegetables in a handi gravy', 'Main Course', '', '₹280'],
  ['Veg Kolhapuri', 'व्हेज कोल्हापुरी', 'Bold, rustic Maharashtrian flavours', 'Main Course', 'Chef’s Pick', '₹250'],
  ['Veg Lajjatdar', 'व्हेज लज्जतदार', 'A rich and flavourful vegetable curry', 'Main Course', '', '₹250'],
  ['Veg Makhmalwala Special', 'व्हेज मखमलवाला स्पेशल', 'Smooth, creamy house special gravy', 'Main Course', '', '₹270'],
  ['Veg Malai Kofta Special', 'व्हेज मलाई कोफ्ता स्पेशल', 'Soft kofta in creamy malai gravy', 'Main Course', '', '₹270'],
  ['Veg Maratha', 'व्हेज मराठा', 'A signature Maharashtrian vegetable curry', 'Main Course', '', '₹260'],
  ['Veg Patiala', 'व्हेज पटियाला', 'A hearty royal-style vegetable curry', 'Main Course', '', '₹280'],
  ['Veg Puneri', 'व्हेज पुणेरी', 'Pune-style spiced vegetables', 'Main Course', '', '₹250'],
  ['Veg Tadka Wala', 'व्हेज तडका वाला', 'Vegetables finished with a fragrant tadka', 'Main Course', '', '₹250'],
  ['Veg Tawa Masala', 'व्हेज तवा मसाला', 'Tawa-cooked vegetables in masala', 'Main Course', '', '₹250'],
  ['Palak Paneer', 'पालक पनीर', 'Paneer in creamy spinach gravy', 'Paneer', '', '₹240'],
  ['Kadai Paneer', 'कडाई पनीर', 'Paneer with peppers in kadai masala', 'Paneer', '', '₹250'],
  ['Paneer Butter Masala', 'पनीर बटर मसाला', 'Creamy tomato gravy, soft paneer', 'Paneer', 'Popular', '₹250'],
  ['Paneer Bhurji', 'पनीर भुर्जी', 'Crumbled paneer cooked with spices', 'Paneer', '', '₹260'],
  ['Paneer Chatka', 'पनीर चटका', 'Paneer with a bold, spicy seasoning', 'Paneer', '', '₹250'],
  ['Paneer Chatpata', 'पनीर चटपटा', 'Tangy and spicy paneer preparation', 'Paneer', '', '₹250'],
  ['Paneer Laziz', 'पनीर लजीज', 'A rich and delicious paneer curry', 'Paneer', '', '₹250'],
  ['Paneer Lajjatdar', 'पनीर लज्जतदार', 'A flavourful signature paneer curry', 'Paneer', '', '₹250'],
  ['Paneer Makhhanwala', 'पनीर मख्खनवाला', 'Paneer in buttery gravy', 'Paneer', '', '₹260'],
  ['Matar Paneer', 'मटर पनीर', 'Paneer and peas in tomato gravy', 'Paneer', '', '₹240'],
  ['Paneer Masala', 'पनीर मसाला', 'Paneer in spiced masala gravy', 'Paneer', '', '₹240'],
  ['Special Khazana', 'स्पे. खजाना', 'A special mixed house preparation', 'Paneer', 'Chef’s Pick', '₹450'],
  ['Shrikrishna Special Veg', 'श्रीकृष्ण स्पेशल व्हेज', 'The house special vegetarian preparation', 'Main Course', 'Chef’s Pick', '₹420'],
  ['Nawabi Paneer', 'नवाबी पनीर', 'Rich, royal-style paneer gravy', 'Paneer', '', '₹400'],
  ['Cheese Anguri Kofta', 'चीज अंगुरी कोफ्ता', 'Cheese-filled kofta in rich gravy', 'Paneer', '', '₹400'],
  ['Paneer Mussalam', 'पनीर मुसल्लम', 'A whole, richly spiced paneer preparation', 'Paneer', '', '₹450'],
  ['Shrikrishna Special Paneer', 'श्रीकृष्ण स्पेशल पनीर', 'A signature house paneer favourite', 'Paneer', 'Chef’s Pick', '₹450'],
  ['Paneer Sultana', 'पनीर सुलताना', 'Paneer in a rich special gravy', 'Paneer', '', '₹280'],
  ['Paneer Tawa Masala', 'पनीर तवा मसाला', 'Tawa-cooked paneer with masala', 'Paneer', '', '₹240'],
  ['Paneer Tikka Masala', 'पनीर टिक्का मसाला', 'Tikka pieces in masala gravy', 'Paneer', '', '₹250'],
  ['Paneer Tufani', 'पनीर तुफानी', 'A hot and spicy paneer preparation', 'Paneer', '', '₹260'],
  ['Paneer Handi', 'पनीर हंडी', 'Paneer cooked in a handi gravy', 'Paneer', '', '₹280'],
  ['Wheat Roti Butter', 'व्हीट रोटी बटर', 'Whole wheat roti with butter', 'Breads', '', '₹30'],
  ['Wheat Roti', 'व्हीट रोटी', 'Fresh whole wheat roti', 'Breads', '', '₹25'],
  ['Roti', 'रोटी', 'Fresh Indian flatbread', 'Breads', '', '₹20'],
  ['Butter Roti', 'बटर रोटी', 'Roti finished with butter', 'Breads', '', '₹25'],
  ['Naan', 'नान', 'Soft tandoor naan', 'Breads', '', '₹35'],
  ['Butter Naan', 'बटर नान', 'Soft tandoor bread finished with butter', 'Breads', '', '₹40'],
  ['Lachha Naan', 'लच्छा नान', 'Layered tandoor naan', 'Breads', '', '₹60'],
  ['Kulcha', 'कुल्चा', 'Soft leavened Indian bread', 'Breads', '', '₹30'],
  ['Butter Kulcha', 'बटर कुल्चा', 'Kulcha finished with butter', 'Breads', '', '₹30'],
  ['Lachha Paratha', 'लच्छा पराठा', 'Flaky layered paratha', 'Breads', '', '₹50'],
  ['Cheese Naan', 'चीज नान', 'Naan filled with cheese', 'Breads', '', '₹80'],
  ['Cheese Garlic Naan', 'चीज गार्लिक नान', 'Cheese naan with garlic', 'Breads', '', '₹90'],
  ['Simple Veg Thali', 'साधी व्हेज थाळी', 'A complete everyday vegetarian meal', 'Thali', '', '₹200'],
  ['Special Veg Thali', 'स्पे. व्हेज थाळी', 'A generous special vegetarian meal', 'Thali', 'Chef’s Pick', '₹250'],
  ['Tea', 'चहा', 'Freshly brewed tea', 'Beverages', '', '₹15 / ₹25'],
  ['Coffee', 'कॉफी', 'Hot coffee', 'Beverages', '', '₹30'],
  ['Misal Pav', 'मिसळ पाव', 'Maharashtrian sprout curry with pav', 'Snacks', '', '₹80'],
  ['Dahi Misal Pav', 'दही मिसळ पाव', 'Misal pav topped with curd', 'Snacks', '', '₹100'],
  ['Finger Chips', 'फिंगर चिप्स', 'Crisp golden potato fingers', 'Snacks', '', '₹100'],
  ['Chole Bhature', 'छोले भटुरे', 'Spiced chickpeas with fluffy bhature', 'Snacks', '', '₹130'],
  ['Pav Bhaji', 'पाव भाजी', 'Spiced vegetable mash with buttered pav', 'Snacks', 'Chef’s Pick', '₹120'],
  ['Cheese Pav Bhaji', 'चीज पाव भाजी', 'A generous, cheesy take on a classic', 'Snacks', '', '₹130'],
  ['Paneer Pav Bhaji', 'पनीर पाव भाजी', 'Pav bhaji with paneer', 'Snacks', '', '₹140'],
  ['Sabudana Khichdi', 'साबुदाणा खिचडी', 'Maharashtrian tapioca comfort food', 'Snacks', '', '₹80'],
  ['Toast', 'टोस्ट', 'Crisp toasted bread', 'Snacks', '', '₹40'],
  ['Bread Butter', 'ब्रेड बटर', 'Bread served with butter', 'Snacks', '', '₹30'],
  ['Veg Sandwich', 'व्हेज सँडविच', 'Fresh vegetable sandwich', 'Snacks', '', '₹90'],
  ['Veg Grilled Sandwich', 'व्हेज ग्रिल्ड सँडविच', 'Grilled vegetable sandwich', 'Snacks', '', '₹100'],
  ['Cheese Sandwich', 'चीज सँडविच', 'Sandwich with cheese', 'Snacks', '', '₹110'],
  ['Veg Cheese Grilled Sandwich', 'व्हेज चीज ग्रिल्ड सँडविच', 'Grilled vegetable and cheese sandwich', 'Snacks', '', '₹120'],
  ['Cheese Grilled Sandwich', 'चीज ग्रिल्ड सँडविच', 'Grilled sandwich with cheese', 'Snacks', '', '₹110'],
  ['Tomato Soup', 'टोमॅटो सूप', 'Warm tomato soup', 'Starters', '', '₹110'],
  ['Veg Manchow Soup', 'व्हेज मंचाव सूप', 'Spicy, warming and full of vegetables', 'Starters', '', '₹120'],
  ['Veg Noodle Soup', 'व्हेज नूडल्स सूप', 'Vegetable soup with noodles', 'Starters', '', '₹130'],
  ['Soyabean Chilli Dry', 'सोयाबीन चिली ड्राय', 'Crisp soyabean in chilli sauce', 'Chinese', '', '₹180'],
  ['Veg Manchurian Dry', 'व्हेज मंच्युरियन ड्राय', 'Crisp vegetable Manchurian balls', 'Chinese', '', '₹190'],
  ['Chinese 65', 'चायनीज 65', 'Crisp Indo-Chinese 65 preparation', 'Chinese', '', '₹210'],
  ['Paneer Chilli Dry', 'पनीर चिली ड्राय', 'Paneer with chilli and vegetables', 'Chinese', '', '₹210'],
  ['Paneer 65', 'पनीर 65', 'Crisp spiced paneer bites', 'Chinese', '', '₹220'],
  ['Paneer Crispy', 'पनीर क्रिस्पी', 'Crispy fried paneer bites', 'Chinese', '', '₹240'],
  ['Paneer Manchurian Dry', 'पनीर मंच्युरियन ड्राय', 'Paneer Manchurian in dry sauce', 'Chinese', '', '₹220'],
  ['Paneer Tikka in Gravy', 'पनीर टिक्का इन ग्रेव्ही', 'Paneer tikka in a savoury gravy', 'Chinese', '', '₹250'],
  ['Veg Crispy', 'व्हेज क्रिस्पी', 'Crisp vegetables with Indo-Chinese seasoning', 'Chinese', '', '₹230'],
  ['Hara Bhara Kabab', 'हराभरा कबाब', 'Green vegetable and spinach kebabs', 'Starters', '', '₹230'],
  ['Cheese Ball', 'चीज बॉल', 'Crisp cheese-filled bites', 'Starters', '', '₹230'],
  ['Paneer Tikka', 'पनीर टिक्का', 'Charred paneer, peppers and onions', 'Starters', 'Popular', '₹250'],
  ['Veg Tandoori Platter', 'व्हेज तंदूर प्लेटर', 'A selection of tandoor vegetables', 'Starters', '', '₹400'],
  ['Tandoori Manchurian', 'तंदुरी मंच्युरियन', 'Manchurian with tandoor flavour', 'Starters', '', '₹240'],
  ['Soya Chaap Kolhapuri', 'सोया चाप कोल्हापुरी', 'Soya chaap in Kolhapuri masala', 'Starters', '', '₹270'],
  ['Soya Tandoor', 'सोया तंदूर', 'Tandoor-grilled soya chaap', 'Starters', '', '₹280'],
  ['Dal Fry', 'डाळ फ्राय', 'Yellow lentils tempered with spices', 'Main Course', '', '₹120'],
  ['Dal Tadka', 'डाळ तडका', 'Yellow lentils with a fragrant tadka', 'Main Course', '', '₹130'],
  ['Dal Kolhapuri', 'डाळ कोल्हापुरी', 'Dal with bold Kolhapuri spices', 'Main Course', '', '₹150'],
  ['Dal Hyderabadi', 'डाळ हैदराबादी', 'Dal with Hyderabad-style spices', 'Main Course', '', '₹150'],
  ['Plain Rice', 'प्लेन राईस', 'Steamed rice', 'Rice & Biryani', '', '₹100'],
  ['Half Rice', 'हाफ राईस', 'A smaller serving of steamed rice', 'Rice & Biryani', '', '₹70'],
  ['Jeera Rice Full', 'जीरा राईस फुल', 'Cumin rice, full portion', 'Rice & Biryani', '', '₹120'],
  ['Jeera Rice Half', 'जीरा राईस हाफ', 'Cumin rice, half portion', 'Rice & Biryani', '', '₹100'],
  ['Dal Khichdi', 'डाळ खिचडी', 'Comforting dal and rice khichdi', 'Rice & Biryani', '', '₹170'],
  ['Veg Pulao', 'व्हेज पुलाव', 'Fragrant vegetable pulao', 'Rice & Biryani', '', '₹180'],
  ['Green Peas Pulao', 'ग्रीन पीस पुलाव', 'Fragrant pulao with green peas', 'Rice & Biryani', '', '₹170'],
  ['Paneer Pulao', 'पनीर पुलाव', 'Pulao with paneer and spices', 'Rice & Biryani', '', '₹210'],
  ['Paneer Biryani', 'पनीर बिर्याणी', 'Aromatic biryani with paneer', 'Rice & Biryani', '', '₹250'],
  ['Veg Biryani', 'व्हेज बिर्याणी', 'Fragrant rice layered with vegetables', 'Rice & Biryani', '', '₹220'],
  ['Veg Dum Biryani', 'व्हेज दम बिर्याणी', 'Slow-cooked layered vegetable biryani', 'Rice & Biryani', 'Popular', '₹220'],
  ['Special Biryani', 'स्पे. बिर्याणी', 'A special house biryani', 'Rice & Biryani', '', '₹260'],
  ['Veg Hyderabadi Biryani', 'व्हेज हैदराबादी बिर्याणी', 'Hyderabadi-style vegetable biryani', 'Rice & Biryani', '', '₹230'],
  ['Veg Fried Rice', 'व्हेज फ्राईड राईस', 'Aromatic rice with garden vegetables', 'Chinese', '', '₹190'],
  ['Veg Schezwan Rice', 'व्हेज शेझवान राईस', 'Spicy Schezwan vegetable rice', 'Chinese', '', '₹200'],
  ['Veg Triple Fried Rice with Gravy', 'व्हेज ट्रिपल फ्राईड राईस विथ ग्रेव्ही', 'Layered fried rice with gravy', 'Chinese', '', '₹240'],
  ['Veg Manchurian Rice with Gravy', 'व्हेज मंच्युरियन राईस विथ ग्रेव्ही', 'Fried rice with Manchurian and gravy', 'Chinese', '', '₹240'],
  ['Veg Hakka Noodles', 'व्हेज हक्का नूडल्स', 'Wok-tossed noodles and fresh vegetables', 'Chinese', 'Popular', '₹180'],
  ['Veg Schezwan Noodles', 'व्हेज शेझवान नूडल्स', 'Spicy Schezwan noodles with vegetables', 'Chinese', '', '₹200'],
];

const filters = ['All', 'Starters', 'Main Course', 'Paneer', 'Breads', 'Rice & Biryani', 'South Indian', 'Chinese', 'Snacks', 'Beverages'];

const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65 } } };

function BilingualTitle({ children, marathi, light = false }: { children: string; marathi: string; light?: boolean }) {
  return (
    <div>
      <p className={`mb-3 text-[11px] font-bold uppercase tracking-[0.24em] ${light ? 'text-[#d7ad53]' : 'text-[#b48635]'}`}>{marathi}</p>
      <h2 className={`font-serif text-4xl leading-[1.08] tracking-[-0.03em] md:text-5xl ${light ? 'text-[#fffaf0]' : 'text-[#173e35]'}`}>{children}</h2>
    </div>
  );
}

function PageLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} className="transition-colors hover:text-[#b48635]">{children}</a>;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(false), 4500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredMenu = useMemo(() => menuItems.filter(([name, marathi, description, category]) => {
    const matchesFilter = activeFilter === 'All' || category === activeFilter;
    const query = search.toLowerCase();
    return matchesFilter && (!query || name.toLowerCase().includes(query) || marathi.includes(search) || description.toLowerCase().includes(query));
  }), [activeFilter, search]);

  const gallery = [
    [images.thali, 'Vegetarian thali'], [images.paneer, 'Paneer specialities'], [images.dosa, 'South Indian favourites'],
    [images.biryani, 'Biryani and rice'], [images.chineseNoodles, 'Chinese favourites'], [images.pavBhaji, 'Mumbai street snacks'],
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileNav(false);
  };

  return (
    <main className="overflow-hidden bg-[#fbf8f0] text-[#26352f]">
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#fbf8f0]/95 shadow-[0_4px_24px_rgba(26,55,46,0.08)] backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-10">
          <button onClick={() => scrollTo('home')} className={`text-left ${scrolled ? 'text-[#173e35]' : 'text-white'}`}>
            <span className="block font-serif text-xl leading-none tracking-[-0.03em]">Shrikrishna</span>
            <span className={`text-[9px] font-bold uppercase tracking-[0.25em] ${scrolled ? 'text-[#b48635]' : 'text-[#e8c877]'}`}>Pure Veg Restaurant</span>
          </button>
          <nav className={`hidden items-center gap-7 text-[11px] font-bold uppercase tracking-[0.13em] lg:flex ${scrolled ? 'text-[#305046]' : 'text-white/90'}`}>
            {['About', 'Menu', 'Specialities', 'Gallery', 'Contact'].map((item) => <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="transition-colors hover:text-[#d7ad53]">{item}</button>)}
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <a href={phoneLink} className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${scrolled ? 'border-[#1c4c3f]/20 text-[#173e35] hover:bg-[#173e35] hover:text-white' : 'border-white/30 text-white hover:bg-white hover:text-[#173e35]'}`}><Phone size={14} /> Call Now</a>
            <a href={mapLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-[#cf9f40] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#183d34] transition-transform hover:-translate-y-0.5"><Compass size={14} /> Directions</a>
          </div>
          <button aria-label="Open menu" onClick={() => setMobileNav(true)} className={`rounded-full p-2 lg:hidden ${scrolled ? 'text-[#173e35]' : 'text-white'}`}><MenuIcon size={24} /></button>
        </div>
      </header>

      <AnimatePresence>
        {mobileNav && <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 26 }} className="fixed inset-0 z-50 flex flex-col bg-[#173e35] p-6 text-[#fffaf0] lg:hidden">
          <div className="flex items-center justify-between"><span className="font-serif text-2xl">Shrikrishna</span><button onClick={() => setMobileNav(false)} aria-label="Close menu"><X /></button></div>
          <div className="mt-20 flex flex-col gap-7 font-serif text-4xl">{['Home', 'About', 'Menu', 'Specialities', 'Gallery', 'Contact'].map((item) => <button className="text-left" key={item} onClick={() => scrollTo(item.toLowerCase())}>{item}</button>)}</div>
          <div className="mt-auto grid grid-cols-2 gap-3"><a href={phoneLink} className="flex items-center justify-center gap-2 rounded-full bg-[#cf9f40] py-3 text-sm font-bold text-[#173e35]"><Phone size={16} /> Call</a><a href={mapLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-white/25 py-3 text-sm font-bold"><MapPin size={16} /> Directions</a></div>
        </motion.div>}
      </AnimatePresence>

      <section id="home" className="relative flex min-h-[730px] items-end bg-[#143a31] pb-20 pt-32 md:min-h-[780px] md:pb-28">
        <img src={images.hero} alt="A vibrant Indian vegetarian thali with paneer curry and rice" className="absolute inset-0 h-full w-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,38,31,.9),rgba(10,38,31,.48)_55%,rgba(10,38,31,.12))]" />
        <div className="absolute right-[8%] top-[26%] hidden h-36 w-36 rounded-full border border-[#e6c36f]/45 p-3 md:block"><div className="flex h-full items-center justify-center rounded-full border border-[#e6c36f]/40 text-center font-serif text-lg leading-tight text-[#f8df9e]">Pure<br />vegetarian<br /><span className="text-xl">✦</span></div></div>
        <div className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
          <motion.div initial="hidden" animate="visible" variants={reveal} className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.27em] text-[#e7c778]"><span className="h-px w-10 bg-[#e7c778]" /> Baramati · Maharashtra</div>
            <h1 className="max-w-3xl font-serif text-5xl leading-[.98] tracking-[-0.045em] text-[#fffaf0] md:text-7xl">Pure Vegetarian <span className="text-[#e7c778]">Flavours,</span><br /> Made for Every Family</h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-white/75 md:text-lg">North Indian, South Indian, Chinese, biryani, snacks and vegetarian favourites — served with warmth in the heart of Baramati.</p>
            <div className="mt-9 flex flex-wrap gap-3"><button onClick={() => scrollTo('menu')} className="flex items-center gap-2 rounded-full bg-[#cf9f40] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#183d34] transition-transform hover:-translate-y-1">Explore Menu <ArrowRight size={15} /></button><a href={phoneLink} className="flex items-center gap-2 rounded-full border border-white/35 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-[#183d34]"><Phone size={15} /> Call Restaurant</a><a href={mapLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-3.5 text-xs font-bold uppercase tracking-wider text-[#f3d58a]">Get Directions <ArrowRight size={15} /></a></div>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/20 pt-5 text-[10px] font-bold uppercase tracking-[0.13em] text-white/70"><span className="flex items-center gap-2"><Leaf size={15} className="text-[#e7c778]" /> 100% Pure Veg</span><span className="flex items-center gap-2"><Heart size={14} className="text-[#e7c778]" /> Family Friendly</span><span className="flex items-center gap-2"><Utensils size={14} className="text-[#e7c778]" /> Wide Variety</span></div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="bg-[#fbf8f0] px-5 py-24 md:px-10 md:py-32"><div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal} className="relative pl-3"><div className="absolute -left-1 top-10 h-64 w-8 rounded-l-full border-b border-l border-t border-[#cba14c]/45" /><img src={images.thali} alt="Traditional Maharashtra vegetarian thali with pav bhaji and accompaniments" className="h-[420px] w-full rounded-[2rem] object-cover shadow-xl md:h-[530px]" /><div className="absolute -bottom-8 right-5 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-[#cf9f40] text-center text-[#173e35] shadow-lg"><Leaf size={19} /><span className="mt-1 text-[10px] font-bold uppercase leading-3 tracking-widest">Pure<br />Vegetarian</span></div></motion.div><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal}><BilingualTitle marathi="आमच्याबद्दल">A Destination for Vegetarian Food Lovers</BilingualTitle><p className="mt-7 max-w-xl text-base leading-8 text-[#66736b]">Shrikrishna Pure Veg brings together popular Indian and Indo-Chinese flavours under one roof. From family meals and paneer dishes to dosa, biryani, snacks, and refreshing beverages, the menu offers something for every taste.</p><div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4"><div className="border-t-2 border-[#cba14c] pt-3"><b className="font-serif text-2xl text-[#173e35]">100%</b><span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-[#7a857e]">Vegetarian</span></div><div className="border-t-2 border-[#cba14c] pt-3"><b className="font-serif text-2xl text-[#173e35]">06+</b><span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-[#7a857e]">Cuisines</span></div><div className="border-t-2 border-[#cba14c] pt-3"><b className="font-serif text-2xl text-[#173e35]">01</b><span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-[#7a857e]">Family Table</span></div><div className="border-t-2 border-[#cba14c] pt-3"><b className="font-serif text-2xl text-[#173e35]">01</b><span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-[#7a857e]">Easy Location</span></div></div><button onClick={() => scrollTo('specialities')} className="mt-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1e5848] hover:text-[#b48635]">Discover our menu <ArrowRight size={15} /></button></motion.div></div></section>

      <section id="specialities" className="bg-[#f1eee3] px-5 py-24 md:px-10 md:py-28"><div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-end justify-between gap-6"><BilingualTitle marathi="आमच्या खासियत">A Little Something for Everyone</BilingualTitle><p className="max-w-sm text-sm leading-6 text-[#778078]">From familiar comfort food to new favourites, discover the many flavours on our table.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categories.map(({ en, mr, copy, image, icon: Icon }, index) => <motion.button whileHover={{ y: -5 }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { delay: index * .06 } } }} onClick={() => { setActiveFilter(en === 'North Indian' || en === 'Paneer Specialities' ? 'Paneer' : en === 'Rice & Biryani' ? 'Rice & Biryani' : en === 'Snacks & Chaat' ? 'Snacks' : en); scrollTo('menu'); }} key={en} className="group relative h-64 overflow-hidden rounded-2xl text-left"><img src={image} alt={`${en} vegetarian dishes`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-[#102e27]/90 via-[#102e27]/25 to-transparent" /><div className="absolute bottom-5 left-5 right-5 text-white"><div className="mb-2 flex items-center gap-2 text-[#e6c575]"><Icon size={16} /><span className="text-[10px] font-bold uppercase tracking-widest">{mr}</span></div><h3 className="font-serif text-2xl">{en}</h3><p className="mt-1 text-xs text-white/75">{copy}</p><span className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#e6c575]">View dishes <ArrowRight size={13} /></span></div></motion.button>)}</div></div></section>

      <section className="bg-[#fbf8f0] px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><div className="flex items-end justify-between gap-6"><BilingualTitle marathi="लोकप्रिय पदार्थ">The Table Favourites</BilingualTitle><div className="hidden gap-2 md:flex"><button aria-label="Previous dishes" className="rounded-full border border-[#c8d1c6] p-3 text-[#173e35] hover:bg-[#173e35] hover:text-white"><ChevronLeft size={18} /></button><button aria-label="Next dishes" className="rounded-full border border-[#c8d1c6] p-3 text-[#173e35] hover:bg-[#173e35] hover:text-white"><ChevronRight size={18} /></button></div></div><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{popularDishes.map(([name, marathi, copy, badge, image, price], index) => <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, amount: .12 }} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: index * .05 } } }} whileHover={{ y: -5 }} key={name} className="group overflow-hidden rounded-2xl border border-[#e1e4d9] bg-white shadow-[0_10px_30px_rgba(29,55,44,.04)]"><div className="relative h-52 overflow-hidden"><img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute left-3 top-3 rounded-full bg-[#fbf8f0]/95 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[#31584b]">{badge}</span><span className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#f0d89c] text-[#173e35]">⌁</span></div><div className="p-5"><h3 className="font-serif text-xl text-[#173e35]">{name}</h3><p className="mt-0.5 text-[11px] font-semibold text-[#b48635]">{marathi}</p><p className="mt-3 text-xs leading-5 text-[#778078]">{copy}</p><div className="mt-4 flex items-center justify-between border-t border-[#edf0e9] pt-3"><span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#5c786c]"><span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#5c786c] text-[9px]">V</span> Vegetarian</span><span className="text-sm font-bold text-[#173e35]">{price}</span></div></div></motion.article>)}</div></div></section>

      <section id="menu" className="bg-[#173e35] px-5 py-24 text-[#fffaf0] md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-end justify-between gap-6"><BilingualTitle light marathi="संपूर्ण मेनू">Explore the Full Menu</BilingualTitle><div className="flex items-center gap-2 text-xs text-white/55"><Leaf size={15} className="text-[#d7ad53]" /> Pure vegetarian, always</div></div><div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">{filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeFilter === filter ? 'border-[#d7ad53] bg-[#d7ad53] text-[#173e35]' : 'border-white/20 text-white/70 hover:border-[#d7ad53] hover:text-[#d7ad53]'}`}>{filter}</button>)}</div><div className="relative shrink-0"><Search size={16} className="absolute left-3 top-3 text-white/45" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search dishes..." className="w-full rounded-full border border-white/20 bg-white/10 py-2.5 pl-9 pr-4 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#d7ad53] lg:w-52" /></div></div><div className="mt-10 grid gap-x-12 md:grid-cols-2">{filteredMenu.map(([name, marathi, description, category, badge, price]) => <motion.div layout key={name} className="flex items-start justify-between border-b border-white/10 py-5"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-serif text-xl text-[#fffaf0]">{name}</h3>{badge && <span className="rounded-full bg-[#d7ad53]/15 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-[#e7c778]">{badge}</span>}</div><p className="mt-0.5 text-xs font-semibold text-[#d7ad53]">{marathi}</p><p className="mt-2 text-xs leading-5 text-white/50">{description}</p></div><div className="ml-4 flex shrink-0 items-center gap-2 pt-1 text-sm font-bold text-[#e7c778]"><span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#b1c5b6] text-[9px] text-[#b1c5b6]">V</span> {price}</div></motion.div>)}</div>{filteredMenu.length === 0 && <p className="py-14 text-center font-serif text-2xl text-white/60">No dishes found. Try another search.</p>}</div></section>

      <section className="bg-[#fbf8f0] px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><div className="text-center"><BilingualTitle marathi="का श्रीकृष्ण?">A Table Made for Togetherness</BilingualTitle></div><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[[ShieldCheck, 'Pure Vegetarian', 'A menu designed exclusively for vegetarian food lovers.'], [Sparkles, 'Wide Variety', 'North Indian, South Indian, Chinese, snacks and more.'], [Heart, 'Family-Friendly', 'A comfortable dining option for families and groups.'], [MapPin, 'Easy to Reach', 'Call the restaurant or get directions instantly.']].map(([Icon, title, text], index) => { const FeatureIcon = Icon as typeof ShieldCheck; return <motion.div whileHover={{ y: -5 }} key={title as string} className="rounded-2xl bg-[#f0eee5] p-7"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#173e35] text-[#e7c778]"><FeatureIcon size={20} /></div><h3 className="mt-6 font-serif text-2xl text-[#173e35]">{title as string}</h3><p className="mt-3 text-sm leading-6 text-[#748078]">{text as string}</p><div className="mt-6 text-[10px] font-bold text-[#b48635]">0{index + 1} / 04</div></motion.div> })}</div></div></section>

      <section className="bg-[#e8dfcc] px-5 py-20 md:px-10"><div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.2fr_.8fr]"><div><p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#9a6d24]">आमंत्रण</p><h2 className="font-serif text-5xl leading-none tracking-[-0.04em] text-[#173e35] md:text-6xl">Planning a<br /><span className="text-[#9a6d24]">Family Meal?</span></h2><p className="mt-6 max-w-lg text-sm leading-7 text-[#5f6d63]">Explore a wide selection of vegetarian dishes and contact the restaurant for current menu details, reservations, or directions.</p></div><div className="flex flex-wrap gap-3 lg:justify-end"><a href={phoneLink} className="flex items-center gap-2 rounded-full bg-[#173e35] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#265c4b]"><Phone size={15} /> Call Now</a><a href={mapLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-[#173e35]/25 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#173e35] hover:bg-[#173e35] hover:text-white"><MapPin size={15} /> Get Directions</a></div></div></section>

      <section className="bg-[#fbf8f0] px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><div className="flex items-end justify-between"><BilingualTitle marathi="आमची जागा">A Glimpse of the Experience</BilingualTitle><span className="hidden text-[10px] font-bold uppercase tracking-widest text-[#9ba39b] sm:block">Scroll to explore · {gallery.length} moments</span></div><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">{gallery.map(([image, alt], index) => <button key={alt} onClick={() => { setGalleryIndex(index); setLightbox(image); }} className={`group relative overflow-hidden rounded-xl ${index === 0 ? 'col-span-2 row-span-2 h-[360px] md:h-[500px]' : 'h-44 md:h-[242px]'}`}><img src={image} alt={alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-[#173e35]/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" /><span className="absolute bottom-4 left-4 text-left font-serif text-lg text-white opacity-0 transition-opacity group-hover:opacity-100">{alt}</span></button>)}</div></div></section>

      <section id="contact" className="bg-[#173e35] px-5 py-24 text-[#fffaf0] md:px-10 md:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr]"><div><BilingualTitle light marathi="भेट द्या">Come, Pull Up a Chair</BilingualTitle><p className="mt-7 max-w-md text-sm leading-7 text-white/60">Whether it is a quick bite, a family celebration, or a table for two — we would be happy to welcome you.</p><div className="mt-10 space-y-5"><a href={phoneLink} className="flex items-center gap-4 text-sm text-white/80 hover:text-[#e7c778]"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#e7c778]"><Phone size={17} /></span><span><b className="block text-[10px] uppercase tracking-widest text-white/45">Call us</b>+91 77559 13664</span></a><a href={mapLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-sm text-white/80 hover:text-[#e7c778]"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#e7c778]"><MapPin size={17} /></span><span><b className="block text-[10px] uppercase tracking-widest text-white/45">Find us</b>Shop 3, Shakti Market, Kasba,<br />near Nira Road, Baramati</span></a><div className="flex items-center gap-4 text-sm text-white/80"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#e7c778]"><Clock3 size={17} /></span><span><b className="block text-[10px] uppercase tracking-widest text-white/45">Hours</b>Please call to confirm</span></div></div></div><div className="rounded-2xl bg-[#f7f4eb] p-6 text-[#173e35] md:p-9"><div className="mb-7 flex items-center justify-between"><div><h3 className="font-serif text-3xl">Request a Table</h3><p className="mt-1 text-xs text-[#778078]">Send an enquiry and we will get back to you.</p></div><CalendarDays className="text-[#b48635]" /></div><form onSubmit={(event) => { event.preventDefault(); setToast(true); event.currentTarget.reset(); }} className="grid gap-4 sm:grid-cols-2"><input required aria-label="Customer name" placeholder="Your name" className="rounded-lg border border-[#dce1d7] bg-white px-4 py-3 text-sm outline-none focus:border-[#b48635]" /><input required type="tel" aria-label="Phone number" placeholder="Phone number" className="rounded-lg border border-[#dce1d7] bg-white px-4 py-3 text-sm outline-none focus:border-[#b48635]" /><input required type="date" aria-label="Date" className="rounded-lg border border-[#dce1d7] bg-white px-4 py-3 text-sm text-[#718078] outline-none focus:border-[#b48635]" /><select aria-label="Preferred time" className="rounded-lg border border-[#dce1d7] bg-white px-4 py-3 text-sm text-[#718078] outline-none focus:border-[#b48635]"><option>Preferred time</option><option>Lunch</option><option>Dinner</option></select><select aria-label="Number of guests" className="rounded-lg border border-[#dce1d7] bg-white px-4 py-3 text-sm text-[#718078] outline-none focus:border-[#b48635]"><option>Number of guests</option><option>2 guests</option><option>4 guests</option><option>6+ guests</option></select><input aria-label="Special request" placeholder="Special request (optional)" className="rounded-lg border border-[#dce1d7] bg-white px-4 py-3 text-sm outline-none focus:border-[#b48635]" /><button className="flex items-center justify-center gap-2 rounded-lg bg-[#173e35] py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#265c4b] sm:col-span-2">Request a Table <ArrowRight size={15} /></button></form><a href={whatsappLink} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-[#bed1c1] py-3 text-xs font-bold uppercase tracking-widest text-[#2c604d] hover:bg-[#e4eee3]"><MessageCircle size={16} /> Enquire on WhatsApp</a></div></div></section>

      <footer className="bg-[#102f28] px-5 pb-28 pt-12 text-white/60 md:px-10 md:pb-12"><div className="mx-auto max-w-7xl"><div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]"><div><p className="font-serif text-2xl text-[#fffaf0]">Shrikrishna</p><p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#d7ad53]">Pure Veg Restaurant</p><p className="mt-5 max-w-xs text-xs leading-6">A warm table for every family, bringing the flavours of India to Baramati.</p></div><div><h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d7ad53]">Explore</h4><div className="mt-4 flex flex-col gap-3 text-xs"><PageLink href="#about">About us</PageLink><PageLink href="#menu">Digital menu</PageLink><PageLink href="#specialities">Specialities</PageLink><PageLink href="#gallery">Gallery</PageLink></div></div><div><h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d7ad53]">Contact</h4><div className="mt-4 flex flex-col gap-3 text-xs"><a href={phoneLink}>+91 77559 13664</a><span>Shop 3, Shakti Market, Kasba</span><span>Baramati, Maharashtra</span></div></div><div><h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d7ad53]">Follow along</h4><div className="mt-4 flex gap-3"><a aria-label="Instagram" href="#" className="rounded-full border border-white/15 p-2 hover:border-[#d7ad53]"><Instagram size={15} /></a><a aria-label="Facebook" href="#" className="rounded-full border border-white/15 p-2 hover:border-[#d7ad53]"><Facebook size={15} /></a><a href={mapLink} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 p-2 hover:border-[#d7ad53]"><MapPin size={15} /></a></div><a href="#" className="mt-5 block text-xs underline underline-offset-4">Privacy Policy</a></div></div><div className="flex flex-col justify-between gap-4 pt-6 text-[10px] leading-5 text-white/35 sm:flex-row"><span>© {new Date().getFullYear()} Shrikrishna Pure Veg Restaurant</span><span className="max-w-xl">Unofficial website redesign concept created for presentation purposes. Not affiliated with or officially approved by Shrikrishna Pure Veg Restaurant.</span></div></div></footer>

      <div className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-4 border-t border-[#dfe4d9] bg-[#fbf8f0]/95 p-2 shadow-[0_-5px_25px_rgba(16,47,40,.08)] backdrop-blur-md sm:hidden"><a href={phoneLink} className="flex flex-col items-center gap-1 py-2 text-[9px] font-bold uppercase tracking-wider text-[#173e35]"><Phone size={17} /> Call</a><button onClick={() => scrollTo('menu')} className="flex flex-col items-center gap-1 py-2 text-[9px] font-bold uppercase tracking-wider text-[#173e35]"><BookOpen size={17} /> Menu</button><a href={mapLink} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-2 text-[9px] font-bold uppercase tracking-wider text-[#173e35]"><MapPin size={17} /> Directions</a><button onClick={() => scrollTo('contact')} className="flex flex-col items-center gap-1 py-2 text-[9px] font-bold uppercase tracking-wider text-[#173e35]"><MessageCircle size={17} /> Enquiry</button></div>
      <a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp enquiry" className="fixed bottom-20 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#2c9d63] text-white shadow-xl transition-transform hover:scale-105 sm:bottom-6"><MessageCircle size={23} /></a>

      <AnimatePresence>{toast && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#173e35] px-5 py-3 text-sm text-white shadow-2xl sm:bottom-8"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d7ad53] text-[#173e35]"><Check size={14} /></span>Thank you. Your enquiry has been noted.</motion.div>}</AnimatePresence>
      <AnimatePresence>{lightbox && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0c251f]/90 p-5"><button aria-label="Close image" onClick={() => setLightbox(null)} className="absolute right-5 top-5 text-white"><X /></button><button aria-label="Previous image" onClick={(event) => { event.stopPropagation(); const index = (galleryIndex - 1 + gallery.length) % gallery.length; setGalleryIndex(index); setLightbox(gallery[index][0]); }} className="absolute left-4 rounded-full border border-white/30 p-2 text-white"><ChevronLeft /></button><img onClick={(event) => event.stopPropagation()} src={lightbox} alt={gallery[galleryIndex][1]} className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain" /><button aria-label="Next image" onClick={(event) => { event.stopPropagation(); const index = (galleryIndex + 1) % gallery.length; setGalleryIndex(index); setLightbox(gallery[index][0]); }} className="absolute right-4 rounded-full border border-white/30 p-2 text-white"><ChevronRight /></button></motion.div>}</AnimatePresence>
    </main>
  );
}
