import { CheckCircle } from "lucide-react";

interface FeatureListProps {
  features: string[];
  className?: string;
}

const FeatureList = ({ features, className = "" }: FeatureListProps) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-bright-gray">{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
