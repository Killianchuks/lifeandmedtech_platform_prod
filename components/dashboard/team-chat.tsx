"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Paperclip, ImageIcon, Smile, Send, Search, MoreHorizontal, Phone, Video, Info } from "lucide-react"

// Mock team channels
const channels = [
  { id: "general", name: "General" },
  { id: "product-dev", name: "Product Development" },
  { id: "regulatory", name: "Regulatory Affairs" },
  { id: "medical-comm", name: "Medical Communication" },
  { id: "market-access", name: "Market Access" },
  { id: "cross-project", name: "Cross-Project" },
]

// Mock direct messages
const directMessages = [
  { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
  { id: 2, name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32", status: "busy" },
  { id: 3, name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32", status: "offline" },
  { id: 4, name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
  { id: 5, name: "James Wilson", avatar: "/placeholder.svg?height=32&width=32", status: "offline" },
]

// Mock chat messages
const messages = [
  {
    id: 1,
    channelId: "general",
    user: { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    content: "Good morning team! Just a reminder that we have our weekly sync at 11 AM today.",
    timestamp: "9:03 AM",
    reactions: [{ emoji: "👍", count: 3 }],
  },
  {
    id: 2,
    channelId: "general",
    user: { id: 2, name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32" },
    content: "Thanks for the reminder, Alex. I'll prepare the regulatory update for the meeting.",
    timestamp: "9:10 AM",
    reactions: [],
  },
  {
    id: 3,
    channelId: "general",
    user: { id: 3, name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
    content: "I'll also have the latest on the medical communication materials ready to review.",
    timestamp: "9:15 AM",
    reactions: [],
  },
  {
    id: 4,
    channelId: "general",
    user: { id: 4, name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
    content:
      "I've uploaded the market access projections to the shared documents folder. Can everyone review before the meeting?",
    timestamp: "9:22 AM",
    reactions: [{ emoji: "✅", count: 2 }],
  },
  {
    id: 5,
    channelId: "general",
    user: { id: 5, name: "James Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    content: "Taking a look at it now, Emma. The Q2 numbers look promising!",
    timestamp: "9:30 AM",
    reactions: [],
  },
  {
    id: 6,
    channelId: "general",
    user: { id: 2, name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32" },
    content:
      "Has anyone from the Product Development team had a chance to review the regulatory findings I shared yesterday?",
    timestamp: "9:34 AM",
    reactions: [],
  },
  {
    id: 7,
    channelId: "general",
    user: { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    content: "Yes, I reviewed them and added some comments. Let's discuss during the meeting.",
    timestamp: "9:40 AM",
    reactions: [{ emoji: "👍", count: 1 }],
  },
]

export function TeamChat() {
  const [activeChannel, setActiveChannel] = useState("general")
  const [message, setMessage] = useState("")

  const channelMessages = messages.filter((msg) => msg.channelId === activeChannel)

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the backend
      console.log(`Sending message to ${activeChannel}: ${message}`)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="flex h-[600px] flex-col">
      <Tabs defaultValue="channels" className="h-full flex flex-col">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <TabsList>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="direct">Direct Messages</TabsTrigger>
          </TabsList>
          <div className="flex items-center">
            <Button variant="outline" size="icon" className="mr-2">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More Options</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <TabsContent value="channels" className="h-full flex border-r" asChild>
            <div className="w-60 flex-shrink-0">
              <div className="flex items-center justify-between p-4">
                <h3 className="text-sm font-medium">Channels</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Info</span>
                </Button>
              </div>
              <ScrollArea className="h-[calc(100%-4rem)]">
                <div className="px-1">
                  {channels.map((channel) => (
                    <Button
                      key={channel.id}
                      variant={activeChannel === channel.id ? "secondary" : "ghost"}
                      className="w-full justify-start font-normal text-left"
                      onClick={() => setActiveChannel(channel.id)}
                    >
                      <span className="mr-1 text-xs">#</span>
                      {channel.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="direct" className="h-full flex border-r" asChild>
            <div className="w-60 flex-shrink-0">
              <div className="flex items-center justify-between p-4">
                <h3 className="text-sm font-medium">Direct Messages</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Info</span>
                </Button>
              </div>
              <ScrollArea className="h-[calc(100%-4rem)]">
                <div className="px-1">
                  {directMessages.map((dm) => (
                    <Button
                      key={dm.id}
                      variant="ghost"
                      className="w-full justify-start font-normal text-left"
                      onClick={() => setActiveChannel(`dm-${dm.id}`)}
                    >
                      <div className="flex items-center">
                        <div className="relative mr-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={dm.avatar} alt={dm.name} />
                            <AvatarFallback>{dm.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute -right-0.5 -bottom-0.5 block h-2 w-2 rounded-full ring-1 ring-background ${
                              dm.status === "online"
                                ? "bg-green-500"
                                : dm.status === "busy"
                                  ? "bg-yellow-500"
                                  : "bg-gray-500"
                            }`}
                          />
                        </div>
                        <span>{dm.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <h3 className="text-sm font-medium">
                  <span className="mr-1 text-xs">#</span>
                  {channels.find((c) => c.id === activeChannel)?.name || "Channel"}
                </h3>
                <p className="text-xs text-muted-foreground">12 members</p>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="mr-1 h-8 w-8">
                  <Phone className="h-4 w-4" />
                  <span className="sr-only">Call</span>
                </Button>
                <Button variant="ghost" size="icon" className="mr-1 h-8 w-8">
                  <Video className="h-4 w-4" />
                  <span className="sr-only">Video Call</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Details</span>
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {channelMessages.map((msg) => (
                  <div key={msg.id} className="flex">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                      <AvatarFallback>{msg.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium">{msg.user.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm">{msg.content}</p>
                      {msg.reactions.length > 0 && (
                        <div className="mt-1 flex">
                          {msg.reactions.map((reaction, index) => (
                            <div
                              key={index}
                              className="mr-1 flex items-center rounded-full bg-muted px-2 py-0.5 text-xs"
                            >
                              <span>{reaction.emoji}</span>
                              <span className="ml-1">{reaction.count}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator />
            <div className="flex items-center p-4">
              <Button variant="ghost" size="icon" className="mr-1">
                <Paperclip className="h-4 w-4" />
                <span className="sr-only">Attach File</span>
              </Button>
              <Button variant="ghost" size="icon" className="mr-1">
                <ImageIcon className="h-4 w-4" />
                <span className="sr-only">Add Image</span>
              </Button>
              <Input
                className="flex-1"
                placeholder={`Message #${channels.find((c) => c.id === activeChannel)?.name || "channel"}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button variant="ghost" size="icon" className="ml-1">
                <Smile className="h-4 w-4" />
                <span className="sr-only">Add Emoji</span>
              </Button>
              <Button size="icon" className="ml-1" onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </Tabs>
    </Card>
  )
}

