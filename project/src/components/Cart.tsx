import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  total: number;
}

export const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  total
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
        <p className="text-gray-500">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{item.name}</h4>
            <p className="text-sm text-gray-600">{item.category}</p>
            <p className="text-lg font-bold text-blue-600">${item.price.toFixed(2)}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={() => onRemoveItem(item.id)}
            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      
      <div className="bg-blue-50 rounded-lg p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
        </div>
        
        <button
          onClick={() => {
            const message = `Olá! Gostaria de finalizar minha compra:\n\n${items.map(item => 
              `• ${item.name} - Qtd: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
            ).join('\n')}\n\nTotal: $${total.toFixed(2)}`;
            
            window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, '_blank');
          }}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-lg"
        >
          Finalizar Compra via WhatsApp
        </button>
      </div>
    </div>
  );
};