import React, { useEffect, useRef, useId, type ReactNode } from 'react';

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: 'primary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  primary: { hue: 237, saturation: 37, lightness: 60 },
  accent: { hue: 21, saturation: 78, lightness: 65 }
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'primary',
  size = 'md',
  width,
  height,
  customSize = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, ''); // Unique ID for scoping CSS

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      cardRef.current.style.setProperty('--x', `${x.toFixed(2)}px`);
      cardRef.current.style.setProperty('--y', `${y.toFixed(2)}px`);
    };

    const container = cardRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const { hue, saturation, lightness } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return '';
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    const baseStyles: React.CSSProperties & Record<string, string | number> = {
      '--hue': hue,
      '--sat': saturation,
      '--light': lightness,
      '--radius': '24',
      '--border': '1',
      '--backdrop': 'rgba(255, 255, 255, 0.45)',
      '--backup-border': 'rgba(44, 45, 94, 0.12)',
      '--size': '400',
      '--border-size': 'calc(var(--border) * 1px)',
      '--spotlight-size': 'calc(var(--size) * 1px)',
      
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        var(--x, -1000px)
        var(--y, -1000px),
        hsl(var(--hue) calc(var(--sat) * 1%) calc(var(--light) * 1%) / 0.15), 
        transparent 80%
      )`,
      backgroundColor: 'var(--backdrop)',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
      touchAction: 'none',
    };

    if (width !== undefined) baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    if (height !== undefined) baseStyles.height = typeof height === 'number' ? `${height}px` : height;

    return baseStyles;
  };

  const beforeAfterStyles = `
    [data-glow-id="${id}"]::before,
    [data-glow-id="${id}"]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-size: cover;
      background-repeat: no-repeat;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
      -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      -webkit-mask-clip: padding-box, border-box;
      -webkit-mask-composite: source-in, xor;
      z-index: 2;
    }
    
    [data-glow-id="${id}"]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        var(--x, -1000px)
        var(--y, -1000px),
        hsl(var(--hue) calc(var(--sat) * 1%) calc(var(--light) * 1%) / 0.8), 
        transparent 100%
      );
      filter: brightness(1.2);
    }
    
    [data-glow-id="${id}"]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.4) calc(var(--spotlight-size) * 0.4) at
        var(--x, -1000px)
        var(--y, -1000px),
        hsl(var(--hue) calc(var(--sat) * 1%) 90% / 0.5), 
        transparent 100%
      );
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow-id={id}
        style={getInlineStyles() as any}
        className={`
          ${getSizeClasses()}
          ${!customSize ? 'aspect-[3/4]' : ''}
          rounded-3xl 
          relative 
          overflow-hidden
          transition-colors duration-500
          ${className}
        `}
      >
        {children}
      </div>
    </>
  );
};

export { GlowCard }
