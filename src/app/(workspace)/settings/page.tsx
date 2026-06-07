"use client"

import SettingsPageComponent from "@/components/settings/settings-page"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-mufar-text">Settings</h1>
        <p className="text-sm text-mufar-text-secondary mt-1">
          Manage your account, workspace, and preferences.
        </p>
      </div>

      <SettingsPageComponent />
    </div>
  )
}
