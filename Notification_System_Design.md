# Notification System Design

## Architecture

The system is designed as a single-page React application (SPA) built with Vite and TypeScript. It utilizes Material UI (MUI) for a robust and accessible component system. 

### Core Components:
- **Routing**: React Router DOM handles navigation between the "All Notifications" and "Priority Inbox" views.
- **Data Fetching**: Axios is used as the HTTP client, abstracting network calls into a service layer. An interceptor automatically injects the `Bearer` token from `localStorage`.
- **State Management**: Local component state (React hooks) is sufficient for this scope, minimizing boilerplate while keeping state close to where it's needed.
- **Logging Middleware**: A custom `Log` function intercepts user actions and application state changes, forwarding them asynchronously to a backend service.

## Priority Algorithm & Sorting Strategy

The system assigns an importance level based on the `type` of notification, mapped through a utility:
- **Placement**: Score 3 (Highest)
- **Result**: Score 2
- **Event**: Score 1 (Lowest)

### Sorting Rules:
1. **Unread First**: Unread notifications take absolute precedence over read ones.
2. **Priority Score**: Among notifications with the same read status, higher priority scores are ordered first.
3. **Timestamp**: If both read status and priority score match, the newest notification (most recent timestamp) wins.

The "Priority Inbox" specifically applies this logic to fetch items and then slices the result to display **only the top 10** notifications, acting as an executive summary of actionable items.

## Scalability and Performance Considerations

1. **Pagination**: The "All Notifications" page uses server-side pagination (`limit` and `page`), ensuring that memory consumption and initial load times remain extremely low regardless of inbox size.
2. **Modular Architecture**: Code is split into reusable components (`NotificationCard`, `FilterBar`, etc.), making the codebase easy to maintain and test. 
3. **Type Safety**: End-to-end TypeScript interfaces prevent runtime errors and make refactoring predictable.

## Responsiveness Strategy

Material UI's flexible grid system and layout components ensure a seamless experience:
- **Mobile First**: The navigation bar adapts from inline links to a hidden hamburger menu powering a sliding `Drawer` on smaller screens.
- **Card Layout**: The `NotificationCard` uses flexible Box layouts that naturally wrap text and elements on narrow screens.
- **Container Constriction**: A maximum width container is applied on large screens to prevent content from stretching uncomfortably.

## Logging Middleware Explanation

The Custom Logger provides a unified way to report analytics and system health:
- Exposes a standard `Log(stack, level, package, message)` signature.
- Is invoked asynchronously across page loads, user interactions (e.g., clicking pagination or tabs), and network lifecycle events (success/failure).
- Implements `try/catch` wrapping internally to guarantee that logging failures do not break the user experience or disrupt core functionality.
