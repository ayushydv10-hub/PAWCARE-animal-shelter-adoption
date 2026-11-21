import {useState} from 'react';
import {PawPrint} from 'lucide-react';

interface SanctuaryImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function SanctuaryImage({src, alt, title, className = ''}: SanctuaryImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EFF3EE] text-[#1B4332] px-4 py-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <PawPrint className="w-8 h-8 mb-2 opacity-50" aria-hidden="true" />
        <span className="text-sm font-medium text-[#18201C]">{title || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
