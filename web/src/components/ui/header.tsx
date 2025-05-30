interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="w-full">
      <h1 className="text-gray-600 font-bold text-lg leading-6">{title}</h1>
    </div>
  )
}
