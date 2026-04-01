export function SectionHeader({ icon: Icon, iconColor, iconGlow, title, titleClass = "text-[#e0d9ff]", children }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon
          className="w-6 h-6"
          style={{ color: iconColor, filter: `drop-shadow(0 0 8px ${iconGlow})` }}
        />
        <h2 className={titleClass}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
