import React, { useState, useEffect } from 'react';
import { ProductImageAsset } from '../types';
import { DummyFoodVisual } from './DummyFoodVisual';
import { hasRealProductPhoto } from '../data/productAssets';

interface ProductImageProps {
  asset: ProductImageAsset;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  showPlaceholderTag?: boolean;
  sizes?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  asset,
  className = '',
  imgClassName = '',
  priority = false,
  showPlaceholderTag = true,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const primarySrc = asset.src || asset.webpSrc || null;

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [primarySrc, asset.webpSrc]);

  const canRenderRealPhoto = hasRealProductPhoto(asset) && !hasError && Boolean(primarySrc);

  if (!canRenderRealPhoto) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#fdf4c7] ${className}`}>
        <DummyFoodVisual
          type={asset.fallbackType}
          alt={asset.alt}
          className="w-full h-full"
          showBadge={showPlaceholderTag}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#fdf4c7] ${className}`}>
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-[#f5e6b3] animate-pulse"
          aria-hidden="true"
        />
      )}
      <picture className="block w-full h-full">
        {asset.webpSrc && <source srcSet={asset.webpSrc} type="image/webp" sizes={sizes} />}
        <img
          src={primarySrc as string}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover block transition-opacity duration-200 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          {...(priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {})}
        />
      </picture>
    </div>
  );
};
