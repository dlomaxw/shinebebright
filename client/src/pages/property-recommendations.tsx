import { PropertyRecommendations } from "@/components/property-recommendations";
import { motion } from "framer-motion";

export default function PropertyRecommendationsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 min-h-screen bg-bright-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-bright-black mb-4">
            AI-Powered Property Recommendations
          </h1>
          <p className="text-xl text-bright-gray max-w-3xl mx-auto">
            Find your perfect property with our intelligent recommendation engine. 
            Tell us your preferences, and we'll match you with properties that meet your needs.
          </p>
        </div>

        <PropertyRecommendations />
      </div>
    </motion.div>
  );
}