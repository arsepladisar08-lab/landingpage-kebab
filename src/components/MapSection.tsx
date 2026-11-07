interface MapSectionProps {
  className?: string;
  height?: number | string;
}

export default function MapSection({ className = '', height = 440 }: MapSectionProps) {
  return (
    <div className={`w-full ${className}`} style={{ maxWidth: 900, margin: '0 auto' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.2404!2d112.698709!3d-7.36497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e34363d77ca1%3A0x4138462fb3aba69c!2sKEBAB%20MURAH%20DI%20SIDOARJO%20ALFIRDAUS!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
        title="Lokasi kami"
        width="100%"
        height={height}
        style={{ border: 0, borderRadius: 16, width: '100%', display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
