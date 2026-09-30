import { useState } from 'react'
import { ShoppingBag, Sparkles, Plus, Check } from 'lucide-react'
import { HALLOWEEN_PRODUCTS } from '../../data/products'
import { mansionAudio } from '../../utils/mansionAudio'

export function ShopSection({ onAddToCart }) {
  const [addedId, setAddedId] = useState(null)

  const handleAdd = (product) => {
    onAddToCart?.(product)
    mansionAudio.playRelicFound()
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  return (
    <section
      id="boutique"
      aria-labelledby="title-boutique"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10"
    >
      <div className="max-w-6xl mx-auto w-full space-y-12">
        <header className="text-center space-y-4 max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-citrouille font-sans font-medium">
            La Boutique du Domaine &bull; Halloween 2026
          </p>
          <h2
            id="title-boutique"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-fantome-pure"
          >
            Le Cabinet des Raretés
          </h2>
          <p className="font-sans text-sm text-fantome-dim font-light leading-relaxed">
            Acquérez des pièces d artisanat d art, bougies et accessoires exclusifs pour célébrer la nuit la plus obscure de l année.
          </p>
        </header>

        {/* Grille des articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HALLOWEEN_PRODUCTS.map((product) => {
            const isJustAdded = addedId === product.id

            return (
              <article
                key={product.id}
                className="relative p-7 rounded-3xl bg-abysse/60 border border-fantome/15 hover:border-citrouille/40 backdrop-blur-md shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="space-y-4">
                  {/* Badge & Catégorie */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-citrouille">
                      {product.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-citrouille/10 border border-citrouille/30 text-[10px] font-mono text-citrouille-light">
                      {product.badge}
                    </span>
                  </div>

                  {/* Titre & Description */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-fantome-pure font-normal group-hover:text-citrouille-light transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-fantome-dim/80 font-light leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Prix & Bouton d'ajout */}
                <div className="pt-6 mt-6 border-t border-fantome/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-fantome/50 font-sans block">Prix</span>
                    <span className="font-serif text-2xl text-fantome-pure font-semibold">
                      {product.price.toFixed(2)} &euro;
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(product)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-sans tracking-wide uppercase transition-all duration-200 ${
                      isJustAdded
                        ? 'bg-citrouille text-manoir-900 font-semibold shadow-lg shadow-citrouille/30'
                        : 'bg-fantome/10 hover:bg-citrouille hover:text-manoir-900 text-fantome-pure border border-fantome/20 hover:border-citrouille'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Ajouté</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Ajouter</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
