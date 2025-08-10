import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Image, 
  Video, 
  Download, 
  Search,
  Upload,
  Filter,
  Calendar,
  User
} from "lucide-react";
import { format } from "date-fns";
import type { ClientProject } from "@shared/schema";

interface ProjectFilesProps {
  project: ClientProject;
}

const ProjectFiles = ({ project }: ProjectFilesProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Get files from project
  const files = project.files || [];

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-5 w-5 text-blue-600" />;
    if (type.startsWith('video/')) return <Video className="h-5 w-5 text-purple-600" />;
    return <FileText className="h-5 w-5 text-gray-600" />;
  };

  const getFileTypeColor = (type: string) => {
    if (type.startsWith('image/')) return "bg-blue-100 text-blue-800";
    if (type.startsWith('video/')) return "bg-purple-100 text-purple-800";
    if (type.includes('pdf')) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || file.type.startsWith(filterType);
    return matchesSearch && matchesFilter;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Project Files
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
              className={filterType === "all" ? "bg-bright-yellow text-bright-black" : ""}
            >
              All
            </Button>
            <Button
              variant={filterType === "image" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("image")}
              className={filterType === "image" ? "bg-bright-yellow text-bright-black" : ""}
            >
              Images
            </Button>
            <Button
              variant={filterType === "video" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("video")}
              className={filterType === "video" ? "bg-bright-yellow text-bright-black" : ""}
            >
              Videos
            </Button>
            <Button
              variant={filterType === "application" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("application")}
              className={filterType === "application" ? "bg-bright-yellow text-bright-black" : ""}
            >
              Documents
            </Button>
          </div>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 mb-2">Upload project files</p>
          <Button variant="outline" size="sm" disabled>
            Choose Files
          </Button>
          <p className="text-xs text-gray-500 mt-2">Max file size: 10MB</p>
        </div>

        {/* Files List */}
        <div className="space-y-3">
          {filteredFiles.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterType !== "all" ? "No matching files" : "No files uploaded yet"}
              </h3>
              <p className="text-gray-500">
                {searchTerm || filterType !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Files will appear here as they are uploaded to your project"
                }
              </p>
            </div>
          ) : (
            filteredFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div>
                    <h4 className="font-medium text-gray-900">{file.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Badge className={getFileTypeColor(file.type)}>
                        {file.type.split('/')[0]}
                      </Badge>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {file.uploadedBy}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(file.uploadedAt), "MMM dd, yyyy")}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={file.url} download={file.name} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* File Statistics */}
        {files.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-bright-black">{files.length}</div>
              <div className="text-sm text-gray-500">Total Files</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-bright-black">
                {files.filter(f => f.type.startsWith('image/')).length}
              </div>
              <div className="text-sm text-gray-500">Images</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-bright-black">
                {files.filter(f => f.type.startsWith('video/')).length}
              </div>
              <div className="text-sm text-gray-500">Videos</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectFiles;