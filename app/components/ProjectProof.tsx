"use client";

import { useId, useState } from "react";
import type { Locale } from "../content";

const unitPrice = 68;

const proofCopy = {
  en: {
    label: "Storefront sample",
    location: "Morrow House · Toronto",
    product: "Vale table lamp",
    quantity: "Quantity",
    keep: "Keep this selection",
    total: "Current total",
    saved: "Selection saved",
    item: "lamp",
    items: "lamps",
  },
  pt: {
    label: "Amostra da loja",
    location: "Morrow House · Toronto",
    product: "Luminária Vale",
    quantity: "Quantidade",
    keep: "Guardar esta seleção",
    total: "Total atual",
    saved: "Seleção guardada",
    item: "luminária",
    items: "luminárias",
  },
} satisfies Record<Locale, Record<string, string>>;

export function ProjectProof({ locale }: { locale: Locale }) {
  const [quantity, setQuantity] = useState(1);
  const [savedQuantity, setSavedQuantity] = useState<number | null>(null);
  const rangeId = useId();
  const titleId = useId();
  const text = proofCopy[locale];
  const total = unitPrice * quantity;

  return (
    <section className="proof" aria-labelledby={titleId}>
      <div className="proof__velvet" aria-hidden="true">
        <span>MH</span>
      </div>
      <div className="proof__body">
        <p className="proof__eyebrow">{text.location}</p>
        <h3 id={titleId}>{text.product}</h3>
        <p className="proof__price">CAD ${unitPrice}</p>
        <label htmlFor={rangeId}>
          {text.quantity}: <strong>{quantity}</strong>
        </label>
        <input
          id={rangeId}
          type="range"
          min="1"
          max="4"
          value={quantity}
          onChange={(event) => {
            setQuantity(Number(event.target.value));
            setSavedQuantity(null);
          }}
        />
        <button type="button" onClick={() => setSavedQuantity(quantity)}>
          {text.keep}
        </button>
        <output aria-live="polite" htmlFor={rangeId}>
          {savedQuantity === null
            ? `${text.total}: CAD $${total}`
            : `${text.saved}: ${savedQuantity} ${
                savedQuantity === 1 ? text.item : text.items
              } · CAD $${unitPrice * savedQuantity}`}
        </output>
      </div>
    </section>
  );
}
