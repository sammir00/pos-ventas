import { useState } from 'react';
import { productsData, categoriesData } from '../data/mockData';
import { Search, ShoppingBag, Trash2, Plus, Minus, CreditCard, Banknote } from 'lucide-react';

export default function POS() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = productsData.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.barcode.includes(searchQuery);
    return matchesCategory && matchesSearch;
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

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`Cobro realizado exitosamente por $${total.toFixed(2)}`);
    setCart([]);
  };

  return (
    <div className="flex flex-col xl:flex-row h-full md:h-[calc(100vh-theme(spacing.12))] p-3 sm:p-4 gap-4 sm:gap-6">
      <div className="flex-1 flex flex-col min-w-0 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-200 overflow-hidden h-[60vh] md:h-auto shrink-0 xl:shrink">
        <div className="p-4 md:p-6 border-b border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Punto de Venta</h1>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Buscar por código o nombre..." 
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-full sm:w-72 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none snap-x">
            {categoriesData.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium whitespace-nowrap transition-all duration-200 snap-center text-sm sm:text-base ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                onClick={() => addToCart(product)}
                className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group flex flex-col h-full active:scale-95"
              >
                <div className="aspect-square rounded-xl bg-slate-100 mb-3 md:mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ShoppingBag className="w-8 h-8 md:w-12 md:h-12" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 md:px-2.5 md:py-1 rounded-lg text-[10px] md:text-xs font-bold text-slate-700 shadow-sm z-20">
                    Stock: {product.stock}
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-[10px] md:text-xs font-medium text-indigo-600 mb-1">{product.category}</span>
                  <h3 className="text-sm md:text-base font-semibold text-slate-800 leading-tight flex-1 line-clamp-2">{product.name}</h3>
                  <div className="mt-2 md:mt-3 flex items-end justify-between">
                    <span className="text-base md:text-lg font-black text-slate-900">${product.price.toFixed(2)}</span>
                    <button className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Plus className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full xl:w-96 shrink-0 bg-white rounded-2xl md:rounded-3xl shadow-lg border border-slate-200 flex flex-col overflow-hidden h-[60vh] md:h-auto">
        <div className="p-4 md:p-6 border-b border-slate-100 bg-slate-900 text-white flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
              Ticket Actual
            </h2>
            <span className="bg-indigo-500/20 text-indigo-300 text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full">
              {totalItems} items
            </span>
          </div>
          <p className="text-slate-400 text-xs md:text-sm">Caja #1 - Vendedor Principal</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2.5 md:space-y-3 bg-slate-50/50 min-h-0">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-slate-300" />
              </div>
              <p className="text-sm md:text-base">El carrito está vacío</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="bg-white p-2.5 md:p-3 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm flex gap-2.5 md:gap-3">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-slate-800 text-xs md:text-sm leading-tight pr-2">{item.name}</span>
                    <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-slate-400 hover:text-red-500 transition-colors p-1 -m-1">
                      <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-indigo-600 text-sm md:text-base">${(item.price * item.quantity).toFixed(2)}</span>
                    <div className="flex items-center gap-2 md:gap-3 bg-slate-50 border border-slate-200 rounded-lg p-0.5 md:p-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-5 h-5 md:w-6 md:h-6 rounded flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all hover:text-slate-900">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs md:text-sm font-semibold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-5 h-5 md:w-6 md:h-6 rounded flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all hover:text-slate-900">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 md:p-6 bg-white border-t border-slate-100 flex-shrink-0">
          <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 text-sm md:text-base">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>${(total * 0.88).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Impuestos (12%)</span>
              <span>${(total * 0.12).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg md:text-xl font-black text-slate-900 pt-2 md:pt-3 border-t border-slate-100 mt-2 md:mt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <button 
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="flex items-center justify-center gap-1.5 md:gap-2 py-3 md:py-4 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 shadow-sm text-sm md:text-base"
            >
              <Banknote className="w-4 h-4 md:w-5 md:h-5" />
              Efectivo
            </button>
            <button 
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="flex items-center justify-center gap-1.5 md:gap-2 py-3 md:py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
              Tarjeta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
