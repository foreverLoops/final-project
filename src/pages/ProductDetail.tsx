// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { supabase } from '../lib/supabase';
// import { Product } from '../types';
// import { useCart } from '../contexts/CartContext';
// import { Minus, Plus } from 'lucide-react';

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   async function fetchProduct() {
//     try {
//       const { data, error } = await supabase
//         .from('products')
//         .select('*')
//         .eq('id', id)
//         .single();

//       if (error) throw error;
//       setProduct(data);
//     } catch (error) {
//       console.error('Error fetching product:', error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const handleAddToCart = () => {
//     if (product) {
//       addToCart(product, quantity);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="animate-pulse">
//         <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
//         <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
//         <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//         <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//       </div>
//     );
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       <div>
//         <img
//           src={product.image_url}
//           alt={product.name}
//           className="w-full h-96 object-cover rounded-lg"
//         />
//       </div>
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
//         <p className="text-xl font-medium text-gray-900">${product.price.toFixed(2)}</p>
//         <p className="text-gray-700">{product.description}</p>
//         <p className="text-sm text-gray-500">Stock: {product.stock}</p>

//         <div className="flex items-center space-x-4">
//           <button
//             onClick={() => setQuantity(q => Math.max(1, q - 1))}
//             className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
//           >
//             <Minus className="h-4 w-4" />
//           </button>
//           <span className="text-lg font-medium">{quantity}</span>
//           <button
//             onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
//             className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
//           >
//             <Plus className="h-4 w-4" />
//           </button>
//         </div>

//         <button
//           onClick={handleAddToCart}
//           disabled={product.stock === 0}
//           className="w-full py-3 px-8 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:bg-gray-400"
//         >
//           {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//         </button>
//       </div>
//     </div>
//   );
// }