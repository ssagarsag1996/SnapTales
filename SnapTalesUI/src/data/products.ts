export interface Product {
  id: number;
  name: string;
  style: string;
  price: number;
  orig: number | null;
  rating: number;
  reviews: number;
  sale: boolean;
  desc: string;
  sizes: string[];
  stock: number;
  sku: string;
}

export const PRODUCTS: Product[] = [
  {id:1,name:"Classic Walnut Frame",style:"classic",price:49.99,orig:69.99,rating:4.8,reviews:234,sale:true,desc:"Handcrafted walnut wood frame with a rich, warm finish. Perfect for family portraits and traditional art prints. Each piece is carefully sanded and finished with natural oils.",sizes:["5×7","8×10","11×14","16×20"],stock:45,sku:"ST-CW-001"},
  {id:2,name:"Midnight Matte Frame",style:"modern",price:34.99,orig:null,rating:4.6,reviews:182,sale:false,desc:"Sleek matte black finish with clean lines. A contemporary choice that makes your photos the focus of attention.",sizes:["4×6","5×7","8×10","12×16"],stock:78,sku:"ST-MM-002"},
  {id:3,name:"Gilded Baroque Frame",style:"ornate",price:89.99,orig:119.99,rating:4.9,reviews:97,sale:true,desc:"Stunning gold-leafed frame with intricate baroque detailing. A statement piece for fine art and cherished portraits.",sizes:["8×10","11×14","16×20","20×24"],stock:12,sku:"ST-GB-003"},
  {id:4,name:"White Float Frame",style:"minimal",price:29.99,orig:null,rating:4.5,reviews:312,sale:false,desc:"Minimalist white frame with a float effect. Creates the illusion of artwork suspended in air.",sizes:["5×7","8×10","11×14"],stock:120,sku:"ST-WF-004"},
  {id:5,name:"Barnwood Rustic Frame",style:"rustic",price:54.99,orig:74.99,rating:4.7,reviews:145,sale:true,desc:"Reclaimed barnwood frame with natural weathered texture. Each piece is unique with authentic character.",sizes:["5×7","8×10","11×14","16×20"],stock:33,sku:"ST-BR-005"},
  {id:6,name:"Gallery Slim Frame",style:"gallery",price:39.99,orig:null,rating:4.4,reviews:267,sale:false,desc:"Ultra-slim profile frame used by professional galleries. Museum-quality with UV-protective glazing.",sizes:["8×10","11×14","16×20","24×36"],stock:65,sku:"ST-GS-006"},
  {id:7,name:"Cherry Blossom Frame",style:"classic",price:59.99,orig:null,rating:4.8,reviews:89,sale:false,desc:"Premium cherry wood with a warm reddish tone. Hand-polished to a satin finish for timeless elegance.",sizes:["5×7","8×10","11×14"],stock:28,sku:"ST-CB-007"},
  {id:8,name:"Brushed Steel Frame",style:"modern",price:44.99,orig:59.99,rating:4.3,reviews:156,sale:true,desc:"Industrial brushed stainless steel frame. A bold, modern statement for contemporary spaces.",sizes:["4×6","8×10","12×16","16×20"],stock:52,sku:"ST-BS-008"},
  {id:9,name:"Victorian Gold Frame",style:"ornate",price:109.99,orig:null,rating:4.9,reviews:63,sale:false,desc:"Intricately carved gold frame inspired by Victorian era craftsmanship. A true collector's piece.",sizes:["11×14","16×20","20×24"],stock:8,sku:"ST-VG-009"},
  {id:10,name:"Nordic Birch Frame",style:"minimal",price:27.99,orig:null,rating:4.6,reviews:201,sale:false,desc:"Light Scandinavian birch wood frame with a clean, airy aesthetic. Perfect for creating gallery walls.",sizes:["4×6","5×7","8×10","11×14"],stock:95,sku:"ST-NB-010"},
  {id:11,name:"Driftwood Coastal Frame",style:"rustic",price:64.99,orig:79.99,rating:4.7,reviews:112,sale:true,desc:"Genuine driftwood frame with ocean-weathered character. Brings coastal charm to any room.",sizes:["5×7","8×10","11×14"],stock:22,sku:"ST-DC-011"},
  {id:12,name:"Shadow Box Deep Frame",style:"gallery",price:49.99,orig:null,rating:4.5,reviews:178,sale:false,desc:"Deep profile shadow box for displaying 3D objects, memorabilia, and layered art compositions.",sizes:["8×10","11×14","12×12","16×20"],stock:41,sku:"ST-SB-012"}
];

export interface Category {
  name: string; icon: string; cls: string; filter: string; count: number;
}
export const CATEGORIES: Category[] = [
  {name:"Classic",icon:"🖼️",cls:"cg1",filter:"classic",count:2},
  {name:"Modern",icon:"◼️",cls:"cg2",filter:"modern",count:2},
  {name:"Ornate",icon:"✨",cls:"cg3",filter:"ornate",count:2},
  {name:"Minimal",icon:"◻️",cls:"cg4",filter:"minimal",count:2},
  {name:"Rustic",icon:"🪵",cls:"cg5",filter:"rustic",count:2},
  {name:"Gallery",icon:"🎨",cls:"cg6",filter:"gallery",count:2},
  {name:"Shadow Box",icon:"📦",cls:"cg7",filter:"gallery",count:1},
  {name:"Custom",icon:"⚙️",cls:"cg8",filter:"all",count:12}
];

export const ORDERS_DATA = [
  {id:"ST-20260328-001",items:[1,3],total:139.98,status:"delivered",date:"Mar 28, 2026",progress:100},
  {id:"ST-20260401-002",items:[5,10],total:82.98,status:"shipped",date:"Apr 01, 2026",progress:65},
  {id:"ST-20260403-003",items:[9],total:109.99,status:"processing",date:"Apr 03, 2026",progress:25}
];

export const NOTIFS = [
  {type:"order",title:"Order Delivered",desc:"Your order ST-20260328-001 has been delivered successfully",time:"2 hours ago",unread:true},
  {type:"ship",title:"Shipment Update",desc:"Your order ST-20260401-002 is on its way! Track it now",time:"5 hours ago",unread:true},
  {type:"promo",title:"Spring Sale — 30% Off",desc:"Use code SPRING30 for 30% off all ornate frames this weekend",time:"1 day ago",unread:true},
  {type:"order",title:"Order Confirmed",desc:"Your order ST-20260403-003 has been confirmed and is being processed",time:"2 days ago",unread:false}
];

export const THEMES = [
  {id:'luxury-light',name:'Champagne',cls:'td-luxury-light'},
  {id:'luxury-dark',name:'Obsidian',cls:'td-luxury-dark'},
  {id:'ivory-rose',name:'Rose',cls:'td-ivory-rose'},
  {id:'midnight-teal',name:'Teal',cls:'td-midnight-teal'},
  {id:'warm-slate',name:'Slate',cls:'td-warm-slate'}
];

export const FRAME_STYLES: Record<string, {border:string;radius:string}> = {
  classic:{border:'7px solid #8B7355',radius:'2px'},
  modern:{border:'3px solid #2C2C2C',radius:'0'},
  ornate:{border:'9px double #C9A85C',radius:'3px'},
  minimal:{border:'2px solid #D0D0D0',radius:'0'},
  rustic:{border:'8px solid #A0856E',radius:'1px'},
  gallery:{border:'4px solid #1A1A1A',radius:'0'}
};
