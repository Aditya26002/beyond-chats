import { motion } from "framer-motion";

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "Registration" },
    { number: 2, title: "Setup" },
    { number: 3, title: "Integration" },
  ];

  return (
    <div className="mb-12">
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold mb-2
                ${
                  step.number <= currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              {step.number <= currentStep ? (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              ) : (
                step.number
              )}
            </motion.div>
            <motion.span
              className={`text-sm ${
                step.number <= currentStep
                  ? "text-blue-500 font-semibold"
                  : "text-gray-500"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.2 }}
            >
              {step.title}
            </motion.span>
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
