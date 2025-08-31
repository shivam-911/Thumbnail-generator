export default function ProgressBar({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, label: "Welcome" },
    { number: 2, label: "Upload" },
    { number: 3, label: "Customize" },
    { number: 4, label: "Generate" },
    { number: 5, label: "Download" },
  ]

  return (
    <div className="mb-10">
      <div className="flex items-center justify-center space-x-6">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition ${currentStep >= step.number
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-200 text-slate-500"
                }`}
            >
              {step.number}
            </div>
            <span
              className={`ml-2 text-sm font-medium ${currentStep >= step.number
                  ? "text-blue-600"
                  : "text-slate-500"
                }`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-4 transition ${currentStep > step.number ? "bg-blue-600" : "bg-slate-300"
                  }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
