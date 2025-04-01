
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
  color?: "green" | "blue" | "purple" | "amber";
}

const StatusCard = ({ title, value, icon: Icon, change, color = "green" }: StatusCardProps) => {
  const colorClasses = {
    green: "text-whatsapp bg-whatsapp bg-opacity-10",
    blue: "text-blue-500 bg-blue-500 bg-opacity-10",
    purple: "text-purple-500 bg-purple-500 bg-opacity-10",
    amber: "text-amber-500 bg-amber-500 bg-opacity-10",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          
          {typeof change !== "undefined" && (
            <div className="flex items-center mt-2">
              {change > 0 ? (
                <ArrowUp size={14} className="text-green-500 mr-1" />
              ) : (
                <ArrowDown size={14} className="text-red-500 mr-1" />
              )}
              <span className={`text-xs font-medium ${change > 0 ? "text-green-500" : "text-red-500"}`}>
                {Math.abs(change)}% desde ontem
              </span>
            </div>
          )}
        </div>
        
        <div className={cn("p-3 rounded-full", colorClasses[color])}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
