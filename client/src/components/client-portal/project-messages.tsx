import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, User, Shield, Users } from "lucide-react";
import { format } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ProjectMessage } from "@shared/schema";

interface ProjectMessagesProps {
  projectId: string;
}

const ProjectMessages = ({ projectId }: ProjectMessagesProps) => {
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock current user - in a real app, this would come from authentication
  const currentUser = {
    id: "client-123",
    name: "John Doe",
    role: "client"
  };

  const { data: messages = [], isLoading } = useQuery<ProjectMessage[]>({
    queryKey: ["/api/project-messages", projectId],
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: { message: string; attachments?: any[] }) => {
      const response = await apiRequest("POST", "/api/project-messages", {
        projectId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        message: messageData.message,
        attachments: messageData.attachments || [],
      });
      return response.json();
    },
    onSuccess: () => {
      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ["/api/project-messages", projectId] });
      toast({ title: "Message sent successfully" });
    },
    onError: () => {
      toast({ title: "Failed to send message", variant: "destructive" });
    },
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    sendMessageMutation.mutate({
      message: newMessage,
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return <Shield className="h-4 w-4" />;
      case "team_member": return <Users className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800";
      case "team_member": return "bg-blue-100 text-blue-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="animate-spin w-6 h-6 border-2 border-bright-yellow border-t-transparent rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Project Messages
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages List */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 pb-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <Send className="h-12 w-12 text-bright-gray mx-auto mb-4" />
                <h3 className="text-lg font-medium text-bright-black mb-2">No messages yet</h3>
                <p className="text-bright-gray">Start the conversation with your project team</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-bright-yellow text-bright-black">
                      {getInitials(message.senderName)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-bright-black">{message.senderName}</span>
                      <Badge className={`${getRoleColor(message.senderRole)} text-xs`}>
                        <div className="flex items-center gap-1">
                          {getRoleIcon(message.senderRole)}
                          {message.senderRole.replace('_', ' ')}
                        </div>
                      </Badge>
                      <span className="text-xs text-bright-gray">
                        {format(new Date(message.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
                      </span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-bright-black whitespace-pre-wrap">{message.message}</p>
                      
                      {message.attachments && (message.attachments as any[]).length > 0 && (
                        <div className="mt-3 space-y-2">
                          {(message.attachments as any[]).map((attachment, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-bright-gray">
                              <Paperclip className="h-4 w-4" />
                              <span>{attachment.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        
        {/* Message Input */}
        <div className="border-t p-6">
          <div className="space-y-3">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="min-h-[80px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach File
                </Button>
              </div>
              
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || sendMessageMutation.isPending}
                className="bg-bright-yellow text-bright-black hover:bg-yellow-400"
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectMessages;