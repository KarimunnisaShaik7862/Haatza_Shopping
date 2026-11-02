import React from 'react';
import { defaultTypography, formatBicolorHeading, BicolorHeadingOptions } from '../../theme/typography';

export interface SectionHeadingProps extends BicolorHeadingOptions {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  badge?: string;
  eyebrowIcon?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  eyebrow,
  badge,
  eyebrowIcon,
  highlightWords,
  colorMode = 'default',
  accentEffect = 'none',
  align = 'left',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}) => {
  const alignClass =
    align === 'center'
      ? 'text-center items-center'
      : align === 'right'
      ? 'text-right items-end'
      : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {/* Main Section Heading */}
      <h2
        className={`${defaultTypography.styles.sectionHeading.className} ${titleClassName}`}
      >
        {formatBicolorHeading(title, {
          highlightWords,
          colorMode,
          accentEffect,
        })}
      </h2>
    </div>
  );
};

export default SectionHeading;
