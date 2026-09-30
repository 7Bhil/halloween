import { useState } from 'react'
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, CheckCircle, Send } from 'lucide-react'
import { mansionAudio } from '../../utils/mansionAudio'

export function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    notes: '',
  })

  if (!isOpen) return null

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = subtotal > 40000 || subtotal === 0 ? 0 : 3000
  const total = subtotal + shipping

  const handleQuantity = (productId, delta) => {
    onUpdateQuantity?.(productId, delta)
    mansionAudio.playRelicFound()
  }

  const handleRemove = (productId) => {
    onRemoveItem?.(productId)
    mansionAudio.playRelicFound()
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.address) return

    // Génération d'un identifiant de commande gothique unique
    const generatedId = `MD-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderId(generatedId)
    setOrderCompleted(true)
    onClearCart?.()
    mansionAudio.playRelicFound()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-manoir-900/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-manoir-800 border-l border-citrouille/30 h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête du Panier */}
        <div className="flex items-center justify-between border-b border-fantome/10 pb-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-citrouille" />
            <h2 className="font-serif text-2xl text-fantome-pure font-normal">
              {orderCompleted
                ? 'Commande Confirmée'
                : isCheckingOut
                ? 'Validation de Commande'
                : 'Votre Panier'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-fantome/50 hover:text-fantome transition-colors rounded-full hover:bg-manoir-700"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenu selon l'étape */}
        {orderCompleted ? (
          // Écran de confirmation de commande
          <div className="my-auto text-center space-y-5 py-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-citrouille/20 border border-citrouille/40 flex items-center justify-center text-citrouille">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-citrouille">
                Paiement &amp; Préparation
              </span>
              <h3 className="font-serif text-3xl text-fantome-pure">
                Merci, {formData.name}
              </h3>
              <p className="font-sans text-xs text-fantome-dim font-light max-w-xs mx-auto leading-relaxed">
                Votre commande n° <strong className="text-citrouille font-mono">{orderId}</strong> a été enregistrée dans les registres du manoir. Un courriel de confirmation vous a été adressé à <strong className="text-fantome-pure">{formData.email}</strong>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOrderCompleted(false)
                setIsCheckingOut(false)
                onClose()
              }}
              className="px-6 py-2.5 rounded-full bg-citrouille text-manoir-900 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-citrouille-light transition-all"
            >
              Fermer et continuer
            </button>
          </div>
        ) : isCheckingOut ? (
          // Formulaire de Checkout
          <form onSubmit={handleSubmitOrder} className="py-4 space-y-4 my-auto">
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-mono uppercase text-citrouille">Nom complet</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Lord Alistair"
                className="w-full px-3.5 py-2 rounded-xl bg-manoir-900 border border-fantome/20 text-xs text-fantome-pure focus:outline-none focus:border-citrouille"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-mono uppercase text-citrouille">Adresse courriel</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seigneur@manoir.fr"
                className="w-full px-3.5 py-2 rounded-xl bg-manoir-900 border border-fantome/20 text-xs text-fantome-pure focus:outline-none focus:border-citrouille"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-mono uppercase text-citrouille">Adresse de livraison</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="13 Allée des Ombres"
                className="w-full px-3.5 py-2 rounded-xl bg-manoir-900 border border-fantome/20 text-xs text-fantome-pure focus:outline-none focus:border-citrouille"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-mono uppercase text-citrouille">Ville &amp; Code Postal</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="75000 Paris"
                className="w-full px-3.5 py-2 rounded-xl bg-manoir-900 border border-fantome/20 text-xs text-fantome-pure focus:outline-none focus:border-citrouille"
              />
            </div>

            {/* Récapitulatif du total */}
            <div className="p-3 rounded-xl bg-manoir-900/80 border border-citrouille/20 space-y-1 text-xs">
              <div className="flex justify-between text-fantome/70">
                <span>Total à régler :</span>
                <span className="font-serif text-base text-citrouille font-semibold">{total.toLocaleString('fr-FR')} XOF</span>
              </div>
              <p className="text-[10px] text-fantome/50 font-light">
                Simulation de paiement sécurisé sans intermédiaire.
              </p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="w-1/3 py-2.5 rounded-xl border border-fantome/20 text-xs text-fantome/70 hover:text-fantome"
              >
                Retour
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 rounded-xl bg-citrouille hover:bg-citrouille-light text-manoir-900 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Confirmer l achat
              </button>
            </div>
          </form>
        ) : (
          // Liste des articles du panier
          <div className="flex-1 py-4 overflow-y-auto space-y-3">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3 text-fantome/50">
                <ShoppingBag className="w-10 h-10 mx-auto opacity-30" />
                <p className="font-serif text-lg">Votre besace est vide</p>
                <p className="font-sans text-xs">Ajoutez des reliques ou articles depuis la boutique.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-manoir-900/80 border border-fantome/10 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-fantome-pure truncate">
                      {item.name}
                    </h4>
                    <span className="text-xs font-mono text-citrouille">
                      {item.price.toLocaleString('fr-FR')} XOF
                    </span>
                  </div>

                  {/* Contrôle des quantités */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-fantome/20 rounded-lg bg-manoir-800">
                      <button
                        type="button"
                        onClick={() => handleQuantity(item.id, -1)}
                        className="p-1 hover:text-citrouille text-fantome/70"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono text-fantome-pure">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantity(item.id, 1)}
                        className="p-1 hover:text-citrouille text-fantome/70"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="p-1.5 text-fantome/40 hover:text-red-400 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pied de panier : Calculs & Action */}
        {!orderCompleted && !isCheckingOut && cartItems.length > 0 && (
          <div className="border-t border-fantome/10 pt-4 space-y-3">
            <div className="space-y-1.5 text-xs text-fantome-dim font-light">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-mono text-fantome-pure">{subtotal.toLocaleString('fr-FR')} XOF</span>
              </div>
              <div className="flex justify-between">
                <span>Frais d expédition</span>
                <span className="font-mono text-fantome-pure">
                  {shipping === 0 ? 'Offerts (> 40 000 XOF)' : `${shipping.toLocaleString('fr-FR')} XOF`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium text-fantome-pure pt-1 border-t border-fantome/10">
                <span>Total TTC</span>
                <span className="font-serif text-lg text-citrouille font-semibold">
                  {total.toLocaleString('fr-FR')} XOF
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3 rounded-full bg-citrouille hover:bg-citrouille-light text-manoir-900 font-sans text-xs tracking-wider uppercase font-semibold shadow-lg shadow-citrouille/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Passer la commande</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
