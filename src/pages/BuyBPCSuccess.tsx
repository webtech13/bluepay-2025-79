
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Copy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "../stores/userStore";

const BuyBPCSuccess = () => {
  const navigate = useNavigate();
  const { addTransaction, updateBalance } = useUserStore();
  const [bpcCode, setBpcCode] = useState("");

  // Generate BPC code on component mount
  useEffect(() => {
    const generateBPCCode = () => {
      const prefix = "BPC";
      const randomNumbers = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
      return `${prefix}${randomNumbers}`;
    };

    const newBpcCode = generateBPCCode();
    setBpcCode(newBpcCode);

    // Add transaction to history
    const transaction = {
      id: Date.now(),
      type: "BPC Code Purchase",
      amount: "-₦6,200",
      date: new Date().toLocaleDateString(),
      status: "Completed" as const,
      recipient: "BluePay BPC Service"
    };

    addTransaction(transaction);
    updateBalance(-6200);
  }, [addTransaction, updateBalance]);

  const handleCopyBPCCode = () => {
    navigator.clipboard.writeText(bpcCode).then(() => {
      toast({
        description: "BPC code copied to clipboard!",
        duration: 2000,
      });
    });
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-[#222222] text-white py-3 px-4 flex justify-between items-center sticky top-0 z-10">
        <button className="text-lg">
          <span className="sr-only">Menu</span>
        </button>
        <h1 className="text-xl font-semibold">BLUEPAY</h1>
        <div className="w-6 h-6">
          <span className="sr-only">Notifications</span>
        </div>
      </header>

      <div className="bg-gray-200 py-3 px-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold">Payment Successful</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 mb-6 flex items-center justify-center">
          <CheckCircle size={80} className="text-green-600" strokeWidth={2} />
        </div>
        
        <h1 className="text-2xl font-bold mb-3 text-center text-green-600">
          Payment Successful!
        </h1>
        
        <p className="text-base text-gray-700 text-center mb-6">
          Your payment of ₦6,200 has been confirmed successfully.
        </p>

        <div className="bg-white border-2 border-green-200 rounded-lg p-6 w-full max-w-sm mb-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Your BPC Code</h3>
            <p className="text-sm text-gray-600">Keep this code safe for future use</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-mono font-bold text-blue-600 mb-2 break-all">
                {bpcCode}
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleCopyBPCCode}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2"
          >
            <Copy size={16} />
            Copy BPC Code
          </Button>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Transaction completed successfully
          </p>
          <p className="text-xs text-gray-500">
            Your BPC code is now available for use
          </p>
        </div>
        
        <Button 
          onClick={handleBackToDashboard}
          className="w-full max-w-sm bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default BuyBPCSuccess;
