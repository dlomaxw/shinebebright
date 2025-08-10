import { Button } from "@/components/ui/button";
import { Linkedin, Twitter } from "lucide-react";
import type { TeamMember as TeamMemberType } from "@shared/schema";

interface TeamMemberProps {
  member: TeamMemberType;
}

const TeamMember = ({ member }: TeamMemberProps) => {
  return (
    <div className="text-center">
      <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
        <img 
          src={member.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"} 
          alt={member.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold">{member.name}</h3>
      <p className="text-muted-foreground mb-4">{member.role}</p>
      
      {(member.linkedinUrl || member.twitterUrl) && (
        <div className="flex justify-center space-x-3">
          {member.linkedinUrl && (
            <Button
              variant="ghost"
              size="icon"
              className="text-bright-gray hover:text-bright-yellow transition-colors"
              asChild
            >
              <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
          )}
          {member.twitterUrl && (
            <Button
              variant="ghost"
              size="icon"
              className="text-bright-gray hover:text-bright-yellow transition-colors"
              asChild
            >
              <a href={member.twitterUrl} target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5" />
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMember;
