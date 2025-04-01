"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  FileText,
  MoreHorizontal,
  Download,
  Eye,
  File,
  FileIcon as FilePdf,
  FileImage,
  FileSpreadsheet,
  Clock,
  Share,
  Star,
  LayoutGrid,
  List,
} from "lucide-react"

// Mock documents
const documents = [
  {
    id: 1,
    name: "Regulatory Submission Guidelines.pdf",
    type: "pdf",
    size: "2.4 MB",
    lastModified: "2 hours ago",
    owner: { name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32" },
    shared: true,
    project: "Regulatory Affairs",
    starred: true,
  },
  {
    id: 2,
    name: "Product Development Roadmap.xlsx",
    type: "excel",
    size: "1.8 MB",
    lastModified: "Yesterday",
    owner: { name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    shared: true,
    project: "Product Development",
    starred: false,
  },
  {
    id: 3,
    name: "Clinical Trial Results.docx",
    type: "word",
    size: "5.2 MB",
    lastModified: "Yesterday",
    owner: { name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
    shared: true,
    project: "Medical Communication",
    starred: true,
  },
  {
    id: 4,
    name: "Marketing Strategy Q3.pptx",
    type: "powerpoint",
    size: "8.7 MB",
    lastModified: "2 days ago",
    owner: { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
    shared: true,
    project: "Market Access",
    starred: false,
  },
  {
    id: 5,
    name: "Product Specifications v2.pdf",
    type: "pdf",
    size: "3.5 MB",
    lastModified: "3 days ago",
    owner: { name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    shared: true,
    project: "Product Development",
    starred: false,
  },
  {
    id: 6,
    name: "Team Meeting Notes.docx",
    type: "word",
    size: "1.1 MB",
    lastModified: "5 days ago",
    owner: { name: "James Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    shared: true,
    project: "General",
    starred: false,
  },
  {
    id: 7,
    name: "Competitive Analysis.xlsx",
    type: "excel",
    size: "4.2 MB",
    lastModified: "1 week ago",
    owner: { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
    shared: true,
    project: "Market Access",
    starred: true,
  },
  {
    id: 8,
    name: "Project Timeline.png",
    type: "image",
    size: "1.8 MB",
    lastModified: "1 week ago",
    owner: { name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
    shared: true,
    project: "Product Development",
    starred: false,
  },
]

export function SharedDocuments() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Shared Documents</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search files..." className="w-[180px] pl-8 md:w-[220px]" />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="shared">Shared with Me</TabsTrigger>
            <TabsTrigger value="starred">Starred</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Grid
              </Button>
              <Button variant="outline" size="sm">
                <List className="mr-2 h-4 w-4" />
                List
              </Button>
            </div>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>

          <TabsContent value="all">
            <ScrollArea className="h-[450px]">
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-md bg-muted p-2">
                        {doc.type === "pdf" ? (
                          <FilePdf className="h-6 w-6 text-red-600" />
                        ) : doc.type === "excel" ? (
                          <FileSpreadsheet className="h-6 w-6 text-green-600" />
                        ) : doc.type === "word" ? (
                          <FileText className="h-6 w-6 text-blue-600" />
                        ) : doc.type === "powerpoint" ? (
                          <File className="h-6 w-6 text-orange-600" />
                        ) : doc.type === "image" ? (
                          <FileImage className="h-6 w-6 text-purple-600" />
                        ) : (
                          <File className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{doc.name}</p>
                          {doc.starred && <Star className="ml-2 h-4 w-4 text-yellow-500" fill="currentColor" />}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>
                            <Badge variant="outline" className="px-1 py-0 text-xs font-normal">
                              {doc.project}
                            </Badge>
                          </span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {doc.lastModified}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={doc.owner.avatar} alt={doc.owner.name} />
                        <AvatarFallback>{doc.owner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share className="h-4 w-4" />
                        <span className="sr-only">Share</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="shared">
            <div className="rounded-md border p-8 text-center">
              <h3 className="text-lg font-medium">Shared Files</h3>
              <p className="text-sm text-muted-foreground">
                Files shared with you by other team members will appear here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="starred">
            <ScrollArea className="h-[450px]">
              <div className="space-y-2">
                {documents
                  .filter((doc) => doc.starred)
                  .map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-md bg-muted p-2">
                          {doc.type === "pdf" ? (
                            <FilePdf className="h-6 w-6 text-red-600" />
                          ) : doc.type === "excel" ? (
                            <FileSpreadsheet className="h-6 w-6 text-green-600" />
                          ) : doc.type === "word" ? (
                            <FileText className="h-6 w-6 text-blue-600" />
                          ) : (
                            <File className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{doc.name}</p>
                            <Star className="ml-2 h-4 w-4 text-yellow-500" fill="currentColor" />
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>
                              <Badge variant="outline" className="px-1 py-0 text-xs font-normal">
                                {doc.project}
                              </Badge>
                            </span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {doc.lastModified}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={doc.owner.avatar} alt={doc.owner.name} />
                          <AvatarFallback>{doc.owner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="recent">
            <div className="rounded-md border p-8 text-center">
              <h3 className="text-lg font-medium">Recent Files</h3>
              <p className="text-sm text-muted-foreground">Recently accessed files will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

