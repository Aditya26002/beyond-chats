"use client";

import { useState } from "react";
import UserRegistration from "@/components/UserRegistration";
import SetupOrganisation from "@/components/SetupOrganisation";
import ChatbotIntegration from "@/components/ChatbotIntegration";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateUserData = (data) => {
    setUserData({ ...userData, ...data });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-xl">
        <ProgressBar currentStep={step} totalSteps={3} />
        {step === 1 && (
          <UserRegistration
            nextStep={nextStep}
            updateUserData={updateUserData}
          />
        )}
        {step === 2 && (
          <SetupOrganisation
            nextStep={nextStep}
            prevStep={prevStep}
            updateUserData={updateUserData}
          />
        )}
        {step === 3 && (
          <ChatbotIntegration prevStep={prevStep} userData={userData} />
        )}
      </div>
    </main>
  );
}
