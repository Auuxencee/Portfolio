interface SectionTagProps {
  num: string
  label: string
}

export default function SectionTag({ num, label }: SectionTagProps) {
  return (
    <div className="section-tag">
      <span className="num">{num} ·</span> {label}
    </div>
  )
}
