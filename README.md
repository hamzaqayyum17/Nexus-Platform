# NEXUS PLATFORM – PROJECT DOCUMENTATION

## Folder Structure

### components/
- chat: ChatMessage, ChatUserList
- collaboration: Collaboration request UI components
- entrepreneur: Entrepreneur cards and related components
- investor: Investor cards and related components
- layout: DashboardLayout, Sidebar, Navbar
- ui: Avatar.tsx, Badge.tsx, Button.tsx, Card.tsx, Input.tsx

### context/
- AuthContext.tsx: Manages authentication state across the app

### data/
- collaborationRequests.ts: Mock collaboration request data
- messages.ts: Mock chat messages
- users.ts: Mock users data

### pages/

#### auth/
- ForgotPasswordPage
- LoginPage
- RegisterPage
- ResetPasswordPage

#### chat/
- ChatPage

#### dashboard/
- EntrepreneurDashboard
- InvestorDashboard

#### deals/
- DealsPage

#### documents/
- DocumentsPage

#### entrepreneurs/
- EntrepreneursPage

#### help/
- HelpPage

#### investors/
- InvestorsPage

#### messages/
- MessagesPage

#### notifications/
- NotificationsPage

#### profile/
- EntrepreneurProfile
- InvestorProfile

#### settings/
- SettingsPage

### types/
- index.ts: TypeScript type definitions

### Root Files
- App.tsx: Main application routing and layout
- main.tsx: Application entry point
- index.css: Global styles
- vite-env.d.ts: Vite environment type definitions
