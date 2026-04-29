'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function Admin() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Fruits');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState('In Stock');
  const [imageFile, setImageFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Product List State
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setFetching(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Refresh list immediately
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  // Handle Stock Update
  const updateStock = async (id, currentStock, change) => {
    const newStock = currentStock + change;
    if (newStock < 0) return;
    
    const newStatus = newStock === 0 ? 'Out of Stock' : 'In Stock';
    
    try {
      const { error } = await supabase
        .from('products')
        .update({ stock: newStock, status: newStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      fetchProducts();
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  // Handle Toggle Status
  const toggleStockStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'In Stock' ? 'Out of Stock' : 'In Stock';
    
    try {
      const { error } = await supabase
        .from('products')
        .update({ status: newStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      fetchProducts();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to update status');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (!imageFile) {
        throw new Error('Please select an image file.');
      }

      // 1. Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, imageFile);

      if (uploadError) {
        throw uploadError;
      }

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      // 3. Save product into Supabase table
      const { error: insertError } = await supabase
        .from('products')
        .insert([
          {
            name: name,
            price: Number(price),
            category: category,
            stock: Number(stock),
            status: status,
            image: publicUrl,
            unit: "kg",
          }
        ]);

      if (insertError) {
        throw insertError;
      }

      // Success
      setMessage({ type: 'success', text: 'Product added successfully' });
      
      // Clear all form fields
      setName('');
      setPrice('');
      setCategory('Fruits');
      setStock('');
      setStatus('In Stock');
      setImageFile(null);
      // Reset file input element visually
      document.getElementById('image-upload').value = '';
      
      // Refresh product list automatically
      fetchProducts();
      
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage({ type: 'error', text: 'Failed to add product: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      
      {/* ADD PRODUCT FORM */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Product</h1>
        
        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-black placeholder-gray-400 bg-white"
              placeholder="e.g. Fresh Apple"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input
              type="number"
              step="0.01"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-black placeholder-gray-400 bg-white"
              placeholder="e.g. 150"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-white text-black"
            >
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
            </select>
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-black placeholder-gray-400 bg-white"
              placeholder="e.g. 50"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-white text-black"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              required
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-white text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            <p className="mt-1 text-xs text-gray-500">You can choose from gallery or use camera.</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition ${
              loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
            }`}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>

      {/* PRODUCTS LIST */}
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-8 mt-8 mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Manage Products</h2>
        
        {fetching ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center space-x-4">
                  {/* Image */}
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    {product.image ? (
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                  
                  {/* Details */}
                  <div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span>₹{product.price} • {product.category}</span>
                      
                      {/* Stock Controls */}
                      <div className="flex items-center bg-gray-100 rounded-md">
                        <button 
                          onClick={() => updateStock(product.id, product.stock, -1)}
                          className="px-2 py-0.5 hover:bg-gray-200 rounded-l-md transition cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 font-medium min-w-[2rem] text-center text-gray-700">
                          {product.stock}
                        </span>
                        <button 
                          onClick={() => updateStock(product.id, product.stock, 1)}
                          className="px-2 py-0.5 hover:bg-gray-200 rounded-r-md transition cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        product.status === 'Out of Stock' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {product.status || 'In Stock'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  {/* Toggle Status Button */}
                  <button
                    onClick={() => toggleStockStatus(product.id, product.status || 'In Stock')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition cursor-pointer ${
                      product.status === 'In Stock' || !product.status
                        ? 'text-orange-600 bg-orange-50 hover:bg-orange-100'
                        : 'text-green-600 bg-green-50 hover:bg-green-100'
                    }`}
                  >
                    {product.status === 'In Stock' || !product.status ? 'Out of Stock' : 'In Stock'}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
