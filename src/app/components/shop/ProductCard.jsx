'use client'

import Image from 'next/image'

export default function ProductCard({ image, category, name, price, isSoldOut }) {
  return (
    <div className="bg-white flex flex-col justify-between p-4 rounded-lg shadow-md border hover:shadow-lg transition ">
      {/* Image Container */}
      <div className="relative w-full h-[280px] overflow-hidden rounded-lg">
        {isSoldOut && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-md">
            SOLD OUT
          </span>
        )}
        <Image
          src={image}
          alt={name}
          layout="fill" // Makes the image take full width and height of its parent
          objectFit="cover" // Ensures the image fills the container without distortion
        />
      </div>

      {/* Product Details */}
      <div className="mt-4">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-lg font-semibold text-gray-700">{price}৳</p>
        <p className="text-sm text-gray-500 uppercase mt-1">{category}</p>
      </div>
    </div>
  )
}
