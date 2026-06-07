"use client"

import { useState } from "react"
import {
  User,
  Building2,
  Users,
  Bell,
  Shield,
  Key,
  Save,
  Copy,
  Check,
  Trash2,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { currentUser } from "@/lib/constants"
import { cn } from "@/lib/utils"

const notificationSettings = [
  { id: "tasks", label: "Task assigned", description: "When a task is assigned to you" },
  { id: "due-dates", label: "Due dates", description: "When a task deadline is approaching" },
  { id: "comments", label: "Comments", description: "When someone comments on your task" },
  { id: "mentions", label: "Mentions", description: "When someone mentions you" },
  { id: "updates", label: "Project updates", description: "When a project status changes" },
]

const apiKeys = [
  { id: "k1", name: "Production API Key", created: "2026-04-15", lastUsed: "2 hours ago", active: true },
  { id: "k2", name: "Development Key", created: "2026-03-20", lastUsed: "1 day ago", active: true },
  { id: "k3", name: "Testing Key", created: "2026-02-10", lastUsed: "Never", active: false },
]

const sessions = [
  { id: "s1", device: "Chrome on Windows", ip: "192.168.1.1", lastActive: "Active now", current: true },
  { id: "s2", device: "Safari on macOS", ip: "192.168.1.2", lastActive: "2 hours ago", current: false },
  { id: "s3", device: "Firefox on Linux", ip: "192.168.1.3", lastActive: "3 days ago", current: false },
]

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (key: string) => {
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="h-10 bg-mufar-hover">
        <TabsTrigger value="profile" className="text-sm"><User className="h-4 w-4 mr-2" />Profile</TabsTrigger>
        <TabsTrigger value="workspace" className="text-sm"><Building2 className="h-4 w-4 mr-2" />Workspace</TabsTrigger>
        <TabsTrigger value="team" className="text-sm"><Users className="h-4 w-4 mr-2" />Team</TabsTrigger>
        <TabsTrigger value="notifications" className="text-sm"><Bell className="h-4 w-4 mr-2" />Notifications</TabsTrigger>
        <TabsTrigger value="security" className="text-sm"><Shield className="h-4 w-4 mr-2" />Security</TabsTrigger>
        <TabsTrigger value="api-keys" className="text-sm"><Key className="h-4 w-4 mr-2" />API Keys</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg font-semibold bg-mufar-primary text-white">
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Change Avatar
                </Button>
                <p className="text-xs text-mufar-text-secondary mt-1">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={currentUser.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={currentUser.email} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                className={cn(
                  "flex min-h-[80px] w-full rounded-md border border-mufar-border bg-transparent px-3 py-2 text-sm shadow-sm",
                  "placeholder:text-mufar-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mufar-primary"
                )}
                placeholder="Tell us about yourself"
              />
            </div>

            <div className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="workspace">
        <Card>
          <CardHeader>
            <CardTitle>Workspace Settings</CardTitle>
            <CardDescription>Configure your workspace</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workspace-name">Workspace Name</Label>
                <Input id="workspace-name" defaultValue="Mufar Tech" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                    <SelectItem value="cet">CET (Central European Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Workspace Logo</Label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-mufar-primary/10 flex items-center justify-center text-mufar-primary font-bold text-xl">
                  MT
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-role">Default Member Role</Label>
              <Select defaultValue="member">
                <SelectTrigger id="default-role" className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="team">
        <Card>
          <CardHeader>
            <CardTitle>Team Settings</CardTitle>
            <CardDescription>Manage team preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-mufar-text">Allow member invitations</p>
                  <p className="text-xs text-mufar-text-secondary">Let team members invite new people</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-mufar-text">Public team directory</p>
                  <p className="text-xs text-mufar-text-secondary">Show team members in workspace directory</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-mufar-text">Task auto-assignment</p>
                  <p className="text-xs text-mufar-text-secondary">Automatically assign tasks based on workload</p>
                </div>
                <Switch />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Choose what notifications you receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notificationSettings.map((setting) => (
              <div key={setting.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-mufar-text">{setting.label}</p>
                    <p className="text-xs text-mufar-text-secondary">{setting.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-mufar-text-secondary"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-mufar-text">Enable two-factor authentication</p>
                  <p className="text-xs text-mufar-text-secondary">
                    Secure your account with an authenticator app
                  </p>
                </div>
                <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage your active login sessions</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-mufar-border">
                {sessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-mufar-hover flex items-center justify-center">
                        <Shield className="h-4 w-4 text-mufar-text-secondary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-mufar-text">{session.device}</p>
                          {session.current && (
                            <Badge className="bg-mufar-primary/10 text-mufar-primary text-[10px] border-0">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-mufar-text-secondary">{session.ip}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-mufar-text-secondary">{session.lastActive}</span>
                      {!session.current && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-mufar-danger">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="api-keys">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for external integrations</CardDescription>
            </div>
            <Button>
              <Key className="h-4 w-4 mr-2" />
              Generate API Key
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell>
                      <span className="text-sm font-medium text-mufar-text">{key.name}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-mufar-text-secondary">{key.created}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-mufar-text-secondary">{key.lastUsed}</span>
                    </TableCell>
                    <TableCell>
                      <Switch checked={key.active} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(key.id)}
                        >
                          {copiedKey === key.id ? (
                            <Check className="h-4 w-4 text-mufar-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-mufar-danger">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
