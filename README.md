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

## Meeting Scheduling Calendar (Milestone 2)

### pages/dashboard/calendar/

- CalendarPage.tsx – Main calendar interface for scheduling meetings.

#### Features:

- Displays a full calendar UI (FullCalendar / React-Calendar) integrated with the dashboard.

- Users can add, edit, and remove availability slots.

- Supports sending, accepting, and declining meeting requests.

- Displays confirmed meetings directly on the dashboard calendar for quick overview.

### Sidebar Integration

- Calendar link added to the sidebar for easy access:

##### Placement: 
    Dashboard → Messages → Calendar → Documents


- Ensures logical flow and intuitive navigation for both entrepreneurs and investors.

### Milestone 2 – Fully Complete 

- Calendar UI implemented

- Availability slots functionality complete

- Meeting request flow fully functional

- Confirmed meetings shown on dashboard

- Sidebar navigation updated

## Milestone 3 – Video Calling (Frontend Mock)

- Implemented video call UI using browser media APIs

- Added start and end call functionality

- Implemented microphone and camera toggle controls

- Video calling is integrated into the dashboard layout

## Milestone-4 Document upload

- Upload PDF / DOC
- Preview modal
- E-Signature mock
- Status: Draft → Signed
- Delete document
- Clean professional UI