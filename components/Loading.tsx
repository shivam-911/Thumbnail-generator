interface LoadingProps {
  message?: string
}

export default function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="loading-spinner mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  )
}
