import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity } from '../redux/features/cart/cartSlice'
import { IoTrashOutline } from "react-icons/io5"
import { MdAdd, MdRemove } from "react-icons/md"

export const Cart = () => {
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const dispatch = useAppDispatch()

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }))
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h1>
          <p className="text-gray-600">Adicione alguns produtos para ver seu carrinho aqui!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Seu Carrinho</h1>
        
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
              <div className="flex items-center space-x-4">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(item.price)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <MdRemove />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <MdAdd />
                  </button>
                </div>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <IoTrashOutline />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total:</span>
            <span className="text-xl font-semibold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(total)}
            </span>
          </div>
          <button 
            className="w-full bg-blue-regular text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  )
} 