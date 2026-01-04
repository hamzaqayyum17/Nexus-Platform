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




## UI Theme Setup (Milestone 1)

### Global Styling
- Added a consistent color palette using Tailwind theme colors.
- Applied **Poppins** as the global font family.
- Defined global spacing and layout rules.

### Tailwind Configuration
- Extended Tailwind theme with:
  - Primary, Secondary, Accent colors
  - Success, Warning, Error states
  - Custom animations
- Configured font family for consistent typography.



## Reusable UI Components

### Button Component
- Created a reusable `Button` component with:
  - Variants (primary, secondary, success, warning, error)
  - Sizes (xs to xl)
  - Loading state
  - Icon support

### Input Component
- Enhanced the reusable `Input` component:
  - Increased input height for better UX
  - Improved padding and text size
  - Added support for icons and error states

## Authentication UI
- Improved login form UI consistency.
- Updated input fields for better readability and accessibility