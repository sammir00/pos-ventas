import { useState } from 'react';
import { productsData, categoriesData } from '../data/mockData';

export default function POS() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredProducts = productsData.filter(product => {
    return selectedCategory === 'Todos' || product.category === selectedCategory;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearAll = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.12; // 12% tax as per old behavior
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`Cobro realizado exitosamente por $${total.toFixed(2)}`);
    setCart([]);
  };

  return (
    <>
      {/* Products Section */}
      <section className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Categories Scroll */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categoriesData.map((cat, index) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(255,141,134,0.3)]'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {cat === 'Todos' ? 'All Products' : cat}
              </button>
            );
          })}
        </div>

        {/* Bento-style Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product, index) => {
            // First item can be featured to mimic HTML structure
            const isFeatured = index === 0;

            if (isFeatured) {
              return (
                <div 
                  key={product.id} 
                  onClick={() => addToCart(product)}
                  className="col-span-1 lg:col-span-2 row-span-1 group relative overflow-hidden rounded-xl glass-panel border border-white/5 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80 z-10"></div>
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-64 bg-surface-container-high flex flex-col items-center justify-center text-on-surface-variant group-hover:scale-105 transition-transform duration-500">
                      <span className="material-symbols-outlined text-4xl mb-2">shopping_bag</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full p-4 z-20 flex justify-between items-end">
                    <div>
                      <span className="bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm mb-2 inline-block">Featured</span>
                      <h3 className="text-xl font-black text-on-surface tracking-tight">{product.name}</h3>
                      <p className="text-on-surface-variant text-xs">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary mb-2">${product.price.toFixed(2)}</p>
                      <button className="bg-primary text-on-primary p-2 rounded-lg shadow-lg active:scale-90 transition-transform">
                        <span className="material-symbols-outlined pointer-events-none">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={product.id} 
                className="group glass-panel rounded-xl border border-white/5 hover:border-primary/30 transition-all duration-300 p-3 space-y-3 cursor-pointer flex flex-col"
                onClick={() => addToCart(product)}
              >
                <div className="aspect-square rounded-lg overflow-hidden relative">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:scale-110 transition-transform duration-500">
                      <span className="material-symbols-outlined text-4xl">shopping_bag</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 px-2 py-1 bg-surface-container-lowest/80 backdrop-blur-md rounded text-primary text-[10px] font-bold">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <h4 className="font-bold text-on-surface text-sm truncate">{product.name}</h4>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{product.category}</p>
                </div>
                <button className="w-full py-2 bg-white/5 hover:bg-primary/10 hover:text-primary rounded-lg text-xs font-bold transition-all active:scale-[0.98]">
                  ADD TO TICKET
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Current Ticket Panel */}
      <section className="w-96 bg-surface-container-low/80 backdrop-blur-xl border-l border-white/10 flex flex-col h-full shadow-2xl shrink-0">
        <div className="p-6 border-b border-white/5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-black text-on-surface tracking-tight uppercase">Current Ticket</h2>
            <button 
              onClick={clearAll}
              className="text-[10px] font-bold text-primary hover:text-primary-dim uppercase tracking-widest px-2 py-1 rounded bg-primary/10 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-surface-container-highest/50 border border-white/5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-on-surface-variant">person</span>
              <span className="text-xs font-bold text-on-surface">Walk-in Customer</span>
            </div>
            <span className="material-symbols-outlined text-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors">edit</span>
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="pt-4 px-2">
              <div className="border border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-3">
                <span className="material-symbols-outlined text-on-surface-variant/30 text-4xl">add_circle</span>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-medium">Scan or select more items</p>
              </div>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-3 group">
                <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0 relative">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-on-surface-variant bg-surface-container-high">
                      <span className="material-symbols-outlined text-sm">shopping_bag</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between">
                    <h5 className="text-xs font-bold text-on-surface">{item.name}</h5>
                    <span className="text-xs font-bold text-on-surface">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md bg-white/5 hover:bg-primary/20 text-on-surface-variant transition-colors"
                      >
                        <span className="material-symbols-outlined text-xs">remove</span>
                      </button>
                      <span className="text-xs font-black text-primary">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md bg-white/5 hover:bg-primary/20 text-on-surface-variant transition-colors"
                      >
                        <span className="material-symbols-outlined text-xs">add</span>
                      </button>
                    </div>
                    <span className="text-[10px] text-on-surface-variant">${item.price.toFixed(2)} / ea</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals and Action */}
        <div className="p-6 bg-surface-container-high/50 space-y-4">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Tax (12%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-black text-on-surface pt-2">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button className="py-3 bg-surface-container-highest text-on-surface text-xs font-bold rounded-xl hover:bg-surface-bright transition-colors active:scale-95 uppercase tracking-widest">
              Hold Ticket
            </button>
            <button className="py-3 bg-white/5 border border-white/10 text-on-surface text-xs font-bold rounded-xl hover:bg-white/10 transition-colors active:scale-95 uppercase tracking-widest">
              Discount
            </button>
          </div>
          
          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full py-4 bg-gradient-to-br from-red-500 to-rose-600 text-white font-black text-sm rounded-xl shadow-[0_10px_30px_rgba(239,68,68,0.4)] hover:shadow-[0_10px_40px_rgba(239,68,68,0.6)] active:scale-[0.98] transition-all uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Sale
          </button>
        </div>
      </section>

      {/* Contextual FAB */}
      <button className="fixed bottom-6 right-[26rem] w-14 h-14 bg-primary text-on-primary rounded-full shadow-[0_10px_30px_rgba(255,141,134,0.4)] flex items-center justify-center active:scale-90 transition-transform z-50 hover:bg-primary-dim">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>qr_code_scanner</span>
      </button>
    </>
  );
}
